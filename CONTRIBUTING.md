# Questions

If you are having problems using this SDK or have a question about IBM Cloud services,
please ask a question on [Stack Overflow](http://stackoverflow.com/questions/ask) or
[dW Answers](https://developer.ibm.com/answers/questions/ask).

# Issues

If you encounter an issue with the project, you are welcome to submit a [bug report](<github-repo-url>/issues).
Before that, please search for similar issues. It's possible that someone has already reported the problem.

# Pull Requests

If you want to contribute to the repository, here's a quick guide:
  1. Fork the repository.
  2. Develop and test your code changes:
      * Follow the coding style as documented above
      * Install dependencies using `npm install`
      * To build/test: `npm run build`
      * Please add one or more tests to validate your changes.
  3. Make sure everything builds/tests cleanly.
      * The build will run the code style checker and flag any issues.
  4. Commit your changes  
  5. Push to your fork and submit a pull request to the **master** branch.
  6. Be sure to sign the CLA.

# Coding Style

This SDK follows a coding style based on the [Airbnb conventions](https://github.com/airbnb/javascript). This repository uses `tslint` for linting the TypeScript code and `eslint` for linting the JavaScript test files. The rules for each are defined in `tslint.json` and `test/.eslintrc.js`, respectively. It is recommended that you do not change these files, since the automatically generated code complies with the defined rules.

You can run the linter with the following commands. Replacing “check” with “fix” will cause the linter to automatically fix any linting errors that it can.
- `npm run tslint:check`
- `npm run eslint:check`

# Running the Tests

SDK tests are organized into “unit” and “integration” tests, which live in `test/unit/` and `test/integration/`, respectively. Unit tests mock the request framework and test that request objects are constructed properly. Integration tests make requests to live service instances and test that the SDK works as intended from end to end.

This repository uses [Jest](https://jestjs.io/) for its testing and mocking framework. To run individual test files, `jest` must be installed globally on your local machine. The aggregate tests are run with the following commands. The code coverage report is displayed by default.
- `npm run test` - run all tests
- `npm run test-unit` - run only unit tests
- `test-integration` - run only integration tests

### Unit tests
Unit tests are automatically generated to accompany each generated service code file. They rely on a set of utility functions contained in the file `test/resources/unitTestUtils.js`. **Virtually no set up is needed for unit tests, just put the generated test files in `test/unit/` and they will be ready to run.**

### Integration tests
Integration tests must be written by hand for each service, if desired. For integration tests to run, service credentials must be specified in a file called `test/resources/auth.js`.  An example showing the proper format of this file is located at `test/resources/auth.example.js`. 

An example integration test is located at `test/integration/integration.test.js.example`. This example contains the imports necessary to run an integration test suite, which will be explained below.

# Code Coverage

This repo uses [Jest](https://jestjs.io/) to measure code coverage. To obtain a code coverage report, run `npm run test --coverage`
from the root of the project, and then view the coverage report.


# Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
   have the right to submit it under the open source license
   indicated in the file; or

(b) The contribution is based upon previous work that, to the best
   of my knowledge, is covered under an appropriate open source
   license and I have the right under that license to submit that
   work with modifications, whether created in whole or in part
   by me, under the same open source license (unless I am
   permitted to submit under a different license), as indicated
   in the file; or

(c) The contribution was provided directly to me by some other
   person who certified (a), (b) or (c) and I have not modified
   it.

(d) I understand and agree that this project and the contribution
   are public and that a record of the contribution (including all
   personal information I submit with it, including my sign-off) is
   maintained indefinitely and may be redistributed consistent with
   this project or the open source license(s) involved.
