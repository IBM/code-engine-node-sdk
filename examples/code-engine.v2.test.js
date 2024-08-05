/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2024.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const CodeEngineV2 = require('../dist/code-engine/v2');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Code Engine service.
//
// The following configuration properties are assumed to be defined:
// CODE_ENGINE_URL=<service base url>
// CODE_ENGINE_AUTH_TYPE=iam
// CODE_ENGINE_APIKEY=<IAM apikey>
// CODE_ENGINE_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'code_engine_v2.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('CodeEngineV2', () => {
  // Service instance
  let codeEngineService;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(CodeEngineV2.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    codeEngineService = CodeEngineV2.newInstance({
      version: '2024-08-04',
    });

    // end-common
  });

  test('listProjects request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProjects() result:');
    // begin-list_projects

    const params = {
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.ProjectsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_projects
  });

  test('createProject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createProject() result:');
    // begin-create_project

    const params = {
      name: 'my-project',
    };

    let res;
    try {
      res = await codeEngineService.createProject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_project
  });

  test('getProject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProject() result:');
    // begin-get_project

    const params = {
      id: '15314cc3-85b4-4338-903f-c28cdee6d005',
    };

    let res;
    try {
      res = await codeEngineService.getProject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_project
  });

  test('getProjectEgressIps request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProjectEgressIps() result:');
    // begin-get_project_egress_ips

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
    };

    let res;
    try {
      res = await codeEngineService.getProjectEgressIps(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_project_egress_ips
  });

  test('getProjectStatusDetails request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProjectStatusDetails() result:');
    // begin-get_project_status_details

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
    };

    let res;
    try {
      res = await codeEngineService.getProjectStatusDetails(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_project_status_details
  });

  test('listApps request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listApps() result:');
    // begin-list_apps

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.AppsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_apps
  });

  test('createApp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createApp() result:');
    // begin-create_app

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      imageReference: 'icr.io/codeengine/helloworld',
      name: 'my-app',
    };

    let res;
    try {
      res = await codeEngineService.createApp(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_app
  });

  test('getApp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getApp() result:');
    // begin-get_app

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-app',
    };

    let res;
    try {
      res = await codeEngineService.getApp(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_app
  });

  test('updateApp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateApp() result:');
    // begin-update_app

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-app',
      ifMatch: 'testString',
    };

    let res;
    try {
      res = await codeEngineService.updateApp(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_app
  });

  test('listAppRevisions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAppRevisions() result:');
    // begin-list_app_revisions

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      appName: 'my-app',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.AppRevisionsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_app_revisions
  });

  test('getAppRevision request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getAppRevision() result:');
    // begin-get_app_revision

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      appName: 'my-app',
      name: 'my-app-00001',
    };

    let res;
    try {
      res = await codeEngineService.getAppRevision(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_app_revision
  });

  test('listAppInstances request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAppInstances() result:');
    // begin-list_app_instances

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      appName: 'my-app',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.AppInstancesPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_app_instances
  });

  test('listJobs request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listJobs() result:');
    // begin-list_jobs

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.JobsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_jobs
  });

  test('createJob request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createJob() result:');
    // begin-create_job

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      imageReference: 'icr.io/codeengine/helloworld',
      name: 'my-job',
    };

    let res;
    try {
      res = await codeEngineService.createJob(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_job
  });

  test('getJob request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getJob() result:');
    // begin-get_job

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-job',
    };

    let res;
    try {
      res = await codeEngineService.getJob(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_job
  });

  test('updateJob request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateJob() result:');
    // begin-update_job

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-job',
      ifMatch: 'testString',
    };

    let res;
    try {
      res = await codeEngineService.updateJob(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_job
  });

  test('listJobRuns request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listJobRuns() result:');
    // begin-list_job_runs

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      jobName: 'my-job',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.JobRunsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_job_runs
  });

  test('createJobRun request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createJobRun() result:');
    // begin-create_job_run

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
    };

    let res;
    try {
      res = await codeEngineService.createJobRun(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_job_run
  });

  test('getJobRun request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getJobRun() result:');
    // begin-get_job_run

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-job-run',
    };

    let res;
    try {
      res = await codeEngineService.getJobRun(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_job_run
  });

  test('listFunctionRuntimes request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listFunctionRuntimes() result:');
    // begin-list_function_runtimes

    let res;
    try {
      res = await codeEngineService.listFunctionRuntimes({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_function_runtimes
  });

  test('listFunctions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listFunctions() result:');
    // begin-list_functions

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.FunctionsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_functions
  });

  test('createFunction request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createFunction() result:');
    // begin-create_function

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      codeReference: 'data:text/plain;base64,<base64encoded-source-code>',
      name: 'my-function',
      runtime: 'nodejs-18',
    };

    let res;
    try {
      res = await codeEngineService.createFunction(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_function
  });

  test('getFunction request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getFunction() result:');
    // begin-get_function

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-function',
    };

    let res;
    try {
      res = await codeEngineService.getFunction(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_function
  });

  test('updateFunction request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateFunction() result:');
    // begin-update_function

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-function',
      ifMatch: 'testString',
    };

    let res;
    try {
      res = await codeEngineService.updateFunction(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_function
  });

  test('listBindings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listBindings() result:');
    // begin-list_bindings

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.BindingsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_bindings
  });

  test('createBinding request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createBinding() result:');
    // begin-create_binding

    // Request models needed by this operation.

    // ComponentRef
    const componentRefModel = {
      name: 'my-app-1',
      resource_type: 'app_v2',
    };

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      component: componentRefModel,
      prefix: 'MY_COS',
      secretName: 'my-service-access',
    };

    let res;
    try {
      res = await codeEngineService.createBinding(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_binding
  });

  test('getBinding request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBinding() result:');
    // begin-get_binding

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      id: 'a172ced-b5f21bc-71ba50c-1638604',
    };

    let res;
    try {
      res = await codeEngineService.getBinding(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_binding
  });

  test('listBuilds request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listBuilds() result:');
    // begin-list_builds

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.BuildsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_builds
  });

  test('createBuild request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createBuild() result:');
    // begin-create_build

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-build',
      outputImage: 'private.de.icr.io/icr_namespace/image-name',
      outputSecret: 'ce-auto-icr-private-eu-de',
      strategyType: 'dockerfile',
    };

    let res;
    try {
      res = await codeEngineService.createBuild(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_build
  });

  test('getBuild request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBuild() result:');
    // begin-get_build

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-build',
    };

    let res;
    try {
      res = await codeEngineService.getBuild(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_build
  });

  test('updateBuild request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateBuild() result:');
    // begin-update_build

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-build',
      ifMatch: 'testString',
    };

    let res;
    try {
      res = await codeEngineService.updateBuild(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_build
  });

  test('listBuildRuns request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listBuildRuns() result:');
    // begin-list_build_runs

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      buildName: 'my-build',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.BuildRunsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_build_runs
  });

  test('createBuildRun request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createBuildRun() result:');
    // begin-create_build_run

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
    };

    let res;
    try {
      res = await codeEngineService.createBuildRun(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_build_run
  });

  test('getBuildRun request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBuildRun() result:');
    // begin-get_build_run

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-build-run',
    };

    let res;
    try {
      res = await codeEngineService.getBuildRun(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_build_run
  });

  test('listDomainMappings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDomainMappings() result:');
    // begin-list_domain_mappings

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.DomainMappingsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_domain_mappings
  });

  test('createDomainMapping request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDomainMapping() result:');
    // begin-create_domain_mapping

    // Request models needed by this operation.

    // ComponentRef
    const componentRefModel = {
      name: 'my-app-1',
      resource_type: 'app_v2',
    };

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      component: componentRefModel,
      name: 'www.example.com',
      tlsSecret: 'my-tls-secret',
    };

    let res;
    try {
      res = await codeEngineService.createDomainMapping(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_domain_mapping
  });

  test('getDomainMapping request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDomainMapping() result:');
    // begin-get_domain_mapping

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'www.example.com',
    };

    let res;
    try {
      res = await codeEngineService.getDomainMapping(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_domain_mapping
  });

  test('updateDomainMapping request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDomainMapping() result:');
    // begin-update_domain_mapping

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'www.example.com',
      ifMatch: 'testString',
    };

    let res;
    try {
      res = await codeEngineService.updateDomainMapping(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_domain_mapping
  });

  test('listConfigMaps request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listConfigMaps() result:');
    // begin-list_config_maps

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.ConfigMapsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_config_maps
  });

  test('createConfigMap request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createConfigMap() result:');
    // begin-create_config_map

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-config-map',
    };

    let res;
    try {
      res = await codeEngineService.createConfigMap(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_config_map
  });

  test('getConfigMap request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getConfigMap() result:');
    // begin-get_config_map

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-config-map',
    };

    let res;
    try {
      res = await codeEngineService.getConfigMap(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_config_map
  });

  test('replaceConfigMap request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceConfigMap() result:');
    // begin-replace_config_map

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-config-map',
      ifMatch: 'testString',
    };

    let res;
    try {
      res = await codeEngineService.replaceConfigMap(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_config_map
  });

  test('listSecrets request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listSecrets() result:');
    // begin-list_secrets

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new CodeEngineV2.SecretsPager(codeEngineService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_secrets
  });

  test('createSecret request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createSecret() result:');
    // begin-create_secret

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      format: 'generic',
      name: 'my-secret',
    };

    let res;
    try {
      res = await codeEngineService.createSecret(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_secret
  });

  test('getSecret request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSecret() result:');
    // begin-get_secret

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-secret',
    };

    let res;
    try {
      res = await codeEngineService.getSecret(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_secret
  });

  test('replaceSecret request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceSecret() result:');
    // begin-replace_secret

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-secret',
      ifMatch: 'testString',
      format: 'generic',
    };

    let res;
    try {
      res = await codeEngineService.replaceSecret(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_secret
  });

  test('deleteProject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_project

    const params = {
      id: '15314cc3-85b4-4338-903f-c28cdee6d005',
    };

    try {
      await codeEngineService.deleteProject(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_project
  });

  test('deleteApp request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_app

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-app',
    };

    try {
      await codeEngineService.deleteApp(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_app
  });

  test('deleteAppRevision request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_app_revision

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      appName: 'my-app',
      name: 'my-app-00001',
    };

    try {
      await codeEngineService.deleteAppRevision(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_app_revision
  });

  test('deleteJob request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_job

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-job',
    };

    try {
      await codeEngineService.deleteJob(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_job
  });

  test('deleteJobRun request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_job_run

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-job-run',
    };

    try {
      await codeEngineService.deleteJobRun(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_job_run
  });

  test('deleteFunction request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_function

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-function',
    };

    try {
      await codeEngineService.deleteFunction(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_function
  });

  test('deleteBinding request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_binding

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      id: 'a172ced-b5f21bc-71ba50c-1638604',
    };

    try {
      await codeEngineService.deleteBinding(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_binding
  });

  test('deleteBuild request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_build

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-build',
    };

    try {
      await codeEngineService.deleteBuild(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_build
  });

  test('deleteBuildRun request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_build_run

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-build-run',
    };

    try {
      await codeEngineService.deleteBuildRun(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_build_run
  });

  test('deleteDomainMapping request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_domain_mapping

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'www.example.com',
    };

    try {
      await codeEngineService.deleteDomainMapping(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_domain_mapping
  });

  test('deleteConfigMap request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_config_map

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-config-map',
    };

    try {
      await codeEngineService.deleteConfigMap(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_config_map
  });

  test('deleteSecret request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_secret

    const params = {
      projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
      name: 'my-secret',
    };

    try {
      await codeEngineService.deleteSecret(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_secret
  });
});
