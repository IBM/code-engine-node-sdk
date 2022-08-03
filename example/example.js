const CodeEngineV1 = require('../dist/ibm-cloud-code-engine/v1'); // require('ibm-code-engine-sdk/ibm-cloud-code-engine/v1');
const { IamAuthenticator } = require('../dist/auth'); // require('ibm-code-engine-sdk/auth');
const k8s = require('@kubernetes/client-node');

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
  // Get tokens using the Authenticator.
  const tokenResponse = await authenticator.tokenManager.requestToken();

  // Get Code Engine project config using the Code Engine client.
  const configResponse = await ceClient.listKubeconfig({
    refreshToken: tokenResponse.result.refresh_token,
    id: process.env.CE_PROJECT_ID,
  });

  // Setup Kubernetes client.
  const kubeConfig = new k8s.KubeConfig();
  kubeConfig.loadFromString(configResponse.result);
  const kubeClient = kubeConfig.makeApiClient(k8s.CoreV1Api);

  // Get something from project.
  const { namespace } = kubeConfig.getCurrentContextObject();
  const configMapList = await kubeClient.listNamespacedConfigMap(namespace);
  console.log(
    `Project ${process.env.CE_PROJECT_ID} has ${configMapList.body.items.length} configmaps.`
  );
}

main();
