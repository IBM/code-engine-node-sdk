/**
 * (C) Copyright IBM Corp. 2022.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

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

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
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

  describe('listConfigmapsV2', () => {
    describe('positive tests', () => {
      function __listConfigmapsV2Test() {
        // Construct the params object for operation listConfigmapsV2
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const listConfigmapsV2Params = {
          refreshToken,
          projectGuid,
        };

        const listConfigmapsV2Result = codeEngineService.listConfigmapsV2(listConfigmapsV2Params);

        // all methods should return a Promise
        expectToBePromise(listConfigmapsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_guid}/configmaps', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Refresh-Token', refreshToken);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listConfigmapsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listConfigmapsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listConfigmapsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listConfigmapsV2Params = {
          refreshToken,
          projectGuid,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listConfigmapsV2(listConfigmapsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.listConfigmapsV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.listConfigmapsV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createConfigmapV2', () => {
    describe('positive tests', () => {
      function __createConfigmapV2Test() {
        // Construct the params object for operation createConfigmapV2
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const created = 'testString';
        const data = { 'key1': 'testString' };
        const id = 'testString';
        const immutable = true;
        const name = 'testString';
        const createConfigmapV2Params = {
          refreshToken,
          projectGuid,
          created,
          data,
          id,
          immutable,
          name,
        };

        const createConfigmapV2Result = codeEngineService.createConfigmapV2(createConfigmapV2Params);

        // all methods should return a Promise
        expectToBePromise(createConfigmapV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_guid}/configmaps', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Refresh-Token', refreshToken);
        expect(mockRequestOptions.body.created).toEqual(created);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.immutable).toEqual(immutable);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createConfigmapV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createConfigmapV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createConfigmapV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createConfigmapV2Params = {
          refreshToken,
          projectGuid,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createConfigmapV2(createConfigmapV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.createConfigmapV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.createConfigmapV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getConfigmapV2', () => {
    describe('positive tests', () => {
      function __getConfigmapV2Test() {
        // Construct the params object for operation getConfigmapV2
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const configmapName = 'testString';
        const getConfigmapV2Params = {
          refreshToken,
          projectGuid,
          configmapName,
        };

        const getConfigmapV2Result = codeEngineService.getConfigmapV2(getConfigmapV2Params);

        // all methods should return a Promise
        expectToBePromise(getConfigmapV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_guid}/configmaps/{configmap_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Refresh-Token', refreshToken);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
        expect(mockRequestOptions.path.configmap_name).toEqual(configmapName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigmapV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getConfigmapV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getConfigmapV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const configmapName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getConfigmapV2Params = {
          refreshToken,
          projectGuid,
          configmapName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getConfigmapV2(getConfigmapV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getConfigmapV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getConfigmapV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteConfigmapV2', () => {
    describe('positive tests', () => {
      function __deleteConfigmapV2Test() {
        // Construct the params object for operation deleteConfigmapV2
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const configmapName = 'testString';
        const deleteConfigmapV2Params = {
          refreshToken,
          projectGuid,
          configmapName,
        };

        const deleteConfigmapV2Result = codeEngineService.deleteConfigmapV2(deleteConfigmapV2Params);

        // all methods should return a Promise
        expectToBePromise(deleteConfigmapV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_guid}/configmaps/{configmap_name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Refresh-Token', refreshToken);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
        expect(mockRequestOptions.path.configmap_name).toEqual(configmapName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteConfigmapV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteConfigmapV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteConfigmapV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const configmapName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteConfigmapV2Params = {
          refreshToken,
          projectGuid,
          configmapName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteConfigmapV2(deleteConfigmapV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteConfigmapV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteConfigmapV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateConfigmapV2', () => {
    describe('positive tests', () => {
      function __updateConfigmapV2Test() {
        // Construct the params object for operation updateConfigmapV2
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const configmapName = 'testString';
        const created = 'testString';
        const data = { 'key1': 'testString' };
        const id = 'testString';
        const immutable = true;
        const name = 'testString';
        const updateConfigmapV2Params = {
          refreshToken,
          projectGuid,
          configmapName,
          created,
          data,
          id,
          immutable,
          name,
        };

        const updateConfigmapV2Result = codeEngineService.updateConfigmapV2(updateConfigmapV2Params);

        // all methods should return a Promise
        expectToBePromise(updateConfigmapV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_guid}/configmaps/{configmap_name}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Refresh-Token', refreshToken);
        expect(mockRequestOptions.body.created).toEqual(created);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.immutable).toEqual(immutable);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
        expect(mockRequestOptions.path.configmap_name).toEqual(configmapName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateConfigmapV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __updateConfigmapV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __updateConfigmapV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const refreshToken = 'testString';
        const projectGuid = 'testString';
        const configmapName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateConfigmapV2Params = {
          refreshToken,
          projectGuid,
          configmapName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.updateConfigmapV2(updateConfigmapV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.updateConfigmapV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.updateConfigmapV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listProjectsV2', () => {
    describe('positive tests', () => {
      function __listProjectsV2Test() {
        // Construct the params object for operation listProjectsV2
        const listProjectsV2Params = {};

        const listProjectsV2Result = codeEngineService.listProjectsV2(listProjectsV2Params);

        // all methods should return a Promise
        expectToBePromise(listProjectsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProjectsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listProjectsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listProjectsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProjectsV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listProjectsV2(listProjectsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        codeEngineService.listProjectsV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createProjectV2', () => {
    describe('positive tests', () => {
      function __createProjectV2Test() {
        // Construct the params object for operation createProjectV2
        const name = 'testString';
        const region = 'testString';
        const resourceGroupId = 'testString';
        const tags = ['testString'];
        const createProjectV2Params = {
          name,
          region,
          resourceGroupId,
          tags,
        };

        const createProjectV2Result = codeEngineService.createProjectV2(createProjectV2Params);

        // all methods should return a Promise
        expectToBePromise(createProjectV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProjectV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __createProjectV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __createProjectV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProjectV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.createProjectV2(createProjectV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        codeEngineService.createProjectV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getProjectV2', () => {
    describe('positive tests', () => {
      function __getProjectV2Test() {
        // Construct the params object for operation getProjectV2
        const projectGuid = 'testString';
        const getProjectV2Params = {
          projectGuid,
        };

        const getProjectV2Result = codeEngineService.getProjectV2(getProjectV2Params);

        // all methods should return a Promise
        expectToBePromise(getProjectV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_guid}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProjectV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getProjectV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getProjectV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectGuid = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProjectV2Params = {
          projectGuid,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getProjectV2(getProjectV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getProjectV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getProjectV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProjectV2', () => {
    describe('positive tests', () => {
      function __deleteProjectV2Test() {
        // Construct the params object for operation deleteProjectV2
        const projectGuid = 'testString';
        const deleteProjectV2Params = {
          projectGuid,
        };

        const deleteProjectV2Result = codeEngineService.deleteProjectV2(deleteProjectV2Params);

        // all methods should return a Promise
        expectToBePromise(deleteProjectV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/projects/{project_guid}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProjectV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __deleteProjectV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __deleteProjectV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectGuid = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProjectV2Params = {
          projectGuid,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.deleteProjectV2(deleteProjectV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.deleteProjectV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.deleteProjectV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listReclamationsV2', () => {
    describe('positive tests', () => {
      function __listReclamationsV2Test() {
        // Construct the params object for operation listReclamationsV2
        const listReclamationsV2Params = {};

        const listReclamationsV2Result = codeEngineService.listReclamationsV2(listReclamationsV2Params);

        // all methods should return a Promise
        expectToBePromise(listReclamationsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reclamations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listReclamationsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __listReclamationsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __listReclamationsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listReclamationsV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.listReclamationsV2(listReclamationsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        codeEngineService.listReclamationsV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getReclamationV2', () => {
    describe('positive tests', () => {
      function __getReclamationV2Test() {
        // Construct the params object for operation getReclamationV2
        const projectGuid = 'testString';
        const getReclamationV2Params = {
          projectGuid,
        };

        const getReclamationV2Result = codeEngineService.getReclamationV2(getReclamationV2Params);

        // all methods should return a Promise
        expectToBePromise(getReclamationV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reclamations/{project_guid}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReclamationV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __getReclamationV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __getReclamationV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectGuid = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReclamationV2Params = {
          projectGuid,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.getReclamationV2(getReclamationV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.getReclamationV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.getReclamationV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('reclaimReclamationV2', () => {
    describe('positive tests', () => {
      function __reclaimReclamationV2Test() {
        // Construct the params object for operation reclaimReclamationV2
        const projectGuid = 'testString';
        const reclaimReclamationV2Params = {
          projectGuid,
        };

        const reclaimReclamationV2Result = codeEngineService.reclaimReclamationV2(reclaimReclamationV2Params);

        // all methods should return a Promise
        expectToBePromise(reclaimReclamationV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reclamations/{project_guid}/reclaim', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __reclaimReclamationV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __reclaimReclamationV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __reclaimReclamationV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectGuid = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const reclaimReclamationV2Params = {
          projectGuid,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.reclaimReclamationV2(reclaimReclamationV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.reclaimReclamationV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.reclaimReclamationV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('restoreReclamationV2', () => {
    describe('positive tests', () => {
      function __restoreReclamationV2Test() {
        // Construct the params object for operation restoreReclamationV2
        const projectGuid = 'testString';
        const restoreReclamationV2Params = {
          projectGuid,
        };

        const restoreReclamationV2Result = codeEngineService.restoreReclamationV2(restoreReclamationV2Params);

        // all methods should return a Promise
        expectToBePromise(restoreReclamationV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reclamations/{project_guid}/restore', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_guid).toEqual(projectGuid);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __restoreReclamationV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        codeEngineService.enableRetries();
        __restoreReclamationV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        codeEngineService.disableRetries();
        __restoreReclamationV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectGuid = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const restoreReclamationV2Params = {
          projectGuid,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        codeEngineService.restoreReclamationV2(restoreReclamationV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await codeEngineService.restoreReclamationV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await codeEngineService.restoreReclamationV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
