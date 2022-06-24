/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable node/no-unpublished-require */
const CodeEngineV1 = require('../dist/ibm-cloud-code-engine/v1'); // require('ibm-code-engine-sdk/ibm-cloud-code-engine/v1');
const { IamAuthenticator } = require('../dist/auth'); // require('ibm-code-engine-sdk/auth');
const k8s = require('@kubernetes/client-node');
const axios = require('axios');
const querystring = require('querystring');

if (!process.env.CE_API_KEY || !process.env.CE_PROJECT_ID || !process.env.CE_PROJECT_REGION) {
  throw new Error(
    'You must set the envrionment variables CE_API_KEY, CE_PROJECT_REGION and CE_PROJECT_ID before using the example.'
  );
}

// Create an IAM authenticator.
const authenticator = new IamAuthenticator({
  apikey: process.env.CE_API_KEY,
  clientId: 'bx',
  clientSecret: 'bx',
});

// Construct the Code Engine client using the IAM authenticator.
const ceClient = new CodeEngineV1({
  authenticator,
  serviceUrl: `https://api.${process.env.CE_PROJECT_REGION}.codeengine.cloud.ibm.com/api/v1`,
});

async function main() {
  // Use the http library to get an IAM Delegated Refresh Token
  let iamResponse;
  let delegatedRefreshToken;
  try {
    iamResponse = await axios.post(
      'https://iam.cloud.ibm.com/identity/token',
      querystring.stringify({
        'grant_type': 'urn:ibm:params:oauth:grant-type:apikey',
        'apikey': process.env.CE_API_KEY,
        'response_type': 'delegated_refresh_token',
        'receiver_client_ids': 'ce',
        'delegated_refresh_token_expiry': '3600',
      }),
      {
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    delegatedRefreshToken = iamResponse.data.delegated_refresh_token;
  } catch (err) {
    throw err;
  }

  // Get Code Engine project config using the Code Engine client.
  let configResponse;
  try {
    configResponse = await ceClient.getKubeconfig({
      xDelegatedRefreshToken: delegatedRefreshToken,
      id: process.env.CE_PROJECT_ID,
    });
  } catch (err) {
    throw err;
  }

  // Setup Kubernetes client.
  const kubeConfig = new k8s.KubeConfig();
  kubeConfig.loadFromString(typeof configResponse.result === "string" ? configResponse.result : JSON.stringify(configResponse.result));
  const kubeClient = kubeConfig.makeApiClient(k8s.CoreV1Api);
  const { namespace } = kubeConfig.getCurrentContextObject();

  // Get something from project.
  try {
    const configMapList = await kubeClient.listNamespacedConfigMap(namespace);
    console.log(
      `Project ${process.env.CE_PROJECT_ID} has ${configMapList.body.items.length} configmaps.`
    );
  } catch (err) {
    throw err;
  }
}

main();
