# node-sdk-template
This template contains everything you need to produce a complete, production-level Node JS SDK using code generated from the [IBM OpenAPI Generator](https://github.ibm.com/CloudEngineering/openapi-sdkgen).

## Getting Started
Below are the minimum necessary steps to get started using this template repository. These steps assume that you have already generated source code using an OpenAPI document. If you have not done that, see the [generator repository](https://github.ibm.com/CloudEngineering/openapi-sdkgen) for instructions.

1. Clone this repository. Unless you are contributing to the template, change your git remotes to point at the location of your SDK's git repository. Install the dependencies.
2. Create a directory to hold generated service code. Create as many directories as you have services. Name each directory after the service.
3. Move each generated source file to its respective location. Service files, which have names like `v1.ts`, belong in the directories created in Step 2. Generated unit tests, which have names like `service-name.v1.test.js`, _all_ belong in the directory `test/unit`.
4. In order for the TypeScript build system to recognize the new service files, the file `tsconfig.json` must be updated. The file contains instructions on how to update it.
5. Update the `.gitignore` file to avoid checking the TypeScript-generated code in version control. There is a commented-out example in the file.
6. To take advantage of generated documentation, add the new service(s) to the file `scripts/typedoc/generate_typedoc.sh`. There is an example in that file as well.
7. If you want to have integration tests in addition to unit tests, in order to verify the SDK against an actual service instance, you will need to hand-write an integration test suite for each service (hopefully these will be automatically generated in the future!). There is an example test file in `test/integration`with the intended layout of the test suite. The format and tools used are explained in further detail in the [testing section](#testing).
8. If you do write integration tests, the credentials for the test service instance must be stored in a file called `test/resources/auth.js`. An example is provided in that directory with the intended format.

Those steps outline the files necessary to change for each service added. This repository also sets you up with Continuous Integration, using Travis, and Automated Release Management, using `semantic-release`. These are active by default and it is recommended that you take advantage of them. The setup of the repository will be explained in more detail below.

## Code Organization
Code is organized into top-level directories, named after each service. Generated service files live under these directories and are named only by their version, like `v1.ts`. The repository is structured this way so that each service can be imported into a user’s code independently using the following structure: `require('package-name/service-name/version')`.

All generated service code relies on a package called  [`ibm-cloud-sdk-core`](https://github.com/IBM/node-sdk-core)), which contains the generic, shared functionality used across any generated SDK. This package handles authentication and response handling, among other things. It is already installed in this repository, along with all other required dependencies.

Service code that must be hand-written (like methods for WebSocket APIs) or shared code that is service specific (as in, doesn’t belong in the core) lives in the `lib/` directory.

There is one method that is required by all generated methods that must be in `lib/`, in a file called `common.ts`, called `getSdkHeaders`. This method must return an object. It is used by some services to define headers that are meant to go out with every request from the SDK, like analytics headers. If no such headers are desired, `getSdkHeaders` should return an empty object.

All code in the repository uses the [TypeScript](https://www.typescriptlang.org/) framework, so code must be “built" after being edited using the `npm run build` command. Note that the built code is generated into a separate directory called `dist/`. This is to maintain a clean working directory, uncluttered by `.js`, `.js.map`, and `.d.ts` files. The project is configured to maintain the desired structure within the `dist/` folder and automatically release from this folder so that the end user is able to import the modules as described at the beginning of this section.

## Linting
This repository uses `tslint` for linting the TypeScript code and `eslint` for linting the JavaScript test files. The rules for each are defined in `tslint.json` and `test/.eslintrc.js`, respectively. It is recommended that you do not change these files, since the automatically generated code complies with the defined rules.

You can run the linter with the following commands. Replacing “check” with “fix” will cause the linter to automatically fix any linting errors that it can.
- `npm run tslint:check`
- `npm run eslint:check`

If you run into linter errors on the generated unit tests, you can run the node formatting script stored in the [generator repository](https://github.ibm.com/CloudEngineering/openapi-sdkgen) using:
- /\<path to generator\>/openapi-sdkgen/scripts/node_format.sh /\<path to sdk project\>/test/unit/*.js

## Testing
SDK tests are organized into “unit” and “integration” tests, which live in `test/unit/` and `test/integration/`, respectively. Unit tests mock the request framework and test that request objects are constructed properly. Integration tests make requests to live service instances and test that the SDK works as intended from end to end.

This repository uses [Jest](https://jestjs.io/) for its testing and mocking framework. To run individual test files, `jest` must be installed globally on your local machine. The aggregate tests are run with the following commands. The code coverage report is displayed by default.
- `npm run test` - run all tests
- `npm run test-unit` - run only unit tests
- `npm run test-integration` - run only integration tests

### Unit tests
Unit tests are automatically generated to accompany each generated service code file. They rely on a set of utility functions contained in the file `test/resources/unitTestUtils.js`. **Virtually no set up is needed for unit tests, just put the generated test files in `test/unit/` and they will be ready to run.**

### Integration tests
Integration tests must be written by hand for each service, if desired. For integration tests to run, service credentials must be specified in a file called `test/resources/auth.js`.  An example showing the proper format of this file is located at `test/resources/auth.example.js`.

An example integration test is located at `test/integration/integration.test.js.example`. This example contains the imports necessary to run an integration test suite, which will be explained below.

`test/resources/auth_helper.js` is a module that looks for the `auth.js` file that specifies the credentials. If found, it reads the credentials and makes them available to the test through its exports. If not found, it overrides the `describe` method in `jest` to skip every test. Otherwise, unless the API is completely unprotected, all of the tests would fail with “Unauthorized” errors.

`test/resources/service_error_util.js` is module that exports a function to wrap around callbacks in the integration tests. It will fail a test if an error response does not have a given status code (the code is passed in as an argument). By passing in the code `200`, you fail a test for a service endpoint not returning a `200` status code response.

Any additional files needed for testing (like an image to send to a visual recognition service) should be placed in `test/resources/`.  

Currently, the example integration test in `/test/integration` works with the "Example Service" mock API. To run the integration tests, clone the [Example Service repo](https://github.ibm.com/CloudEngineering/example-service) and follow the instructions found in the README.

Then, create a file called `auth.js` in `test/resources` folder, with the following code:

```js
module.exports = {
  exampleService: {
    url: 'http://localhost:3000'
  },
};
```

Finally, run the command from project root directory:
```sh
npm run test-integration
```

## Continuous Integration
This repository is set up to use [Travis](https://travis-ci.org/) for continuous integration.

Note - to run integration tests on Travis, the `auth.js` file must be encrypted and the key stored in the Travis settings as an environment variable. Run the script `scripts/update-auth-file.sh` to generate an encrypted file and automatically set the key in Travis. To do this:

1. Enable Travis-CI for your repository in Travis.
2. Make sure Ruby and Ruby Gem are installed and up to date on your local machine. You can [install Ruby here](https://www.ruby-lang.org/en/documentation/installation/)
3. Install Travis CLI (`gem install travis`). To verify installation, type `travis -v`
4. Log into Travis through CLI. Depending on whether you're trying to connect to Travis Enterprise, or Public Travis, the commands will be different.

Here's the command for logging into Travis Enterprise:

```sh
travis login -X --github-token <your-github-enterprise-token> --api-endpoint https://travis.ibm.com/api
```

Here's the command for logging into Public Travis
```sh
travis login --github-token <your-public-github-token> --com
```

5. From the root of the node-sdk-template project, run the script in `scripts/update-auth-file.sh`
6. The script will generate a file called `secrets.tar.enc` in the project folder root directory. Commit the file to your repository
7. Terminal should print out a command to add to your build script. In that command is a string with the format similar to `encrypted_12345_key`. Copy that string
8. From the root of the node-sdk-template project, rename `travis.yml` to `.travis.yml`
9. Replace the string `encrypted_12345_key` with the name of your generated environment variable from the last step
10. Also replace the string `encrypted_12345_iv` with the name of your generated environment variable, but modify the string from `_key` to `_iv`
11. Commit the changes you made to the `.travis.yml` file and push to Github. Travis-CI pipeline should automatically start running

The config file `.travis.yml` contains all the instructions necessary to run the recommended build. Each step is described below.

The `before_install` step runs the instructions to decrypt the `auth.js` file. It only does for *pushes* to a branch. This is done so that integration tests only run on *push* builds and not on *pull request* builds. The mechanism works because if there is no `auth.js` file, the `auth_helper.js` module described above will skip all of the tests.

The `script` section runs the instructions needed to verify the quality of the code in the push or pull request. It first ensures the code builds with TypeScript. Then, it runs the unit and integration tests. Note that the testing scripts are slightly different for Travis (e.g. `npm run test-unit-travis`. Public Travis does not support multi-threaded `jest` tests, so the option `--runInBand` is necessary. Also, the integration test script is configured to skip any test marked with the tag `@slow`, in case there is a need to skip tests in the Travis build. The output of the integration tests is piped to the script `scripts/report_integration_test.js`. This script is designed to prevent the Travis build from failing due to a `500`-level error, since those errors are the fault of the service and not the SDK. It will then report the errors in the form of a GitHub comment on the PR, if applicable, for awareness. After running the tests, the build checks the dependencies to ensure that they are all compatible with the Node versions supported by the package, specified in the `engines` property in the `package.json` file. Finally, it generates documentation from the JSDoc comments in the code.

The `after_success` section runs the script to report coverage and publishes the generated documentation. The repository uses [Codecov](https://codecov.io/) for hosting coverage reports. The script `scripts/jsdoc/publish.sh` is used to publish the generated documentation. To publish coverage reports to Codecov, you must add a `CODECOV_TOKEN` environment variable to the Travis settings.

The `deploy` section is the last step of the build and triggers the automated release management. The repository uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) for automated release management. The tool will determine if a release is warranted or not using the [commit messages](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit). Note that the format of your commit messages must comply with the requirements defined in the referenced page, or the release will not work as intended. If a release is warranted, the tool will determine what kind of release (patch, minor, or major) and proceed with the deployment. The tool is configured in this repository to publish to [npm](https://www.npmjs.com/) and update the changelog. To run these deployments, you must add a `GH_TOKEN` and `NPM_TOKEN` environment variables to the Travis settings. Note that a publish to `npm` will not be successful unless a `name` and initial `version` is given in the `package.json`.

## Documentation
- Documentation is automatically generated from the JSDoc comments and can be easily published online using GitHub pages. More information to follow.
- An example README for a new SDK based on this template will be added soon.

## Example SDK
The Watson Node SDK is a mature, well-developed manifestation of this setup. It provides a great example for anyone getting started with generating SDKs.
  - [Watson Node SDK](https://github.com/watson-developer-cloud/node-sdk)
