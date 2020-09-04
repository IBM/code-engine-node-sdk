# Code Engine NodeJS SDK Example

## Running example.js

To run the example, create a Code Engine project from the Console or Code Engine CLI, and  run the following commands from this directory:
1. `npm install`
2. `export CE_API_KEY=<Your IBM Cloud API key>`
3. `export CE_PROJECT_ID=<Your Code Engine project ID>`
4. `export CE_PROJECT_REGION=<The region (e.g. 'us-south') of your Code Engine project>`
5. `node example.js`

## How-to

### Set up an authenticator
```js
const authenticator = new IamAuthenticator({
  apikey: process.env.CE_API_KEY,
  clientId: 'bx',
  clientSecret: 'bx',
});
```

### Set up a Code Engine client
```js
const ceClient = new CodeEngineV1({
  authenticator,
  serviceUrl: `https://api.us-south.codeengine.cloud.ibm.com/api/v1`,
});
```

### Use the Code Engine client to get a Kubernetes config
```js
const tokenResponse = await authenticator.tokenManager.requestToken();
const configResponse = await ceClient.listKubeconfig({
    refreshToken: tokenResponse.result.refresh_token,
    id: 'YOUR_PROJECT_ID_HERE',
});
```
