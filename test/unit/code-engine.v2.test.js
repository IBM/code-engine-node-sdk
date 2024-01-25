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

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;
const CodeEngineV2 = require('../../dist/code-engine/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const codeEngineServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.au-syd.codeengine.cloud.ibm.com/v2',
};

const codeEngineService = new CodeEngineV2(codeEngineServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(codeEngineService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('CodeEngineV2', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = CodeEngineV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(CodeEngineV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(CodeEngineV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(CodeEngineV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = CodeEngineV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(CodeEngineV2);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new CodeEngineV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new CodeEngineV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(CodeEngineV2.DEFAULT_SERVICE_URL);
    });
  });

  describe('listProjects', () => {
    describe('positive tests', () => {
      function __listProjectsTest() {
        // Construct the params object for operation listProjects
        const limit = 100;
        const start = 'testString';
        const listProjectsParams = {
          limit,
          start,
        };

        const listProjectsResult = codeEngineService.listProjects(listProjectsParams);

        // all methods should return a Promise
        expectToBePromise(listProjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProjectsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listProjectsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listProjectsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProjectsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listProjects(listProjectsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        codeEngineService.listProjects({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('ProjectsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"projects":[{"account_id":"4329073d16d2f3663f74bfa955259139","created_at":"2021-03-29T12:18:13.992359829Z","crn":"crn:v1:bluemix:public:codeengine:eu-de:a/4329073d16d2f3663f74bfa955259139:4e49b3e0-27a8-48d2-a784-c7ee48bb863b::","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b","id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","name":"project-name","region":"us-east","resource_group_id":"5c49eabcf5e85881a37e2d100a33b3df","resource_type":"project_v2","status":"active"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"projects":[{"account_id":"4329073d16d2f3663f74bfa955259139","created_at":"2021-03-29T12:18:13.992359829Z","crn":"crn:v1:bluemix:public:codeengine:eu-de:a/4329073d16d2f3663f74bfa955259139:4e49b3e0-27a8-48d2-a784-c7ee48bb863b::","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b","id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","name":"project-name","region":"us-east","resource_group_id":"5c49eabcf5e85881a37e2d100a33b3df","resource_type":"project_v2","status":"active"}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.ProjectsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          limit: 100,
        };
        const pager = new CodeEngineV2.ProjectsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createProject', () => {
    describe('positive tests', () => {
      function __createProjectTest() {
        // Construct the params object for operation createProject
        const name = 'my-project';
        const resourceGroupId = 'b91e849cedb04e7e92bd68c040c672dc';
        const tags = ['testString'];
        const createProjectParams = {
          name,
          resourceGroupId,
          tags,
        };

        const createProjectResult = codeEngineService.createProject(createProjectParams);

        // all methods should return a Promise
        expectToBePromise(createProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'my-project';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProjectParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createProject(createProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProject', () => {
    describe('positive tests', () => {
      function __getProjectTest() {
        // Construct the params object for operation getProject
        const id = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const getProjectParams = {
          id,
        };

        const getProjectResult = codeEngineService.getProject(getProjectParams);

        // all methods should return a Promise
        expectToBePromise(getProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProjectParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getProject(getProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProject', () => {
    describe('positive tests', () => {
      function __deleteProjectTest() {
        // Construct the params object for operation deleteProject
        const id = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const deleteProjectParams = {
          id,
        };

        const deleteProjectResult = codeEngineService.deleteProject(deleteProjectParams);

        // all methods should return a Promise
        expectToBePromise(deleteProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProjectParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteProject(deleteProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProjectEgressIps', () => {
    describe('positive tests', () => {
      function __getProjectEgressIpsTest() {
        // Construct the params object for operation getProjectEgressIps
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const getProjectEgressIpsParams = {
          projectId,
        };

        const getProjectEgressIpsResult =
          codeEngineService.getProjectEgressIps(getProjectEgressIpsParams);

        // all methods should return a Promise
        expectToBePromise(getProjectEgressIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/egress_ips', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProjectEgressIpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getProjectEgressIpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getProjectEgressIpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProjectEgressIpsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getProjectEgressIps(getProjectEgressIpsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getProjectEgressIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getProjectEgressIps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProjectStatusDetails', () => {
    describe('positive tests', () => {
      function __getProjectStatusDetailsTest() {
        // Construct the params object for operation getProjectStatusDetails
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const getProjectStatusDetailsParams = {
          projectId,
        };

        const getProjectStatusDetailsResult = codeEngineService.getProjectStatusDetails(
          getProjectStatusDetailsParams
        );

        // all methods should return a Promise
        expectToBePromise(getProjectStatusDetailsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/status_details', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProjectStatusDetailsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getProjectStatusDetailsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getProjectStatusDetailsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProjectStatusDetailsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getProjectStatusDetails(getProjectStatusDetailsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getProjectStatusDetails({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getProjectStatusDetails();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listApps', () => {
    describe('positive tests', () => {
      function __listAppsTest() {
        // Construct the params object for operation listApps
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const limit = 100;
        const start = 'testString';
        const listAppsParams = {
          projectId,
          limit,
          start,
        };

        const listAppsResult = codeEngineService.listApps(listAppsParams);

        // all methods should return a Promise
        expectToBePromise(listAppsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/apps', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAppsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listAppsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listAppsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAppsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listApps(listAppsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listApps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listApps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('AppsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/apps';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"apps":[{"build":"my-build","build_run":"my-build-run","created_at":"2022-09-13T11:41:35+02:00","endpoint":"https://my-app.vg67hzldruk.eu-de.codeengine.appdomain.cloud","endpoint_internal":"http://my-app.vg67hzldruk.svc.cluster.local","entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/apps/my-app","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","image_port":8080,"image_reference":"icr.io/codeengine/helloworld","image_secret":"my-secret","managed_domain_mappings":"local_public","name":"my-app","probe_liveness":{"failure_threshold":5,"initial_delay":5,"interval":5,"path":"path","port":8080,"timeout":300,"type":"tcp"},"probe_readiness":{"failure_threshold":5,"initial_delay":5,"interval":5,"path":"path","port":8080,"timeout":300,"type":"tcp"},"project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"app_v2","run_arguments":["run_arguments"],"run_as_user":1001,"run_commands":["run_commands"],"run_env_variables":[{"key":"MY_VARIABLE","name":"SOME","prefix":"PREFIX_","reference":"my-secret","type":"literal","value":"VALUE"}],"run_service_account":"default","run_volume_mounts":[{"mount_path":"/app","name":"codeengine-mount-b69u90","reference":"my-secret","type":"secret"}],"scale_concurrency":100,"scale_concurrency_target":80,"scale_cpu_limit":"1","scale_down_delay":300,"scale_ephemeral_storage_limit":"4G","scale_initial_instances":1,"scale_max_instances":10,"scale_memory_limit":"4G","scale_min_instances":1,"scale_request_timeout":300,"status":"ready","status_details":{"latest_created_revision":"my-app-00001","latest_ready_revision":"my-app-00001","reason":"ready"}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"apps":[{"build":"my-build","build_run":"my-build-run","created_at":"2022-09-13T11:41:35+02:00","endpoint":"https://my-app.vg67hzldruk.eu-de.codeengine.appdomain.cloud","endpoint_internal":"http://my-app.vg67hzldruk.svc.cluster.local","entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/apps/my-app","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","image_port":8080,"image_reference":"icr.io/codeengine/helloworld","image_secret":"my-secret","managed_domain_mappings":"local_public","name":"my-app","probe_liveness":{"failure_threshold":5,"initial_delay":5,"interval":5,"path":"path","port":8080,"timeout":300,"type":"tcp"},"probe_readiness":{"failure_threshold":5,"initial_delay":5,"interval":5,"path":"path","port":8080,"timeout":300,"type":"tcp"},"project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"app_v2","run_arguments":["run_arguments"],"run_as_user":1001,"run_commands":["run_commands"],"run_env_variables":[{"key":"MY_VARIABLE","name":"SOME","prefix":"PREFIX_","reference":"my-secret","type":"literal","value":"VALUE"}],"run_service_account":"default","run_volume_mounts":[{"mount_path":"/app","name":"codeengine-mount-b69u90","reference":"my-secret","type":"secret"}],"scale_concurrency":100,"scale_concurrency_target":80,"scale_cpu_limit":"1","scale_down_delay":300,"scale_ephemeral_storage_limit":"4G","scale_initial_instances":1,"scale_max_instances":10,"scale_memory_limit":"4G","scale_min_instances":1,"scale_request_timeout":300,"status":"ready","status_details":{"latest_created_revision":"my-app-00001","latest_ready_revision":"my-app-00001","reason":"ready"}}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.AppsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const pager = new CodeEngineV2.AppsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createApp', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProbePrototype
      const probePrototypeModel = {
        failure_threshold: 5,
        initial_delay: 5,
        interval: 5,
        path: 'testString',
        port: 8080,
        timeout: 300,
        type: 'tcp',
      };

      // EnvVarPrototype
      const envVarPrototypeModel = {
        key: 'MY_VARIABLE',
        name: 'SOME',
        prefix: 'PREFIX_',
        reference: 'my-secret',
        type: 'literal',
        value: 'VALUE',
      };

      // VolumeMountPrototype
      const volumeMountPrototypeModel = {
        mount_path: '/app',
        name: 'codeengine-mount-b69u90',
        reference: 'my-secret',
        type: 'secret',
      };

      function __createAppTest() {
        // Construct the params object for operation createApp
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const imageReference = 'icr.io/codeengine/helloworld';
        const name = 'my-app';
        const imagePort = 8080;
        const imageSecret = 'my-secret';
        const managedDomainMappings = 'local_public';
        const probeLiveness = probePrototypeModel;
        const probeReadiness = probePrototypeModel;
        const runArguments = ['testString'];
        const runAsUser = 1001;
        const runCommands = ['testString'];
        const runEnvVariables = [envVarPrototypeModel];
        const runServiceAccount = 'default';
        const runVolumeMounts = [volumeMountPrototypeModel];
        const scaleConcurrency = 100;
        const scaleConcurrencyTarget = 80;
        const scaleCpuLimit = '1';
        const scaleDownDelay = 300;
        const scaleEphemeralStorageLimit = '4G';
        const scaleInitialInstances = 1;
        const scaleMaxInstances = 10;
        const scaleMemoryLimit = '4G';
        const scaleMinInstances = 1;
        const scaleRequestTimeout = 300;
        const createAppParams = {
          projectId,
          imageReference,
          name,
          imagePort,
          imageSecret,
          managedDomainMappings,
          probeLiveness,
          probeReadiness,
          runArguments,
          runAsUser,
          runCommands,
          runEnvVariables,
          runServiceAccount,
          runVolumeMounts,
          scaleConcurrency,
          scaleConcurrencyTarget,
          scaleCpuLimit,
          scaleDownDelay,
          scaleEphemeralStorageLimit,
          scaleInitialInstances,
          scaleMaxInstances,
          scaleMemoryLimit,
          scaleMinInstances,
          scaleRequestTimeout,
        };

        const createAppResult = codeEngineService.createApp(createAppParams);

        // all methods should return a Promise
        expectToBePromise(createAppResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/apps', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.image_reference).toEqual(imageReference);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.image_port).toEqual(imagePort);
        expect(mockRequestOptions.body.image_secret).toEqual(imageSecret);
        expect(mockRequestOptions.body.managed_domain_mappings).toEqual(managedDomainMappings);
        expect(mockRequestOptions.body.probe_liveness).toEqual(probeLiveness);
        expect(mockRequestOptions.body.probe_readiness).toEqual(probeReadiness);
        expect(mockRequestOptions.body.run_arguments).toEqual(runArguments);
        expect(mockRequestOptions.body.run_as_user).toEqual(runAsUser);
        expect(mockRequestOptions.body.run_commands).toEqual(runCommands);
        expect(mockRequestOptions.body.run_env_variables).toEqual(runEnvVariables);
        expect(mockRequestOptions.body.run_service_account).toEqual(runServiceAccount);
        expect(mockRequestOptions.body.run_volume_mounts).toEqual(runVolumeMounts);
        expect(mockRequestOptions.body.scale_concurrency).toEqual(scaleConcurrency);
        expect(mockRequestOptions.body.scale_concurrency_target).toEqual(scaleConcurrencyTarget);
        expect(mockRequestOptions.body.scale_cpu_limit).toEqual(scaleCpuLimit);
        expect(mockRequestOptions.body.scale_down_delay).toEqual(scaleDownDelay);
        expect(mockRequestOptions.body.scale_ephemeral_storage_limit).toEqual(
          scaleEphemeralStorageLimit
        );
        expect(mockRequestOptions.body.scale_initial_instances).toEqual(scaleInitialInstances);
        expect(mockRequestOptions.body.scale_max_instances).toEqual(scaleMaxInstances);
        expect(mockRequestOptions.body.scale_memory_limit).toEqual(scaleMemoryLimit);
        expect(mockRequestOptions.body.scale_min_instances).toEqual(scaleMinInstances);
        expect(mockRequestOptions.body.scale_request_timeout).toEqual(scaleRequestTimeout);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAppTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createAppTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createAppTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const imageReference = 'icr.io/codeengine/helloworld';
        const name = 'my-app';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAppParams = {
          projectId,
          imageReference,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createApp(createAppParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createApp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createApp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getApp', () => {
    describe('positive tests', () => {
      function __getAppTest() {
        // Construct the params object for operation getApp
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-app';
        const getAppParams = {
          projectId,
          name,
        };

        const getAppResult = codeEngineService.getApp(getAppParams);

        // all methods should return a Promise
        expectToBePromise(getAppResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/apps/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAppTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getAppTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getAppTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-app';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAppParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getApp(getAppParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getApp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getApp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteApp', () => {
    describe('positive tests', () => {
      function __deleteAppTest() {
        // Construct the params object for operation deleteApp
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-app';
        const deleteAppParams = {
          projectId,
          name,
        };

        const deleteAppResult = codeEngineService.deleteApp(deleteAppParams);

        // all methods should return a Promise
        expectToBePromise(deleteAppResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/apps/{name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAppTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteAppTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteAppTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-app';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAppParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteApp(deleteAppParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteApp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteApp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateApp', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProbePrototype
      const probePrototypeModel = {
        failure_threshold: 5,
        initial_delay: 5,
        interval: 5,
        path: 'testString',
        port: 8080,
        timeout: 300,
        type: 'tcp',
      };

      // EnvVarPrototype
      const envVarPrototypeModel = {
        key: 'MY_VARIABLE',
        name: 'SOME',
        prefix: 'PREFIX_',
        reference: 'my-secret',
        type: 'literal',
        value: 'VALUE',
      };

      // VolumeMountPrototype
      const volumeMountPrototypeModel = {
        mount_path: '/app',
        name: 'codeengine-mount-b69u90',
        reference: 'my-secret',
        type: 'secret',
      };

      function __updateAppTest() {
        // Construct the params object for operation updateApp
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-app';
        const ifMatch = 'testString';
        const imagePort = 8080;
        const imageReference = 'icr.io/codeengine/helloworld';
        const imageSecret = 'my-secret';
        const managedDomainMappings = 'local_public';
        const probeLiveness = probePrototypeModel;
        const probeReadiness = probePrototypeModel;
        const runArguments = ['testString'];
        const runAsUser = 1001;
        const runCommands = ['testString'];
        const runEnvVariables = [envVarPrototypeModel];
        const runServiceAccount = 'default';
        const runVolumeMounts = [volumeMountPrototypeModel];
        const scaleConcurrency = 100;
        const scaleConcurrencyTarget = 80;
        const scaleCpuLimit = '1';
        const scaleDownDelay = 300;
        const scaleEphemeralStorageLimit = '4G';
        const scaleInitialInstances = 1;
        const scaleMaxInstances = 10;
        const scaleMemoryLimit = '4G';
        const scaleMinInstances = 1;
        const scaleRequestTimeout = 300;
        const updateAppParams = {
          projectId,
          name,
          ifMatch,
          imagePort,
          imageReference,
          imageSecret,
          managedDomainMappings,
          probeLiveness,
          probeReadiness,
          runArguments,
          runAsUser,
          runCommands,
          runEnvVariables,
          runServiceAccount,
          runVolumeMounts,
          scaleConcurrency,
          scaleConcurrencyTarget,
          scaleCpuLimit,
          scaleDownDelay,
          scaleEphemeralStorageLimit,
          scaleInitialInstances,
          scaleMaxInstances,
          scaleMemoryLimit,
          scaleMinInstances,
          scaleRequestTimeout,
        };

        const updateAppResult = codeEngineService.updateApp(updateAppParams);

        // all methods should return a Promise
        expectToBePromise(updateAppResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/apps/{name}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.image_port).toEqual(imagePort);
        expect(mockRequestOptions.body.image_reference).toEqual(imageReference);
        expect(mockRequestOptions.body.image_secret).toEqual(imageSecret);
        expect(mockRequestOptions.body.managed_domain_mappings).toEqual(managedDomainMappings);
        expect(mockRequestOptions.body.probe_liveness).toEqual(probeLiveness);
        expect(mockRequestOptions.body.probe_readiness).toEqual(probeReadiness);
        expect(mockRequestOptions.body.run_arguments).toEqual(runArguments);
        expect(mockRequestOptions.body.run_as_user).toEqual(runAsUser);
        expect(mockRequestOptions.body.run_commands).toEqual(runCommands);
        expect(mockRequestOptions.body.run_env_variables).toEqual(runEnvVariables);
        expect(mockRequestOptions.body.run_service_account).toEqual(runServiceAccount);
        expect(mockRequestOptions.body.run_volume_mounts).toEqual(runVolumeMounts);
        expect(mockRequestOptions.body.scale_concurrency).toEqual(scaleConcurrency);
        expect(mockRequestOptions.body.scale_concurrency_target).toEqual(scaleConcurrencyTarget);
        expect(mockRequestOptions.body.scale_cpu_limit).toEqual(scaleCpuLimit);
        expect(mockRequestOptions.body.scale_down_delay).toEqual(scaleDownDelay);
        expect(mockRequestOptions.body.scale_ephemeral_storage_limit).toEqual(
          scaleEphemeralStorageLimit
        );
        expect(mockRequestOptions.body.scale_initial_instances).toEqual(scaleInitialInstances);
        expect(mockRequestOptions.body.scale_max_instances).toEqual(scaleMaxInstances);
        expect(mockRequestOptions.body.scale_memory_limit).toEqual(scaleMemoryLimit);
        expect(mockRequestOptions.body.scale_min_instances).toEqual(scaleMinInstances);
        expect(mockRequestOptions.body.scale_request_timeout).toEqual(scaleRequestTimeout);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAppTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __updateAppTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __updateAppTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-app';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAppParams = {
          projectId,
          name,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.updateApp(updateAppParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.updateApp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.updateApp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAppRevisions', () => {
    describe('positive tests', () => {
      function __listAppRevisionsTest() {
        // Construct the params object for operation listAppRevisions
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const appName = 'my-app';
        const limit = 100;
        const start = 'testString';
        const listAppRevisionsParams = {
          projectId,
          appName,
          limit,
          start,
        };

        const listAppRevisionsResult = codeEngineService.listAppRevisions(listAppRevisionsParams);

        // all methods should return a Promise
        expectToBePromise(listAppRevisionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/projects/{project_id}/apps/{app_name}/revisions',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.app_name).toEqual(appName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAppRevisionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listAppRevisionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listAppRevisionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const appName = 'my-app';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAppRevisionsParams = {
          projectId,
          appName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listAppRevisions(listAppRevisionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listAppRevisions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listAppRevisions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('AppRevisionsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/apps/my-app/revisions';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"revisions":[{"app_name":"my-app","created_at":"2022-09-13T11:41:35+02:00","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/apps/my-app/revisions/my-app-00001","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","image_port":8080,"image_reference":"icr.io/codeengine/helloworld","image_secret":"my-secret","name":"my-app-00001","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"app_revision_v2","run_arguments":["run_arguments"],"run_as_user":1001,"run_commands":["run_commands"],"run_env_variables":[{"key":"MY_VARIABLE","name":"SOME","prefix":"PREFIX_","reference":"my-secret","type":"literal","value":"VALUE"}],"run_service_account":"default","run_volume_mounts":[{"mount_path":"/app","name":"codeengine-mount-b69u90","reference":"my-secret","type":"secret"}],"scale_concurrency":100,"scale_concurrency_target":80,"scale_cpu_limit":"1","scale_down_delay":300,"scale_ephemeral_storage_limit":"4G","scale_initial_instances":1,"scale_max_instances":10,"scale_memory_limit":"4G","scale_min_instances":1,"scale_request_timeout":300,"status":"ready","status_details":{"actual_instances":1,"reason":"ready"}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"revisions":[{"app_name":"my-app","created_at":"2022-09-13T11:41:35+02:00","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/apps/my-app/revisions/my-app-00001","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","image_port":8080,"image_reference":"icr.io/codeengine/helloworld","image_secret":"my-secret","name":"my-app-00001","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"app_revision_v2","run_arguments":["run_arguments"],"run_as_user":1001,"run_commands":["run_commands"],"run_env_variables":[{"key":"MY_VARIABLE","name":"SOME","prefix":"PREFIX_","reference":"my-secret","type":"literal","value":"VALUE"}],"run_service_account":"default","run_volume_mounts":[{"mount_path":"/app","name":"codeengine-mount-b69u90","reference":"my-secret","type":"secret"}],"scale_concurrency":100,"scale_concurrency_target":80,"scale_cpu_limit":"1","scale_down_delay":300,"scale_ephemeral_storage_limit":"4G","scale_initial_instances":1,"scale_max_instances":10,"scale_memory_limit":"4G","scale_min_instances":1,"scale_request_timeout":300,"status":"ready","status_details":{"actual_instances":1,"reason":"ready"}}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          appName: 'my-app',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.AppRevisionsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          appName: 'my-app',
          limit: 100,
        };
        const pager = new CodeEngineV2.AppRevisionsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getAppRevision', () => {
    describe('positive tests', () => {
      function __getAppRevisionTest() {
        // Construct the params object for operation getAppRevision
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const appName = 'my-app';
        const name = 'my-app-00001';
        const getAppRevisionParams = {
          projectId,
          appName,
          name,
        };

        const getAppRevisionResult = codeEngineService.getAppRevision(getAppRevisionParams);

        // all methods should return a Promise
        expectToBePromise(getAppRevisionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/projects/{project_id}/apps/{app_name}/revisions/{name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.app_name).toEqual(appName);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAppRevisionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getAppRevisionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getAppRevisionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const appName = 'my-app';
        const name = 'my-app-00001';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAppRevisionParams = {
          projectId,
          appName,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getAppRevision(getAppRevisionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getAppRevision({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getAppRevision();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAppRevision', () => {
    describe('positive tests', () => {
      function __deleteAppRevisionTest() {
        // Construct the params object for operation deleteAppRevision
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const appName = 'my-app';
        const name = 'my-app-00001';
        const deleteAppRevisionParams = {
          projectId,
          appName,
          name,
        };

        const deleteAppRevisionResult =
          codeEngineService.deleteAppRevision(deleteAppRevisionParams);

        // all methods should return a Promise
        expectToBePromise(deleteAppRevisionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/projects/{project_id}/apps/{app_name}/revisions/{name}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.app_name).toEqual(appName);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAppRevisionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteAppRevisionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteAppRevisionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const appName = 'my-app';
        const name = 'my-app-00001';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAppRevisionParams = {
          projectId,
          appName,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteAppRevision(deleteAppRevisionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteAppRevision({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteAppRevision();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listJobs', () => {
    describe('positive tests', () => {
      function __listJobsTest() {
        // Construct the params object for operation listJobs
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const limit = 100;
        const start = 'testString';
        const listJobsParams = {
          projectId,
          limit,
          start,
        };

        const listJobsResult = codeEngineService.listJobs(listJobsParams);

        // all methods should return a Promise
        expectToBePromise(listJobsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/jobs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listJobsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listJobsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listJobsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listJobsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listJobs(listJobsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listJobs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listJobs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('JobsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/jobs';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"jobs":[{"build":"my-build","build_run":"my-build-run","created_at":"2022-09-13T11:41:35+02:00","entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/jobs/my-job","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","image_reference":"icr.io/codeengine/helloworld","image_secret":"my-secret","name":"my-job","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"job_v2","run_arguments":["run_arguments"],"run_as_user":1001,"run_commands":["run_commands"],"run_env_variables":[{"key":"MY_VARIABLE","name":"SOME","prefix":"PREFIX_","reference":"my-secret","type":"literal","value":"VALUE"}],"run_mode":"task","run_service_account":"default","run_volume_mounts":[{"mount_path":"/app","name":"codeengine-mount-b69u90","reference":"my-secret","type":"secret"}],"scale_array_spec":"1-5,7-8,10","scale_cpu_limit":"1","scale_ephemeral_storage_limit":"4G","scale_max_execution_time":7200,"scale_memory_limit":"4G","scale_retry_limit":3}],"limit":1}';
      const mockPagerResponse2 =
        '{"total_count":2,"jobs":[{"build":"my-build","build_run":"my-build-run","created_at":"2022-09-13T11:41:35+02:00","entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/jobs/my-job","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","image_reference":"icr.io/codeengine/helloworld","image_secret":"my-secret","name":"my-job","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"job_v2","run_arguments":["run_arguments"],"run_as_user":1001,"run_commands":["run_commands"],"run_env_variables":[{"key":"MY_VARIABLE","name":"SOME","prefix":"PREFIX_","reference":"my-secret","type":"literal","value":"VALUE"}],"run_mode":"task","run_service_account":"default","run_volume_mounts":[{"mount_path":"/app","name":"codeengine-mount-b69u90","reference":"my-secret","type":"secret"}],"scale_array_spec":"1-5,7-8,10","scale_cpu_limit":"1","scale_ephemeral_storage_limit":"4G","scale_max_execution_time":7200,"scale_memory_limit":"4G","scale_retry_limit":3}],"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.JobsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const pager = new CodeEngineV2.JobsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createJob', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EnvVarPrototype
      const envVarPrototypeModel = {
        key: 'MY_VARIABLE',
        name: 'SOME',
        prefix: 'PREFIX_',
        reference: 'my-secret',
        type: 'literal',
        value: 'VALUE',
      };

      // VolumeMountPrototype
      const volumeMountPrototypeModel = {
        mount_path: '/app',
        name: 'codeengine-mount-b69u90',
        reference: 'my-secret',
        type: 'secret',
      };

      function __createJobTest() {
        // Construct the params object for operation createJob
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const imageReference = 'icr.io/codeengine/helloworld';
        const name = 'my-job';
        const imageSecret = 'my-secret';
        const runArguments = ['testString'];
        const runAsUser = 1001;
        const runCommands = ['testString'];
        const runEnvVariables = [envVarPrototypeModel];
        const runMode = 'task';
        const runServiceAccount = 'default';
        const runVolumeMounts = [volumeMountPrototypeModel];
        const scaleArraySpec = '1-5,7-8,10';
        const scaleCpuLimit = '1';
        const scaleEphemeralStorageLimit = '4G';
        const scaleMaxExecutionTime = 7200;
        const scaleMemoryLimit = '4G';
        const scaleRetryLimit = 3;
        const createJobParams = {
          projectId,
          imageReference,
          name,
          imageSecret,
          runArguments,
          runAsUser,
          runCommands,
          runEnvVariables,
          runMode,
          runServiceAccount,
          runVolumeMounts,
          scaleArraySpec,
          scaleCpuLimit,
          scaleEphemeralStorageLimit,
          scaleMaxExecutionTime,
          scaleMemoryLimit,
          scaleRetryLimit,
        };

        const createJobResult = codeEngineService.createJob(createJobParams);

        // all methods should return a Promise
        expectToBePromise(createJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/jobs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.image_reference).toEqual(imageReference);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.image_secret).toEqual(imageSecret);
        expect(mockRequestOptions.body.run_arguments).toEqual(runArguments);
        expect(mockRequestOptions.body.run_as_user).toEqual(runAsUser);
        expect(mockRequestOptions.body.run_commands).toEqual(runCommands);
        expect(mockRequestOptions.body.run_env_variables).toEqual(runEnvVariables);
        expect(mockRequestOptions.body.run_mode).toEqual(runMode);
        expect(mockRequestOptions.body.run_service_account).toEqual(runServiceAccount);
        expect(mockRequestOptions.body.run_volume_mounts).toEqual(runVolumeMounts);
        expect(mockRequestOptions.body.scale_array_spec).toEqual(scaleArraySpec);
        expect(mockRequestOptions.body.scale_cpu_limit).toEqual(scaleCpuLimit);
        expect(mockRequestOptions.body.scale_ephemeral_storage_limit).toEqual(
          scaleEphemeralStorageLimit
        );
        expect(mockRequestOptions.body.scale_max_execution_time).toEqual(scaleMaxExecutionTime);
        expect(mockRequestOptions.body.scale_memory_limit).toEqual(scaleMemoryLimit);
        expect(mockRequestOptions.body.scale_retry_limit).toEqual(scaleRetryLimit);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const imageReference = 'icr.io/codeengine/helloworld';
        const name = 'my-job';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createJobParams = {
          projectId,
          imageReference,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createJob(createJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getJob', () => {
    describe('positive tests', () => {
      function __getJobTest() {
        // Construct the params object for operation getJob
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job';
        const getJobParams = {
          projectId,
          name,
        };

        const getJobResult = codeEngineService.getJob(getJobParams);

        // all methods should return a Promise
        expectToBePromise(getJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/jobs/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getJobParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getJob(getJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteJob', () => {
    describe('positive tests', () => {
      function __deleteJobTest() {
        // Construct the params object for operation deleteJob
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job';
        const deleteJobParams = {
          projectId,
          name,
        };

        const deleteJobResult = codeEngineService.deleteJob(deleteJobParams);

        // all methods should return a Promise
        expectToBePromise(deleteJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/jobs/{name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteJobParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteJob(deleteJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateJob', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EnvVarPrototype
      const envVarPrototypeModel = {
        key: 'MY_VARIABLE',
        name: 'SOME',
        prefix: 'PREFIX_',
        reference: 'my-secret',
        type: 'literal',
        value: 'VALUE',
      };

      // VolumeMountPrototype
      const volumeMountPrototypeModel = {
        mount_path: '/app',
        name: 'codeengine-mount-b69u90',
        reference: 'my-secret',
        type: 'secret',
      };

      function __updateJobTest() {
        // Construct the params object for operation updateJob
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job';
        const ifMatch = 'testString';
        const imageReference = 'icr.io/codeengine/helloworld';
        const imageSecret = 'my-secret';
        const runArguments = ['testString'];
        const runAsUser = 1001;
        const runCommands = ['testString'];
        const runEnvVariables = [envVarPrototypeModel];
        const runMode = 'task';
        const runServiceAccount = 'default';
        const runVolumeMounts = [volumeMountPrototypeModel];
        const scaleArraySpec = '1-5,7-8,10';
        const scaleCpuLimit = '1';
        const scaleEphemeralStorageLimit = '4G';
        const scaleMaxExecutionTime = 7200;
        const scaleMemoryLimit = '4G';
        const scaleRetryLimit = 3;
        const updateJobParams = {
          projectId,
          name,
          ifMatch,
          imageReference,
          imageSecret,
          runArguments,
          runAsUser,
          runCommands,
          runEnvVariables,
          runMode,
          runServiceAccount,
          runVolumeMounts,
          scaleArraySpec,
          scaleCpuLimit,
          scaleEphemeralStorageLimit,
          scaleMaxExecutionTime,
          scaleMemoryLimit,
          scaleRetryLimit,
        };

        const updateJobResult = codeEngineService.updateJob(updateJobParams);

        // all methods should return a Promise
        expectToBePromise(updateJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/jobs/{name}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.image_reference).toEqual(imageReference);
        expect(mockRequestOptions.body.image_secret).toEqual(imageSecret);
        expect(mockRequestOptions.body.run_arguments).toEqual(runArguments);
        expect(mockRequestOptions.body.run_as_user).toEqual(runAsUser);
        expect(mockRequestOptions.body.run_commands).toEqual(runCommands);
        expect(mockRequestOptions.body.run_env_variables).toEqual(runEnvVariables);
        expect(mockRequestOptions.body.run_mode).toEqual(runMode);
        expect(mockRequestOptions.body.run_service_account).toEqual(runServiceAccount);
        expect(mockRequestOptions.body.run_volume_mounts).toEqual(runVolumeMounts);
        expect(mockRequestOptions.body.scale_array_spec).toEqual(scaleArraySpec);
        expect(mockRequestOptions.body.scale_cpu_limit).toEqual(scaleCpuLimit);
        expect(mockRequestOptions.body.scale_ephemeral_storage_limit).toEqual(
          scaleEphemeralStorageLimit
        );
        expect(mockRequestOptions.body.scale_max_execution_time).toEqual(scaleMaxExecutionTime);
        expect(mockRequestOptions.body.scale_memory_limit).toEqual(scaleMemoryLimit);
        expect(mockRequestOptions.body.scale_retry_limit).toEqual(scaleRetryLimit);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __updateJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __updateJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateJobParams = {
          projectId,
          name,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.updateJob(updateJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.updateJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.updateJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listJobRuns', () => {
    describe('positive tests', () => {
      function __listJobRunsTest() {
        // Construct the params object for operation listJobRuns
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const jobName = 'my-job';
        const limit = 100;
        const start = 'testString';
        const listJobRunsParams = {
          projectId,
          jobName,
          limit,
          start,
        };

        const listJobRunsResult = codeEngineService.listJobRuns(listJobRunsParams);

        // all methods should return a Promise
        expectToBePromise(listJobRunsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/job_runs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.job_name).toEqual(jobName);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listJobRunsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listJobRunsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listJobRunsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listJobRunsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listJobRuns(listJobRunsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listJobRuns({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listJobRuns();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('JobRunsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/job_runs';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"job_runs":[{"created_at":"2022-09-13T11:41:35+02:00","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/job_runs/my-job-run","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","image_reference":"icr.io/codeengine/helloworld","image_secret":"my-secret","job_name":"my-job","name":"my-job-run","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"job_run_v2","run_arguments":["run_arguments"],"run_as_user":1001,"run_commands":["run_commands"],"run_env_variables":[{"key":"MY_VARIABLE","name":"SOME","prefix":"PREFIX_","reference":"my-secret","type":"literal","value":"VALUE"}],"run_mode":"task","run_service_account":"default","run_volume_mounts":[{"mount_path":"/app","name":"codeengine-mount-b69u90","reference":"my-secret","type":"secret"}],"scale_array_size_variable_override":2,"scale_array_spec":"1-5,7-8,10","scale_cpu_limit":"1","scale_ephemeral_storage_limit":"4G","scale_max_execution_time":7200,"scale_memory_limit":"4G","scale_retry_limit":3,"status":"failed","status_details":{"completion_time":"2022-09-22T17:40:00Z","failed":0,"pending":0,"requested":0,"running":0,"start_time":"2022-09-22T17:34:00Z","succeeded":1,"unknown":0}}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"job_runs":[{"created_at":"2022-09-13T11:41:35+02:00","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/job_runs/my-job-run","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","image_reference":"icr.io/codeengine/helloworld","image_secret":"my-secret","job_name":"my-job","name":"my-job-run","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"job_run_v2","run_arguments":["run_arguments"],"run_as_user":1001,"run_commands":["run_commands"],"run_env_variables":[{"key":"MY_VARIABLE","name":"SOME","prefix":"PREFIX_","reference":"my-secret","type":"literal","value":"VALUE"}],"run_mode":"task","run_service_account":"default","run_volume_mounts":[{"mount_path":"/app","name":"codeengine-mount-b69u90","reference":"my-secret","type":"secret"}],"scale_array_size_variable_override":2,"scale_array_spec":"1-5,7-8,10","scale_cpu_limit":"1","scale_ephemeral_storage_limit":"4G","scale_max_execution_time":7200,"scale_memory_limit":"4G","scale_retry_limit":3,"status":"failed","status_details":{"completion_time":"2022-09-22T17:40:00Z","failed":0,"pending":0,"requested":0,"running":0,"start_time":"2022-09-22T17:34:00Z","succeeded":1,"unknown":0}}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          jobName: 'my-job',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.JobRunsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          jobName: 'my-job',
          limit: 100,
        };
        const pager = new CodeEngineV2.JobRunsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createJobRun', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EnvVarPrototype
      const envVarPrototypeModel = {
        key: 'MY_VARIABLE',
        name: 'SOME',
        prefix: 'PREFIX_',
        reference: 'my-secret',
        type: 'literal',
        value: 'VALUE',
      };

      // VolumeMountPrototype
      const volumeMountPrototypeModel = {
        mount_path: '/app',
        name: 'codeengine-mount-b69u90',
        reference: 'my-secret',
        type: 'secret',
      };

      function __createJobRunTest() {
        // Construct the params object for operation createJobRun
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const imageReference = 'icr.io/codeengine/helloworld';
        const imageSecret = 'my-secret';
        const jobName = 'my-job';
        const name = 'my-job-run';
        const runArguments = ['testString'];
        const runAsUser = 1001;
        const runCommands = ['testString'];
        const runEnvVariables = [envVarPrototypeModel];
        const runMode = 'task';
        const runServiceAccount = 'default';
        const runVolumeMounts = [volumeMountPrototypeModel];
        const scaleArraySizeVariableOverride = 2;
        const scaleArraySpec = '1-5,7-8,10';
        const scaleCpuLimit = '1';
        const scaleEphemeralStorageLimit = '4G';
        const scaleMaxExecutionTime = 7200;
        const scaleMemoryLimit = '4G';
        const scaleRetryLimit = 3;
        const createJobRunParams = {
          projectId,
          imageReference,
          imageSecret,
          jobName,
          name,
          runArguments,
          runAsUser,
          runCommands,
          runEnvVariables,
          runMode,
          runServiceAccount,
          runVolumeMounts,
          scaleArraySizeVariableOverride,
          scaleArraySpec,
          scaleCpuLimit,
          scaleEphemeralStorageLimit,
          scaleMaxExecutionTime,
          scaleMemoryLimit,
          scaleRetryLimit,
        };

        const createJobRunResult = codeEngineService.createJobRun(createJobRunParams);

        // all methods should return a Promise
        expectToBePromise(createJobRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/job_runs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.image_reference).toEqual(imageReference);
        expect(mockRequestOptions.body.image_secret).toEqual(imageSecret);
        expect(mockRequestOptions.body.job_name).toEqual(jobName);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.run_arguments).toEqual(runArguments);
        expect(mockRequestOptions.body.run_as_user).toEqual(runAsUser);
        expect(mockRequestOptions.body.run_commands).toEqual(runCommands);
        expect(mockRequestOptions.body.run_env_variables).toEqual(runEnvVariables);
        expect(mockRequestOptions.body.run_mode).toEqual(runMode);
        expect(mockRequestOptions.body.run_service_account).toEqual(runServiceAccount);
        expect(mockRequestOptions.body.run_volume_mounts).toEqual(runVolumeMounts);
        expect(mockRequestOptions.body.scale_array_size_variable_override).toEqual(
          scaleArraySizeVariableOverride
        );
        expect(mockRequestOptions.body.scale_array_spec).toEqual(scaleArraySpec);
        expect(mockRequestOptions.body.scale_cpu_limit).toEqual(scaleCpuLimit);
        expect(mockRequestOptions.body.scale_ephemeral_storage_limit).toEqual(
          scaleEphemeralStorageLimit
        );
        expect(mockRequestOptions.body.scale_max_execution_time).toEqual(scaleMaxExecutionTime);
        expect(mockRequestOptions.body.scale_memory_limit).toEqual(scaleMemoryLimit);
        expect(mockRequestOptions.body.scale_retry_limit).toEqual(scaleRetryLimit);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createJobRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createJobRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createJobRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createJobRunParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createJobRun(createJobRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createJobRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createJobRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getJobRun', () => {
    describe('positive tests', () => {
      function __getJobRunTest() {
        // Construct the params object for operation getJobRun
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job-run';
        const getJobRunParams = {
          projectId,
          name,
        };

        const getJobRunResult = codeEngineService.getJobRun(getJobRunParams);

        // all methods should return a Promise
        expectToBePromise(getJobRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/job_runs/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getJobRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getJobRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getJobRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job-run';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getJobRunParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getJobRun(getJobRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getJobRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getJobRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteJobRun', () => {
    describe('positive tests', () => {
      function __deleteJobRunTest() {
        // Construct the params object for operation deleteJobRun
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job-run';
        const deleteJobRunParams = {
          projectId,
          name,
        };

        const deleteJobRunResult = codeEngineService.deleteJobRun(deleteJobRunParams);

        // all methods should return a Promise
        expectToBePromise(deleteJobRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/job_runs/{name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteJobRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteJobRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteJobRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-job-run';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteJobRunParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteJobRun(deleteJobRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteJobRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteJobRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listBindings', () => {
    describe('positive tests', () => {
      function __listBindingsTest() {
        // Construct the params object for operation listBindings
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const limit = 100;
        const start = 'testString';
        const listBindingsParams = {
          projectId,
          limit,
          start,
        };

        const listBindingsResult = codeEngineService.listBindings(listBindingsParams);

        // all methods should return a Promise
        expectToBePromise(listBindingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/bindings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBindingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listBindingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listBindingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBindingsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listBindings(listBindingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listBindings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listBindings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('BindingsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/bindings';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"bindings":[{"component":{"name":"my-app-1","resource_type":"app_v2"},"href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/bindings/my-binding","id":"a172ced-b5f21bc-71ba50c-1638604","prefix":"MY_COS","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","resource_type":"binding_v2","secret_name":"my-service-access","status":"active"}],"limit":1}';
      const mockPagerResponse2 =
        '{"total_count":2,"bindings":[{"component":{"name":"my-app-1","resource_type":"app_v2"},"href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/bindings/my-binding","id":"a172ced-b5f21bc-71ba50c-1638604","prefix":"MY_COS","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","resource_type":"binding_v2","secret_name":"my-service-access","status":"active"}],"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.BindingsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const pager = new CodeEngineV2.BindingsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createBinding', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ComponentRef
      const componentRefModel = {
        name: 'my-app-1',
        resource_type: 'app_v2',
      };

      function __createBindingTest() {
        // Construct the params object for operation createBinding
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const component = componentRefModel;
        const prefix = 'MY_COS';
        const secretName = 'my-service-access';
        const createBindingParams = {
          projectId,
          component,
          prefix,
          secretName,
        };

        const createBindingResult = codeEngineService.createBinding(createBindingParams);

        // all methods should return a Promise
        expectToBePromise(createBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/bindings', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.component).toEqual(component);
        expect(mockRequestOptions.body.prefix).toEqual(prefix);
        expect(mockRequestOptions.body.secret_name).toEqual(secretName);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createBindingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createBindingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createBindingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const component = componentRefModel;
        const prefix = 'MY_COS';
        const secretName = 'my-service-access';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createBindingParams = {
          projectId,
          component,
          prefix,
          secretName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createBinding(createBindingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createBinding();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getBinding', () => {
    describe('positive tests', () => {
      function __getBindingTest() {
        // Construct the params object for operation getBinding
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const id = 'a172ced-b5f21bc-71ba50c-1638604';
        const getBindingParams = {
          projectId,
          id,
        };

        const getBindingResult = codeEngineService.getBinding(getBindingParams);

        // all methods should return a Promise
        expectToBePromise(getBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/bindings/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBindingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getBindingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getBindingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const id = 'a172ced-b5f21bc-71ba50c-1638604';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBindingParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getBinding(getBindingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getBinding();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteBinding', () => {
    describe('positive tests', () => {
      function __deleteBindingTest() {
        // Construct the params object for operation deleteBinding
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const id = 'a172ced-b5f21bc-71ba50c-1638604';
        const deleteBindingParams = {
          projectId,
          id,
        };

        const deleteBindingResult = codeEngineService.deleteBinding(deleteBindingParams);

        // all methods should return a Promise
        expectToBePromise(deleteBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/bindings/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteBindingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteBindingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteBindingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const id = 'a172ced-b5f21bc-71ba50c-1638604';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteBindingParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteBinding(deleteBindingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteBinding();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listBuilds', () => {
    describe('positive tests', () => {
      function __listBuildsTest() {
        // Construct the params object for operation listBuilds
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const limit = 100;
        const start = 'testString';
        const listBuildsParams = {
          projectId,
          limit,
          start,
        };

        const listBuildsResult = codeEngineService.listBuilds(listBuildsParams);

        // all methods should return a Promise
        expectToBePromise(listBuildsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/builds', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBuildsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listBuildsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listBuildsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBuildsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listBuilds(listBuildsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listBuilds({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listBuilds();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('BuildsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/builds';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"builds":[{"created_at":"2022-09-13T11:41:35+02:00","entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/builds/my-build","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"my-build","output_image":"private.de.icr.io/icr_namespace/image-name","output_secret":"ce-auto-icr-private-eu-de","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"build_v2","source_context_dir":"some/subfolder","source_revision":"main","source_secret":"source_secret","source_type":"git","source_url":"https://github.com/IBM/CodeEngine","status":"ready","status_details":{"reason":"registered"},"strategy_size":"medium","strategy_spec_file":"Dockerfile","strategy_type":"dockerfile","timeout":600}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"builds":[{"created_at":"2022-09-13T11:41:35+02:00","entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/builds/my-build","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"my-build","output_image":"private.de.icr.io/icr_namespace/image-name","output_secret":"ce-auto-icr-private-eu-de","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"build_v2","source_context_dir":"some/subfolder","source_revision":"main","source_secret":"source_secret","source_type":"git","source_url":"https://github.com/IBM/CodeEngine","status":"ready","status_details":{"reason":"registered"},"strategy_size":"medium","strategy_spec_file":"Dockerfile","strategy_type":"dockerfile","timeout":600}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.BuildsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const pager = new CodeEngineV2.BuildsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createBuild', () => {
    describe('positive tests', () => {
      function __createBuildTest() {
        // Construct the params object for operation createBuild
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build';
        const outputImage = 'private.de.icr.io/icr_namespace/image-name';
        const outputSecret = 'ce-auto-icr-private-eu-de';
        const strategyType = 'dockerfile';
        const sourceContextDir = 'some/subfolder';
        const sourceRevision = 'main';
        const sourceSecret = 'testString';
        const sourceType = 'git';
        const sourceUrl = 'https://github.com/IBM/CodeEngine';
        const strategySize = 'medium';
        const strategySpecFile = 'Dockerfile';
        const timeout = 600;
        const createBuildParams = {
          projectId,
          name,
          outputImage,
          outputSecret,
          strategyType,
          sourceContextDir,
          sourceRevision,
          sourceSecret,
          sourceType,
          sourceUrl,
          strategySize,
          strategySpecFile,
          timeout,
        };

        const createBuildResult = codeEngineService.createBuild(createBuildParams);

        // all methods should return a Promise
        expectToBePromise(createBuildResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/builds', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.output_image).toEqual(outputImage);
        expect(mockRequestOptions.body.output_secret).toEqual(outputSecret);
        expect(mockRequestOptions.body.strategy_type).toEqual(strategyType);
        expect(mockRequestOptions.body.source_context_dir).toEqual(sourceContextDir);
        expect(mockRequestOptions.body.source_revision).toEqual(sourceRevision);
        expect(mockRequestOptions.body.source_secret).toEqual(sourceSecret);
        expect(mockRequestOptions.body.source_type).toEqual(sourceType);
        expect(mockRequestOptions.body.source_url).toEqual(sourceUrl);
        expect(mockRequestOptions.body.strategy_size).toEqual(strategySize);
        expect(mockRequestOptions.body.strategy_spec_file).toEqual(strategySpecFile);
        expect(mockRequestOptions.body.timeout).toEqual(timeout);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createBuildTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createBuildTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createBuildTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build';
        const outputImage = 'private.de.icr.io/icr_namespace/image-name';
        const outputSecret = 'ce-auto-icr-private-eu-de';
        const strategyType = 'dockerfile';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createBuildParams = {
          projectId,
          name,
          outputImage,
          outputSecret,
          strategyType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createBuild(createBuildParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createBuild({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createBuild();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getBuild', () => {
    describe('positive tests', () => {
      function __getBuildTest() {
        // Construct the params object for operation getBuild
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build';
        const getBuildParams = {
          projectId,
          name,
        };

        const getBuildResult = codeEngineService.getBuild(getBuildParams);

        // all methods should return a Promise
        expectToBePromise(getBuildResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/builds/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBuildTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getBuildTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getBuildTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBuildParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getBuild(getBuildParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getBuild({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getBuild();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteBuild', () => {
    describe('positive tests', () => {
      function __deleteBuildTest() {
        // Construct the params object for operation deleteBuild
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build';
        const deleteBuildParams = {
          projectId,
          name,
        };

        const deleteBuildResult = codeEngineService.deleteBuild(deleteBuildParams);

        // all methods should return a Promise
        expectToBePromise(deleteBuildResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/builds/{name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteBuildTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteBuildTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteBuildTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteBuildParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteBuild(deleteBuildParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteBuild({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteBuild();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateBuild', () => {
    describe('positive tests', () => {
      function __updateBuildTest() {
        // Construct the params object for operation updateBuild
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build';
        const ifMatch = 'testString';
        const outputImage = 'private.de.icr.io/icr_namespace/image-name';
        const outputSecret = 'ce-auto-icr-private-eu-de';
        const sourceContextDir = 'some/subfolder';
        const sourceRevision = 'main';
        const sourceSecret = 'testString';
        const sourceType = 'git';
        const sourceUrl = 'https://github.com/IBM/CodeEngine';
        const strategySize = 'medium';
        const strategySpecFile = 'Dockerfile';
        const strategyType = 'dockerfile';
        const timeout = 600;
        const updateBuildParams = {
          projectId,
          name,
          ifMatch,
          outputImage,
          outputSecret,
          sourceContextDir,
          sourceRevision,
          sourceSecret,
          sourceType,
          sourceUrl,
          strategySize,
          strategySpecFile,
          strategyType,
          timeout,
        };

        const updateBuildResult = codeEngineService.updateBuild(updateBuildParams);

        // all methods should return a Promise
        expectToBePromise(updateBuildResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/builds/{name}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.output_image).toEqual(outputImage);
        expect(mockRequestOptions.body.output_secret).toEqual(outputSecret);
        expect(mockRequestOptions.body.source_context_dir).toEqual(sourceContextDir);
        expect(mockRequestOptions.body.source_revision).toEqual(sourceRevision);
        expect(mockRequestOptions.body.source_secret).toEqual(sourceSecret);
        expect(mockRequestOptions.body.source_type).toEqual(sourceType);
        expect(mockRequestOptions.body.source_url).toEqual(sourceUrl);
        expect(mockRequestOptions.body.strategy_size).toEqual(strategySize);
        expect(mockRequestOptions.body.strategy_spec_file).toEqual(strategySpecFile);
        expect(mockRequestOptions.body.strategy_type).toEqual(strategyType);
        expect(mockRequestOptions.body.timeout).toEqual(timeout);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateBuildTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __updateBuildTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __updateBuildTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateBuildParams = {
          projectId,
          name,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.updateBuild(updateBuildParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.updateBuild({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.updateBuild();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listBuildRuns', () => {
    describe('positive tests', () => {
      function __listBuildRunsTest() {
        // Construct the params object for operation listBuildRuns
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const buildName = 'my-build';
        const limit = 100;
        const start = 'testString';
        const listBuildRunsParams = {
          projectId,
          buildName,
          limit,
          start,
        };

        const listBuildRunsResult = codeEngineService.listBuildRuns(listBuildRunsParams);

        // all methods should return a Promise
        expectToBePromise(listBuildRunsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/build_runs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.build_name).toEqual(buildName);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBuildRunsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listBuildRunsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listBuildRunsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBuildRunsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listBuildRuns(listBuildRunsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listBuildRuns({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listBuildRuns();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('BuildRunsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/build_runs';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"build_runs":[{"build_name":"build_name","created_at":"2022-09-13T11:41:35+02:00","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/build_runs/my-build-run","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"my-build-run","output_image":"private.de.icr.io/icr_namespace/image-name","output_secret":"ce-auto-icr-private-eu-de","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"build_run_v2","service_account":"default","source_context_dir":"some/subfolder","source_revision":"main","source_secret":"source_secret","source_type":"git","source_url":"https://github.com/IBM/CodeEngine","status":"succeeded","status_details":{"completion_time":"2022-09-22T17:40:00Z","output_digest":"sha256:9a3d845c629d2b4a6b271b1d526dfafc1e7d9511f8863b43b5bb0483ef626384","reason":"succeeded","start_time":"2022-09-22T17:34:00Z"},"strategy_size":"medium","strategy_spec_file":"Dockerfile","strategy_type":"dockerfile","timeout":600}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"build_runs":[{"build_name":"build_name","created_at":"2022-09-13T11:41:35+02:00","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/build_runs/my-build-run","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"my-build-run","output_image":"private.de.icr.io/icr_namespace/image-name","output_secret":"ce-auto-icr-private-eu-de","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"build_run_v2","service_account":"default","source_context_dir":"some/subfolder","source_revision":"main","source_secret":"source_secret","source_type":"git","source_url":"https://github.com/IBM/CodeEngine","status":"succeeded","status_details":{"completion_time":"2022-09-22T17:40:00Z","output_digest":"sha256:9a3d845c629d2b4a6b271b1d526dfafc1e7d9511f8863b43b5bb0483ef626384","reason":"succeeded","start_time":"2022-09-22T17:34:00Z"},"strategy_size":"medium","strategy_spec_file":"Dockerfile","strategy_type":"dockerfile","timeout":600}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          buildName: 'my-build',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.BuildRunsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          buildName: 'my-build',
          limit: 100,
        };
        const pager = new CodeEngineV2.BuildRunsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createBuildRun', () => {
    describe('positive tests', () => {
      function __createBuildRunTest() {
        // Construct the params object for operation createBuildRun
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const buildName = 'testString';
        const name = 'testString';
        const outputImage = 'private.de.icr.io/icr_namespace/image-name';
        const outputSecret = 'ce-auto-icr-private-eu-de';
        const serviceAccount = 'default';
        const sourceContextDir = 'some/subfolder';
        const sourceRevision = 'main';
        const sourceSecret = 'testString';
        const sourceType = 'git';
        const sourceUrl = 'https://github.com/IBM/CodeEngine';
        const strategySize = 'medium';
        const strategySpecFile = 'Dockerfile';
        const strategyType = 'dockerfile';
        const timeout = 600;
        const createBuildRunParams = {
          projectId,
          buildName,
          name,
          outputImage,
          outputSecret,
          serviceAccount,
          sourceContextDir,
          sourceRevision,
          sourceSecret,
          sourceType,
          sourceUrl,
          strategySize,
          strategySpecFile,
          strategyType,
          timeout,
        };

        const createBuildRunResult = codeEngineService.createBuildRun(createBuildRunParams);

        // all methods should return a Promise
        expectToBePromise(createBuildRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/build_runs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.build_name).toEqual(buildName);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.output_image).toEqual(outputImage);
        expect(mockRequestOptions.body.output_secret).toEqual(outputSecret);
        expect(mockRequestOptions.body.service_account).toEqual(serviceAccount);
        expect(mockRequestOptions.body.source_context_dir).toEqual(sourceContextDir);
        expect(mockRequestOptions.body.source_revision).toEqual(sourceRevision);
        expect(mockRequestOptions.body.source_secret).toEqual(sourceSecret);
        expect(mockRequestOptions.body.source_type).toEqual(sourceType);
        expect(mockRequestOptions.body.source_url).toEqual(sourceUrl);
        expect(mockRequestOptions.body.strategy_size).toEqual(strategySize);
        expect(mockRequestOptions.body.strategy_spec_file).toEqual(strategySpecFile);
        expect(mockRequestOptions.body.strategy_type).toEqual(strategyType);
        expect(mockRequestOptions.body.timeout).toEqual(timeout);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createBuildRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createBuildRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createBuildRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createBuildRunParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createBuildRun(createBuildRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createBuildRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createBuildRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getBuildRun', () => {
    describe('positive tests', () => {
      function __getBuildRunTest() {
        // Construct the params object for operation getBuildRun
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build-run';
        const getBuildRunParams = {
          projectId,
          name,
        };

        const getBuildRunResult = codeEngineService.getBuildRun(getBuildRunParams);

        // all methods should return a Promise
        expectToBePromise(getBuildRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/build_runs/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBuildRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getBuildRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getBuildRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build-run';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBuildRunParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getBuildRun(getBuildRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getBuildRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getBuildRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteBuildRun', () => {
    describe('positive tests', () => {
      function __deleteBuildRunTest() {
        // Construct the params object for operation deleteBuildRun
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build-run';
        const deleteBuildRunParams = {
          projectId,
          name,
        };

        const deleteBuildRunResult = codeEngineService.deleteBuildRun(deleteBuildRunParams);

        // all methods should return a Promise
        expectToBePromise(deleteBuildRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/build_runs/{name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteBuildRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteBuildRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteBuildRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-build-run';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteBuildRunParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteBuildRun(deleteBuildRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteBuildRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteBuildRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listConfigMaps', () => {
    describe('positive tests', () => {
      function __listConfigMapsTest() {
        // Construct the params object for operation listConfigMaps
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const limit = 100;
        const start = 'testString';
        const listConfigMapsParams = {
          projectId,
          limit,
          start,
        };

        const listConfigMapsResult = codeEngineService.listConfigMaps(listConfigMapsParams);

        // all methods should return a Promise
        expectToBePromise(listConfigMapsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/config_maps', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listConfigMapsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listConfigMapsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listConfigMapsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listConfigMapsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listConfigMaps(listConfigMapsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listConfigMaps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listConfigMaps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ConfigMapsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/config_maps';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"config_maps":[{"created_at":"2022-09-13T11:41:35+02:00","data":{"mapKey":"inner"},"entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/config_maps/my-config-map","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"my-config-map","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"config_map_v2"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"config_maps":[{"created_at":"2022-09-13T11:41:35+02:00","data":{"mapKey":"inner"},"entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/config_maps/my-config-map","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"my-config-map","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"config_map_v2"}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.ConfigMapsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const pager = new CodeEngineV2.ConfigMapsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createConfigMap', () => {
    describe('positive tests', () => {
      function __createConfigMapTest() {
        // Construct the params object for operation createConfigMap
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-config-map';
        const data = { 'key1': 'testString' };
        const createConfigMapParams = {
          projectId,
          name,
          data,
        };

        const createConfigMapResult = codeEngineService.createConfigMap(createConfigMapParams);

        // all methods should return a Promise
        expectToBePromise(createConfigMapResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/config_maps', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createConfigMapTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createConfigMapTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createConfigMapTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-config-map';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createConfigMapParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createConfigMap(createConfigMapParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createConfigMap({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createConfigMap();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getConfigMap', () => {
    describe('positive tests', () => {
      function __getConfigMapTest() {
        // Construct the params object for operation getConfigMap
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-config-map';
        const getConfigMapParams = {
          projectId,
          name,
        };

        const getConfigMapResult = codeEngineService.getConfigMap(getConfigMapParams);

        // all methods should return a Promise
        expectToBePromise(getConfigMapResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/config_maps/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigMapTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getConfigMapTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getConfigMapTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-config-map';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getConfigMapParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getConfigMap(getConfigMapParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getConfigMap({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getConfigMap();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceConfigMap', () => {
    describe('positive tests', () => {
      function __replaceConfigMapTest() {
        // Construct the params object for operation replaceConfigMap
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-config-map';
        const ifMatch = 'testString';
        const data = { 'key1': 'testString' };
        const replaceConfigMapParams = {
          projectId,
          name,
          ifMatch,
          data,
        };

        const replaceConfigMapResult = codeEngineService.replaceConfigMap(replaceConfigMapParams);

        // all methods should return a Promise
        expectToBePromise(replaceConfigMapResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/config_maps/{name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceConfigMapTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __replaceConfigMapTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __replaceConfigMapTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-config-map';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceConfigMapParams = {
          projectId,
          name,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.replaceConfigMap(replaceConfigMapParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.replaceConfigMap({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.replaceConfigMap();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteConfigMap', () => {
    describe('positive tests', () => {
      function __deleteConfigMapTest() {
        // Construct the params object for operation deleteConfigMap
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-config-map';
        const deleteConfigMapParams = {
          projectId,
          name,
        };

        const deleteConfigMapResult = codeEngineService.deleteConfigMap(deleteConfigMapParams);

        // all methods should return a Promise
        expectToBePromise(deleteConfigMapResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/projects/{project_id}/config_maps/{name}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteConfigMapTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteConfigMapTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteConfigMapTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-config-map';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteConfigMapParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteConfigMap(deleteConfigMapParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteConfigMap({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteConfigMap();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSecrets', () => {
    describe('positive tests', () => {
      function __listSecretsTest() {
        // Construct the params object for operation listSecrets
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const limit = 100;
        const start = 'testString';
        const listSecretsParams = {
          projectId,
          limit,
          start,
        };

        const listSecretsResult = codeEngineService.listSecrets(listSecretsParams);

        // all methods should return a Promise
        expectToBePromise(listSecretsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/secrets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSecretsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listSecretsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listSecretsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSecretsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listSecrets(listSecretsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listSecrets({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listSecrets();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('SecretsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/secrets';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"secrets":[{"created_at":"2022-09-13T11:41:35+02:00","data":{"mapKey":"inner"},"entity_tag":"2385407409","format":"generic","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/secrets/my-secret","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"my-secret","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"resource_type","service_access":{"resource_key":{"id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","name":"name"},"role":{"crn":"crn:v1:bluemix:public:iam::::serviceRole:Writer","name":"Manager"},"service_instance":{"id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","type":"type"},"serviceid":{"crn":"crn","id":"ServiceId-8fa4bc74-6441-4e5b-af3a-2b1af325a637"}},"service_operator":{"apikey_id":"ApiKey-17041d26-55e4-40a8-8ab5-5a69b68e204b","resource_group_ids":["resource_group_ids"],"serviceid":{"crn":"crn","id":"ServiceId-8fa4bc74-6441-4e5b-af3a-2b1af325a637"},"user_managed":true}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"secrets":[{"created_at":"2022-09-13T11:41:35+02:00","data":{"mapKey":"inner"},"entity_tag":"2385407409","format":"generic","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/secrets/my-secret","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"my-secret","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"resource_type","service_access":{"resource_key":{"id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","name":"name"},"role":{"crn":"crn:v1:bluemix:public:iam::::serviceRole:Writer","name":"Manager"},"service_instance":{"id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","type":"type"},"serviceid":{"crn":"crn","id":"ServiceId-8fa4bc74-6441-4e5b-af3a-2b1af325a637"}},"service_operator":{"apikey_id":"ApiKey-17041d26-55e4-40a8-8ab5-5a69b68e204b","resource_group_ids":["resource_group_ids"],"serviceid":{"crn":"crn","id":"ServiceId-8fa4bc74-6441-4e5b-af3a-2b1af325a637"},"user_managed":true}}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.SecretsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const pager = new CodeEngineV2.SecretsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createSecret', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SecretDataSSHSecretData
      const secretDataModel = {
        ssh_key: 'testString',
        known_hosts: 'testString',
        foo: 'testString',
      };

      // ResourceKeyRefPrototype
      const resourceKeyRefPrototypeModel = {
        id: '4e49b3e0-27a8-48d2-a784-c7ee48bb863b',
      };

      // RoleRefPrototype
      const roleRefPrototypeModel = {
        crn: 'crn:v1:bluemix:public:iam::::serviceRole:Writer',
      };

      // ServiceInstanceRefPrototype
      const serviceInstanceRefPrototypeModel = {
        id: '4e49b3e0-27a8-48d2-a784-c7ee48bb863b',
      };

      // ServiceIDRef
      const serviceIdRefModel = {
        crn: 'testString',
        id: 'ServiceId-8fa4bc74-6441-4e5b-af3a-2b1af325a637',
      };

      // ServiceAccessSecretPrototypeProps
      const serviceAccessSecretPrototypePropsModel = {
        resource_key: resourceKeyRefPrototypeModel,
        role: roleRefPrototypeModel,
        service_instance: serviceInstanceRefPrototypeModel,
        serviceid: serviceIdRefModel,
      };

      // ServiceIDRefPrototype
      const serviceIdRefPrototypeModel = {
        id: 'ServiceId-8fa4bc74-6441-4e5b-af3a-2b1af325a637',
      };

      // OperatorSecretPrototypeProps
      const operatorSecretPrototypePropsModel = {
        resource_group_ids: ['testString'],
        serviceid: serviceIdRefPrototypeModel,
      };

      function __createSecretTest() {
        // Construct the params object for operation createSecret
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const format = 'generic';
        const name = 'my-secret';
        const data = secretDataModel;
        const serviceAccess = serviceAccessSecretPrototypePropsModel;
        const serviceOperator = operatorSecretPrototypePropsModel;
        const createSecretParams = {
          projectId,
          format,
          name,
          data,
          serviceAccess,
          serviceOperator,
        };

        const createSecretResult = codeEngineService.createSecret(createSecretParams);

        // all methods should return a Promise
        expectToBePromise(createSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/secrets', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.format).toEqual(format);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.body.service_access).toEqual(serviceAccess);
        expect(mockRequestOptions.body.service_operator).toEqual(serviceOperator);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSecretTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createSecretTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createSecretTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const format = 'generic';
        const name = 'my-secret';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSecretParams = {
          projectId,
          format,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createSecret(createSecretParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createSecret();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSecret', () => {
    describe('positive tests', () => {
      function __getSecretTest() {
        // Construct the params object for operation getSecret
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-secret';
        const getSecretParams = {
          projectId,
          name,
        };

        const getSecretResult = codeEngineService.getSecret(getSecretParams);

        // all methods should return a Promise
        expectToBePromise(getSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/secrets/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSecretTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getSecretTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getSecretTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-secret';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecretParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getSecret(getSecretParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getSecret();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceSecret', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SecretDataSSHSecretData
      const secretDataModel = {
        ssh_key: 'testString',
        known_hosts: 'testString',
        foo: 'testString',
      };

      function __replaceSecretTest() {
        // Construct the params object for operation replaceSecret
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-secret';
        const ifMatch = 'testString';
        const format = 'generic';
        const data = secretDataModel;
        const replaceSecretParams = {
          projectId,
          name,
          ifMatch,
          format,
          data,
        };

        const replaceSecretResult = codeEngineService.replaceSecret(replaceSecretParams);

        // all methods should return a Promise
        expectToBePromise(replaceSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/secrets/{name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.format).toEqual(format);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceSecretTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __replaceSecretTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __replaceSecretTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-secret';
        const ifMatch = 'testString';
        const format = 'generic';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceSecretParams = {
          projectId,
          name,
          ifMatch,
          format,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.replaceSecret(replaceSecretParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.replaceSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.replaceSecret();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSecret', () => {
    describe('positive tests', () => {
      function __deleteSecretTest() {
        // Construct the params object for operation deleteSecret
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-secret';
        const deleteSecretParams = {
          projectId,
          name,
        };

        const deleteSecretResult = codeEngineService.deleteSecret(deleteSecretParams);

        // all methods should return a Promise
        expectToBePromise(deleteSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/secrets/{name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSecretTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteSecretTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteSecretTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'my-secret';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSecretParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteSecret(deleteSecretParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteSecret();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDomainMappings', () => {
    describe('positive tests', () => {
      function __listDomainMappingsTest() {
        // Construct the params object for operation listDomainMappings
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const limit = 100;
        const start = 'testString';
        const listDomainMappingsParams = {
          projectId,
          limit,
          start,
        };

        const listDomainMappingsResult =
          codeEngineService.listDomainMappings(listDomainMappingsParams);

        // all methods should return a Promise
        expectToBePromise(listDomainMappingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/domain_mappings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDomainMappingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listDomainMappingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listDomainMappingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDomainMappingsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listDomainMappings(listDomainMappingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listDomainMappings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listDomainMappings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('DomainMappingsPager tests', () => {
      const serviceUrl = codeEngineServiceOptions.url;
      const path = '/projects/15314cc3-85b4-4338-903f-c28cdee6d005/domain_mappings';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"domain_mappings":[{"cname_target":"custom.abcdabcdabc.us-east.codeengine.appdomain.cloud","component":{"name":"my-app-1","resource_type":"app_v2"},"created_at":"2022-09-13T11:41:35+02:00","entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/domain_mappings/www.example.com","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"www.example.com","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"domain_mapping_v2","status":"ready","status_details":{"reason":"ready"},"tls_secret":"my-tls-secret","user_managed":true,"visibility":"public"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"domain_mappings":[{"cname_target":"custom.abcdabcdabc.us-east.codeengine.appdomain.cloud","component":{"name":"my-app-1","resource_type":"app_v2"},"created_at":"2022-09-13T11:41:35+02:00","entity_tag":"2385407409","href":"https://api.eu-de.codeengine.cloud.ibm.com/v2/projects/4e49b3e0-27a8-48d2-a784-c7ee48bb863b/domain_mappings/www.example.com","id":"e33b1cv7-7390-4437-a5c2-130d5ccdddc3","name":"www.example.com","project_id":"4e49b3e0-27a8-48d2-a784-c7ee48bb863b","region":"us-east","resource_type":"domain_mapping_v2","status":"ready","status_details":{"reason":"ready"},"tls_secret":"my-tls-secret","user_managed":true,"visibility":"public"}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const allResults = [];
        const pager = new CodeEngineV2.DomainMappingsPager(codeEngineService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          projectId: '15314cc3-85b4-4338-903f-c28cdee6d005',
          limit: 100,
        };
        const pager = new CodeEngineV2.DomainMappingsPager(codeEngineService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createDomainMapping', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ComponentRef
      const componentRefModel = {
        name: 'my-app-1',
        resource_type: 'app_v2',
      };

      function __createDomainMappingTest() {
        // Construct the params object for operation createDomainMapping
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const component = componentRefModel;
        const name = 'www.example.com';
        const tlsSecret = 'my-tls-secret';
        const createDomainMappingParams = {
          projectId,
          component,
          name,
          tlsSecret,
        };

        const createDomainMappingResult =
          codeEngineService.createDomainMapping(createDomainMappingParams);

        // all methods should return a Promise
        expectToBePromise(createDomainMappingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_id}/domain_mappings', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.component).toEqual(component);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.tls_secret).toEqual(tlsSecret);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDomainMappingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createDomainMappingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createDomainMappingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const component = componentRefModel;
        const name = 'www.example.com';
        const tlsSecret = 'my-tls-secret';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDomainMappingParams = {
          projectId,
          component,
          name,
          tlsSecret,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createDomainMapping(createDomainMappingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createDomainMapping({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createDomainMapping();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDomainMapping', () => {
    describe('positive tests', () => {
      function __getDomainMappingTest() {
        // Construct the params object for operation getDomainMapping
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'www.example.com';
        const getDomainMappingParams = {
          projectId,
          name,
        };

        const getDomainMappingResult = codeEngineService.getDomainMapping(getDomainMappingParams);

        // all methods should return a Promise
        expectToBePromise(getDomainMappingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/projects/{project_id}/domain_mappings/{name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDomainMappingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getDomainMappingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getDomainMappingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'www.example.com';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDomainMappingParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getDomainMapping(getDomainMappingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getDomainMapping({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getDomainMapping();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDomainMapping', () => {
    describe('positive tests', () => {
      function __deleteDomainMappingTest() {
        // Construct the params object for operation deleteDomainMapping
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'www.example.com';
        const deleteDomainMappingParams = {
          projectId,
          name,
        };

        const deleteDomainMappingResult =
          codeEngineService.deleteDomainMapping(deleteDomainMappingParams);

        // all methods should return a Promise
        expectToBePromise(deleteDomainMappingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/projects/{project_id}/domain_mappings/{name}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDomainMappingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteDomainMappingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteDomainMappingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'www.example.com';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDomainMappingParams = {
          projectId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteDomainMapping(deleteDomainMappingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteDomainMapping({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteDomainMapping();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDomainMapping', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ComponentRef
      const componentRefModel = {
        name: 'my-app-1',
        resource_type: 'app_v2',
      };

      function __updateDomainMappingTest() {
        // Construct the params object for operation updateDomainMapping
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'www.example.com';
        const ifMatch = 'testString';
        const component = componentRefModel;
        const tlsSecret = 'my-tls-secret';
        const updateDomainMappingParams = {
          projectId,
          name,
          ifMatch,
          component,
          tlsSecret,
        };

        const updateDomainMappingResult =
          codeEngineService.updateDomainMapping(updateDomainMappingParams);

        // all methods should return a Promise
        expectToBePromise(updateDomainMappingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/projects/{project_id}/domain_mappings/{name}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.component).toEqual(component);
        expect(mockRequestOptions.body.tls_secret).toEqual(tlsSecret);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDomainMappingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __updateDomainMappingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __updateDomainMappingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = '15314cc3-85b4-4338-903f-c28cdee6d005';
        const name = 'www.example.com';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDomainMappingParams = {
          projectId,
          name,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.updateDomainMapping(updateDomainMappingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.updateDomainMapping({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.updateDomainMapping();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
