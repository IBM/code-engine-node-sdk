[![Build Status](https://travis-ci.com/IBM/code-engine-node-sdk.svg?branch=main)](https://travis-ci.com/IBM/code-engine-node-sdk)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![codecov](https://codecov.io/gh/IBM/code-engine-node-sdk/branch/main/graph/badge.svg)](https://codecov.io/gh/IBM/code-engine-node-sdk)

<!--[![npm-version](https://img.shields.io/npm/v/IBM/ibm-code-engine-node-sdk.svg)](https://www.npmjs.com/package/ibm-code-engine-sdk)

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

- [NodeJS SDK for IBM Cloud Code Engine](#nodejs-sdk-for-ibm-cloud-code-engine)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
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
