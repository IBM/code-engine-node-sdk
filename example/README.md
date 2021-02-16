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

### Use an HTTP library of your choice to get a Delegated Refresh Token from IAM
This example uses [Axios](https://www.npmjs.com/package/axios) for its async/await support and [querystring](https://nodejs.org/api/querystring.html) to encode the request parameters.
```js
const iamResponse = await axios.post('https://iam.cloud.ibm.com/identity/token', querystring.stringify({
  grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
  apikey: process.env.CE_API_KEY,
  response_type: 'delegated_refresh_token',
  receiver_client_ids: 'ce',
  delegated_refresh_token_expiry: '3600'
}), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
const delegatedRefreshToken = iamResponse.data.delegated_refresh_token;
```

### Use the Code Engine client to get a Kubernetes config
```js
const configResponse = await ceClient.getKubeconfig({
  xDelegatedRefreshToken: delegatedRefreshToken,
  id: process.env.CE_PROJECT_ID,
});
const kubeConfigString = configResponse.result;
```

## Deprecated endpoint

The `/namespaces/{id}/config` endpoint function, `listKubeconfig()`, is deprecated, and will be removed before Code Engine is out of Beta. Please use the `getKubeconfig()` function, demonstrated in the example above.
