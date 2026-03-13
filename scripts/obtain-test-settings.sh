#!/bin/bash

set -euo pipefail

CE_API_HOST="${CE_API_HOST:-api.eu-de.codeengine.cloud.ibm.com}"
REGION="${REGION:-eu-de}"
RESOURCE_GROUP="${RESOURCE_GROUP:-Default}"
IAM_ENDPOINT="${IAM_ENDPOINT:-https://iam.cloud.ibm.com}"
COS_INSTANCE_NAME="${COS_INSTANCE_NAME:-ce-ux-sdk-cos-global}"
COS_SERVICE_KEY_NAME="${COS_SERVICE_KEY_NAME:-ce-ux-sdk-cos-global-access-credentials}"
COS_BUCKET_NAME="${COS_BUCKET_NAME:-ce-ux-sdk-node-bucket}"

headline() {
  echo -e "\n\033[93m${*}\033[0m"
}

quiet_ibmcloud() {
  if ! OUTPUT="$(ibmcloud "$@" 2>&1)"; then
    echo "$OUTPUT"
    exit 1
  fi
}

setupCOS() {
  COS_INSTANCE_NAME="$1"
  COS_INSTANCE_SERVICE_KEY_NAME="$2"
  BUCKET_NAME="$3"

  if ! COS_INSTANCE_JSON="$(ibmcloud resource service-instance "$COS_INSTANCE_NAME" --output json 2>/dev/null | jq -c)"; then
    quiet_ibmcloud resource service-instance-create \
      "$COS_INSTANCE_NAME" \
      cloud-object-storage \
      standard \
      global \
      --deployment premium-global-deployment-iam
    COS_INSTANCE_JSON="$(ibmcloud resource service-instance "$COS_INSTANCE_NAME" --output json 2>/dev/null | jq -c)"
  fi

  COS_INSTANCE_CRN="$(jq --raw-output '.[].crn' <<<"$COS_INSTANCE_JSON")"
  COS_INSTANCE_ID="$(jq --raw-output '.[].guid' <<<"$COS_INSTANCE_JSON")"
  echo "COS instance $COS_BUCKET_NAME exists with ID $COS_INSTANCE_ID"

  if ! COS_INSTANCE_SERVICE_KEY_JSON="$(ibmcloud resource service-key "$COS_INSTANCE_SERVICE_KEY_NAME" --output json 2>/dev/null | jq -c)"; then
    COS_INSTANCE_SERVICE_KEY_JSON="[$(ibmcloud resource service-key-create \
      "$COS_INSTANCE_SERVICE_KEY_NAME" \
      Manager \
      --instance-name "$COS_INSTANCE_NAME" \
      --parameters '{"HMAC":true}' \
      --output json)]"
  fi

  COS_INSTANCE_ACCESS_KEY_ID="$(<<<"$COS_INSTANCE_SERVICE_KEY_JSON" jq --raw-output ".[].credentials.cos_hmac_keys.access_key_id")"
  COS_INSTANCE_SECRET_ACCESS_KEY="$(<<<"$COS_INSTANCE_SERVICE_KEY_JSON" jq --raw-output ".[].credentials.cos_hmac_keys.secret_access_key")"
  echo "COS instance $COS_BUCKET_NAME service key exists with HMAC credentials"

  BUCKETS="$(ibmcloud cos buckets --ibm-service-instance-id "$COS_INSTANCE_CRN" --output json | jq -c)"
  if ! grep -q "$BUCKET_NAME" <<<"$BUCKETS"; then
    quiet_ibmcloud cos bucket-create \
      --bucket "$BUCKET_NAME" \
      --region "$REGION" \
      --ibm-service-instance-id "$COS_INSTANCE_CRN" \
      --class smart
  fi

  COS_INSTANCE_BUCKET_LOCATION="$(ibmcloud cos bucket-location-get \
    --bucket "$BUCKET_NAME" \
    --output json |
    jq --raw-output .LocationConstraint |
    sed 's/-smart$//')"

	echo "COS instance $COS_BUCKET_NAME has bucket $BUCKET_NAME in $COS_INSTANCE_BUCKET_LOCATION"
}

# --- --- ---

if [[ -z ${CE_API_KEY:-} ]]; then
  echo "CE_API_KEY is not set. Bailing out."
  exit 1
fi

headline "Logging into IBM Cloud account ..."
ibmcloud login --apikey "$CE_API_KEY" -r "$REGION" -g "$RESOURCE_GROUP"

headline "Ensuring existence of COS $COS_INSTANCE_NAME"
setupCOS "$COS_INSTANCE_NAME" "$COS_SERVICE_KEY_NAME" "$COS_BUCKET_NAME"

cat <<EOF >code_engine_v2.env
CODE_ENGINE_URL=https://$CE_API_HOST/v2
CODE_ENGINE_AUTH_TYPE=iam
CODE_ENGINE_APIKEY=$CE_API_KEY
CODE_ENGINE_AUTH_URL=$IAM_ENDPOINT

COS_SERVICE_INSTANCE_ID=$COS_INSTANCE_ID
COS_BUCKET_NAME=$COS_BUCKET_NAME
COS_BUCKET_LOCATION=$COS_INSTANCE_BUCKET_LOCATION
COS_ACCESS_KEY_ID=$COS_INSTANCE_ACCESS_KEY_ID
COS_SECRET_ACCESS_KEY=$COS_INSTANCE_SECRET_ACCESS_KEY

CODE_ENGINE_DOMAIN_MAPPING_NAME=api-unit-test-tls.e2e-board.info
CODE_ENGINE_TLS_KEY_FILE_PATH=$(readlink -f "$GOPATH/src/github.ibm.com/coligo/api/test/integration/tls-files/demohero.key")
CODE_ENGINE_TLS_CERT_FILE_PATH=$(readlink -f "$GOPATH/src/github.ibm.com/coligo/api/test/integration/tls-files/demohero.crt")
EOF
