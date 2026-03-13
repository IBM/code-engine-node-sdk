<!--
[![Build Status](https://travis-ci.com/IBM/code-engine-node-sdk.svg?token=eW5FVD71iyte6tTby8gr&branch=master)](https://travis.ibm.com/IBM/code-engine-node-sdk)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm-version](https://img.shields.io/npm/v/IBM/code-engine-node-sdk.svg)](https://www.npmjs.com/package/code-engine-sdk)
[![codecov](https://codecov.io/gh/IBM/code-engine-node-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/IBM/code-engine-node-sdk)
-->

# NodeJS SDK for IBM Cloud Code Engine

Node.js client library to interact with the [Code Engine API](https://cloud.ibm.com/apidocs/codeengine).

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
- [Breaking Changes (March 2026)](#breaking-changes-march-2026)
- [Installation](#installation)
- [Using the SDK](#using-the-sdk)
- [Questions](#questions)
- [Issues](#issues)
- [Open source @ IBM](#open-source--ibm)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

<!-- --------------------------------------------------------------- -->
## Overview

The IBM Cloud Code Engine Node.js SDK allows developers to programmatically interact with the following IBM Cloud services:

Service Name | Import Path
--- | ---
[Code Engine](https://cloud.ibm.com/apidocs/codeengine/codeengine-v2.0.0) | @ibm-cloud/ibm-code-engine-sdk/code-engine/v2 
[Code Engine](https://cloud.ibm.com/apidocs/codeengine/codeengine-v1.0.0) | ibm-code-engine-sdk/ibm-cloud-code-engine/v1

## Prerequisites
* You need an [IBM Cloud][ibm-cloud-onboarding] account.
* **Node.js >=14**: This SDK is tested with Node.js versions 14 and up. It may work on previous versions but this is not officially supported.

## Breaking Changes (March 2026)

For consistency, the March 2026 update introduces **pluralized list APIs**, **new outbound destination types**, and updated **constructor/patch models**. These changes require updates to existing client code.

- **Method renames (pluralization)**
    Update all list calls:

    ```javascript
    // before
    const response = await codeEngineService.listAllowedOutboundDestination(params);

    // after
    const response = await codeEngineService.listAllowedOutboundDestinations(params);
    ```

    ```javascript
    // before
    const response = await codeEngineService.listPersistentDataStore(params);

    // after
    const response = await codeEngineService.listPersistentDataStores(params);
    ```

- **Pager class renames**
    Switch to the new pager names:

    ```javascript
    // before
    const pager = new CodeEngineV2.AllowedOutboundDestinationPager(codeEngineService, params);

    // after
    const pager = new CodeEngineV2.AllowedOutboundDestinationsPager(codeEngineService, params);
    ```

    ```javascript
    // before
    const pager = new CodeEngineV2.PersistentDataStorePager(codeEngineService, params);

    // after
    const pager = new CodeEngineV2.PersistentDataStoresPager(codeEngineService, params);
    ```

- **Allowed outbound destination patch payloads changed**
    Do **not** send `type` in patch payloads anymore. Use the specific fields instead:

    ```javascript
    // before
    const patch = {
      type: 'cidr_block',
      cidr_block: '10.0.1.0/24',
    };

    // after (remove type field)
    const patch = {
      cidr_block: '10.0.1.0/24',
    };
    ```

- **Allowed outbound destination prototypes now require `name`**
    The `name` field is now required when creating allowed outbound destinations. Ensure you set it for all create flows:

    ```javascript
    const prototype = {
      type: 'cidr_block',
      name: 'allow-all',  // now required
      cidr_block: '10.0.0.0/24',
    };
    ```

    For Private Path service gateway (new type):

    ```javascript
    const prototype = {
      type: 'private_path_service_gateway',
      name: 'pps-to-service-x',
      private_path_service_gateway_crn: '<private-path-service-gateway-crn>',
      isolation_policy: 'shared',  // optional: 'shared' or 'dedicated'
    };
    ```

> **Action checklist:**
>
> - [ ] Rename the list methods and pager classes as shown above.
> - [ ] Adjust parameter order for CIDR block prototypes (name before cidr_block).
> - [ ] Remove `type` from allowed-outbound-destination patch payloads.
> - [ ] Ensure `name` is provided when creating allowed outbound destinations.
> - [ ] Include the new `private_path_service_gateway` type in any client-side branching/validation.

[ibm-cloud-onboarding]: http://cloud.ibm.com/registration

## Installation

```sh
npm install @ibm-cloud/ibm-code-engine-sdk
```

## Using the SDK
Examples and a demo are available in the [examples](/examples) folder.

For general SDK usage information, please see
[this link](https://github.com/IBM/ibm-cloud-sdk-common/blob/master/README.md)

## Questions

If you are having difficulties using this SDK or have a question about the IBM Cloud services,
please ask a question at
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Issues
If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/IBM/code-engine-node-sdk/issues).
Before that, please search for similar issues. It's possible someone has
already encountered this issue.

## Open source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Contributing
See [CONTRIBUTING](CONTRIBUTING.md).

## License

This project is released under the Apache 2.0 license.
The license's full text can be found in
[LICENSE](LICENSE).
