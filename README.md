[![Build Status](https://travis.ibm.com/CloudEngineering/node-sdk-template.svg?token=eW5FVD71iyte6tTby8gr&branch=master)](https://travis.ibm.com/CloudEngineering/node-sdk-template)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
<!--
[![npm-version](https://img.shields.io/npm/v/CloudEngineering/node-sdk-template.svg)](https://www.npmjs.com/package/node-sdk-template)
[![codecov](https://codecov.io/gh/CloudEngineering/node-sdk-template/branch/master/graph/badge.svg)](https://codecov.io/gh/CloudEngineering/node-sdk-template)
-->
# IBM Cloud MySDK Node.js SDK
Node.js client library to interact with various [MySDK Service APIs](https://cloud.ibm.com/apidocs?category=<service-category>).

## Table of Contents

<!--
  The TOC below is generated using the `markdown-toc` node package.

      https://github.com/jonschlinkert/markdown-toc

  You should regenerate the TOC after making changes to this file.

      npx markdown-toc -i README.md
  -->

<!-- toc -->

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Using the SDK](#using-the-sdk)
  * [Constructing service clients](#constructing-service-clients)
    + [Setting service client options programmatically](#setting-service-client-options-programmatically)
    + [Constructing a service client using external configuration](#constructing-a-service-client-using-external-configuration)
  * [Authentication](#authentication)
    + [Example: construct IamAuthenticator with an IAM api key](#example-construct-iamauthenticator-with-an-iam-api-key)
    + [Example: construct BearerTokenAuthenticator with an access token](#example-construct-bearertokenauthenticator-with-an-access-token)
  * [Passing operation parameters via a "params" object](#passing-operation-parameters-via-a-params-object)
  * [Receiving operation responses](#receiving-operation-responses)
  * [Sending HTTP headers](#sending-http-headers)
    + [Sending HTTP headers with all requests](#sending-http-headers-with-all-requests)
    + [Sending request HTTP headers](#sending-request-http-headers)
  * [Transaction IDs](#transaction-ids)
  * [Configuring the HTTPS Agent](#configuring-the-https-agent)
    + [Proxy](#proxy)
    + [Sending custom certificates](#sending-custom-certificates)
  * [Disabling SSL Verification - Discouraged](#disabling-ssl-verification---discouraged)
  * [Debug](#debug)
- [Questions](#questions)
- [Open source @ IBM](#open-source--ibm)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

<!-- --------------------------------------------------------------- -->
## Overview

The IBM Cloud MySDK Node.js SDK allows developers to programmatically interact with the following 
IBM Cloud services:

Service Name | Import Path
--- | --- 
[Example Service](https://cloud.ibm.com/apidocs/example-service) | mysdk/example-service/v1

## Prerequisites
* You need an [IBM Cloud][ibm-cloud-onboarding] account.
* **Node.js >=10**: This SDK is tested with Node.js versions 10 and up. It may work on previous versions but this is not officially supported.

[ibm-cloud-onboarding]: http://cloud.ibm.com/registration

## Installation

```sh
npm install mysdk
```

## Using the SDK
This section provides general information on how to use the services contained in this SDK.

### Constructing service clients
Each service is implemented in its own module within the SDK project's package
(e.g. the "Example Service" service is implemented within the `example-service/v1` module within
the `mysdk` package).
The service's module will contain a "service client" class (a client-side representation of the service.

#### Setting service client options programmatically
Here's an example of how to construct an instance of a service (ExampleServiceV1) while specifying service
client options (authenticator, service endpoint URL, etc.) programmatically:

```js
const ExampleServiceV1 = require('mysdk/example-service/v1');
const { IamAuthenticator } = require('mysdk/auth');

const authenticator = new IamAuthenticator({
  apikey: '<iam-api-key>',
});
const serviceUrl = 'https://myservice.cloud.ibm.com/v2';
const myService = new ExampleServiceV1({
  serviceUrl,
  authenticator,
});

// Service operations can now be called using the "myService" variable.
```

#### Constructing a service client using external configuration
For a typical application deployed to the IBM Cloud, it might be convenient to avoid hard-coding
certain service client options (IAM API Key, service endpoint URL, etc.).
Instead, the SDK allows you to store these values in configuration properties external to your
application.

##### Define configuration properties
First, define the configuration properties to be used by your application.  These properties
can be implemented as either (1) exported environment variables or (2) stored in a *credentials* file.
In the examples that follow, we'll use environment variables to implement our configuration properties.
Each property name is of the form: `<serviceName>_<propertyKey>`.
Here is an example of some configuration properties for the "Example Service" service:

```
export EXAMPLE_SERVICE_URL=https://myservice.cloud.ibm.com/v1
export EXAMPLE_SERVICE_AUTH_TYPE=iam
export EXAMPLE_SERVICE_APIKEY=my-iam-apikey
```

The service name "example_service" is the default service name for the "Example Service" service,
so the SDK will (by default) look for properties that start with this prefix folded to upper case.

##### Construct service client
After you have defined the configuration properties for your application, you can
construct an instance of the service client like this:

```js
const ExampleServiceV1 = require('mysdk/example-service/v1');

const myService = ExampleServiceV1.newInstance();
```

The `ExampleServiceV1.newInstance()` method will:
1. construct an authenticator using the environment variables above (an IAM authenticator using "my-iam-apikey" as the api key).
2. initialize the service client to use a base endpoint URL of "https://myservice.cloud.ibm.com/v1" rather than the default URL.

##### Storing configuration properties in a file
Instead of exporting your configuration properties as environment variables, you can store the properties
in a *credentials* file.   Here is an example of a credentials file that contains the properties from the example above:

```
# Contents of "myservice.env"
EXAMPLE_SERVICE_URL=https://myservice.cloud.ibm.com/v2
EXAMPLE_SERVICE_AUTH_TYPE=iam
EXAMPLE_SERVICE_APIKEY=my-iam-apikey

```

You would then provide the name of the credentials file via the `IBM_CREDENTIALS_FILE` environment variable:

```
export IBM_CREDENTIALS_FILE=/myfolder/myservice-controller.env
```

When the SDK needs to look for configuration properties, it will detect the `IBM_CREDENTIALS_FILE` environment
variable, then load the properties from the specified file.

##### Complete configuration-loading process
The above examples provide a glimpse of two specific ways to provide external configuration to the SDK
(environment variables and credentials file specified via the `IBM_CREDENTIALS_FILE` environment variable).

The complete configuration-loading process supported by the SDK is as follows:
1. Look for a credentials file whose name is specified by the `IBM_CREDENTIALS_FILE` environment variable
2. Look for a credentials file at `<current-working-director>/ibm-credentials.env`
3. Look for a credentials file at `<user-home-directory>/ibm-credentials.env`
4. Look for environment variables whose names start with `<upper-case-service-name>_` (e.g. `EXAMPLE_SERVICE_`)

At each of the above steps, if one or more configuration properties are found for the specified service,
those properties are then returned to the SDK and any subsequent steps are bypassed.


### Authentication
IBM Cloud Services use token-based Identity and Access Management (IAM) authentication.

IAM authentication uses an API key to obtain an access token, which is then used to authenticate
each API request.  Access tokens are valid for a limited amount of time and must be refreshed or reacquired.

To provide credentials to the SDK, you can do one of the following:
1. Construct or configure an `IamAuthenticator` instance with your IAM api key - in this case,
the SDK's IamAuthenticator implementation will use your API key to obtain an access token, ensure that it is valid,
and will then include the access token in each outgoing request, refreshing it as needed.

2. Construct or configure a `BearerTokenAuthenticator` instance using an access token that you obtain yourself -
in this case, you are responsible for obtaining the access token and refreshing it as needed.

For more details about authentication, including the full set of authentication schemes supported by
the underlying Node.js Core library, see
[Authentication](https://github.com/IBM/node-sdk-core/blob/master/AUTHENTICATION.md)

#### Example: construct IamAuthenticator with an IAM api key

```js
const ExampleServiceV1 = require('mysdk/example-service/v1');
const { IamAuthenticator } = require('mysdk/auth');

const authenticator = new IamAuthenticator({
  apikey: '<iam-api-key>',
});
const myService = new ExampleServiceV1({
  authenticator,
});
```

#### Example: construct BearerTokenAuthenticator with an access token

```js
const ExampleServiceV1 = require('mysdk/example-service/v1');
const { BearerTokenAuthenticator } = require('mysdk/auth');

const authenticator = new BearerTokenAuthenticator({
  bearerToken: '<access-token>',
});
const myService = new ExampleServiceV1({
  authenticator,
});
...

// Later when the access token expires, the application must refresh the access token,
// then set the new access token on the authenticator.
// Subsequent request invocations will include the new access token.
authenticator.setBearerToken('<new-access-token>')
```

### Passing operation parameters via a "params" object
For each operation belonging to a service, a "params" interface is defined as a container for
the parameters associated with the operation.
The name of the interface will be `<operation-name>Params` and it will contain a field for each
operation parameter.  
Here's an example of a params object for the `getResource` operation:

```js
  /** Parameters for the `getResource` operation. */
  export interface GetResourceParams {
    /** The id of the resource to retrieve. */
    resourceId: string;

    ...
  }
```

In this example, the `getResource` operation has one parameter - `resourceId`.
When invoking this operation, the application passes an instance of the `GetResourceParams`
interface and then sets the parameter value within it.
Here's an example:

```js
const getResourceParams = {
    resourceId: 'resource-id-1',
}

myService.getResource(getResourceParams).then(res => {
    ...
});
```

The use of the "params" object pattern (instead of listing each operation parameter within the
argument list of the service methods) allows for future expansion of the API (within certain
guidelines) without impacting applications.

### Receiving operation responses

Each operation will return a response via a Promise.
The response is an object containing the result of the operation, HTTP status code and text message, and the HTTP response headers.
Here is an example of how to access the response headers from an operation response:

```js
myService.getResource({
  'resourceId': 'resource-id-1',
}).then((response) => {
    // result is the response object returned in the response body
    // status is the HTTP status code returned in the response
    // headers is the set of HTTP headers returned in the response
    // statusText is the text message associated with the HTTP status code
    const { result, status, headers, statusText } = response;
    console.log(JSON.stringify(headers, null, 4));
  }).catch((err) => {
    console.log(JSON.stringify(err, null, 4));
  });
```

### Sending HTTP headers

#### Sending HTTP headers with all requests
A set of default HTTP headers can be included with all requests by passing the `headers` parameter when
constructing the service client.

Here's an example that includes `Custom-Header` with each request invocation:

```js
import ExampleServiceV1 from 'mysdk/example-service/v1';

const myService = ExampleServiceV1.newInstance({
  headers: {
    'Custom-Header': 'custom_value',
  },
});

// "Custom-Header" will now be included with all subsequent requests invoked from "myService".
```

#### Sending request HTTP headers
Custom HTTP headers can also be passed with any individual request.
Just add the custom headers to the "params" object via the optional `headers` field prior to calling the operation.

Here's an example that includes `Custom-Header` along with the `getResource` operation invocation:

```js
import ExampleServiceV1 from 'mysdk/example-service/v1';

const myService = /* construct service client */

const getResourceParams = {
  resourceId: 'resource-id-1',
  headers: {
    'Custom-Header': 'custom_value',
  }
};

myService.getResource(getResourceParams).then(res => {
  // Custom-Header will have been sent with this request
});
```
### Transaction IDs

Every API invocation will receive a response that contains a transaction ID in the `x-global-transaction-id`
HTTP header. This transaction ID is useful for troubleshooting and accessing relevant logs from your service
instance.  Here's an example of how to retrieve the `x-global-transaction-id` response header:

```js
const myService = /* construct service client */

const params = {
  resourceId: 'resource-id-1',
}

myService.getResource(params).then(
  response => {
    console.log(response.headers['x-global-transaction-id']);
  },
  err => {
    console.log(err);
  }
);
```

### Configuring the HTTPS Agent
The SDK provides the user with full control over the HTTPS Agent used to make requests.
This is available for both the service client and the authenticators that make network requests
(e.g. `IamAuthenticator`).
Described below are scenarios where this capability is needed.
Note that this functionality is applicable only for Node.js environments - these configurations will have
no effect in the browser.

#### Proxy
To use the SDK to invoke requests behind an HTTP proxy (e.g. firewall), a special tunneling agent
must be used.
Use the package [`tunnel`](https://github.com/koichik/node-tunnel/) for this.
Configure this agent with your proxy information, and pass it in as the HTTPS agent in the
service constructor.
Additionally, you must set `proxy` to `false` in the client constructor.
See this example configuration:

```js
const tunnel = require('tunnel');
import ExampleServiceV1 from 'ibm-mysdk/example-service/v1';
import { IamAuthenticator } from 'mysdk/auth';

const myService = new ExampleServiceV1({
  authenticator: new IamAuthenticator({ apikey: '{apikey}' }),
  httpsAgent: tunnel.httpsOverHttp({
    proxy: {
      host: 'some.host.org',
      port: 1234,
    },
  }),
  proxy: false,
});
```

#### Sending custom certificates
To send custom certificates as a security measure in your request, use the `cert`, `key`, and/or `ca`
properties of the HTTPS Agent.
See [this documentation](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)
for more information about the options.
Note that the entire contents of the file must be provided - not just the file name.

```js
const tunnel = require('tunnel');
import ExampleServiceV1 from 'ibm-mysdk/example-service/v1';
import { IamAuthenticator } from 'ibm-mysdk/auth';

const certFile = fs.readFileSync('./my-cert.pem');
const keyFile = fs.readFileSync('./my-key.pem');

const myService = new ExampleServiceV1({
  authenticator: new IamAuthenticator({
    apikey: '{apikey}',
    httpsAgent: new https.Agent({
      key: keyFile,
      cert: certFile,
    })
  }),
  httpsAgent: new https.Agent({
    key: keyFile,
    cert: certFile,
  }),
});
```

### Disabling SSL Verification - Discouraged
The HTTP client can be configured to disable SSL verification.
**Note that this has serious security implications - only do this if you really mean to!** ⚠️

To do this, set `disableSslVerification` to `true` in the service constructor and/or authenticator constructor,
like this:

```js
import ExampleServiceV1 from 'ibm-mysdk/example-service/v1';
import { IamAuthenticator } from 'ibm-mysdk/auth';

const myservice = new ExampleServiceV1({
  authenticator: new IamAuthenticator({
    apikey: '<apikey>',
    disableSslVerification: true,   // this will disable SSL verification for requests to the IAM token server
    }),
  disableSslVerification: true, // this will disable SSL verification for any requests invoked with this service client instance
});
```

### Debug
This module uses the [`debug`](https://github.com/visionmedia/debug) package for logging.
Specify the desired environment variable to enable logging debug messages.

## Questions

If you are having difficulties using this SDK or have a question about the IBM Cloud services,
please ask a question at [dW Answers](https://developer.ibm.com/answers/questions/ask/?topics=ibm-cloud) or
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Open source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Contributing
See [CONTRIBUTING](https://github.ibm.com/CloudEngineering/node-sdk-template/blob/master/CONTRIBUTING.md).

## License

This project is released under the Apache 2.0 license.
The license's full text can be found in [LICENSE](https://github.ibm.com/CloudEngineering/node-sdk-template/blob/master/LICENSE).
