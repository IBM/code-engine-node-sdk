/**
 * (C) Copyright IBM Corp. 2020.
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

const IbmCloudCodeEngineV1 = require('../../dist/ibm-cloud-code-engine/v1');

const { getOptions, checkUrlAndMethod, checkMediaHeaders, expectToBePromise, checkUserHeader } =
  unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://ibm-cloud-code-engine.cloud.ibm.com/api/v1',
};

const ibmCloudCodeEngineService = new IbmCloudCodeEngineV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(ibmCloudCodeEngineService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('IbmCloudCodeEngineV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = IbmCloudCodeEngineV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(IbmCloudCodeEngineV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(IbmCloudCodeEngineV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(IbmCloudCodeEngineV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = IbmCloudCodeEngineV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(IbmCloudCodeEngineV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new IbmCloudCodeEngineV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new IbmCloudCodeEngineV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(IbmCloudCodeEngineV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('listKubeconfig', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listKubeconfig
        const refreshToken = 'testString';
        const id = 'testString';
        const accept = 'application/json';
        const params = {
          refreshToken,
          id,
          accept,
        };

        const listKubeconfigResult = ibmCloudCodeEngineService.listKubeconfig(params);

        // all methods should return a Promise
        expectToBePromise(listKubeconfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/namespaces/{id}/config', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Refresh-Token', refreshToken);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(options.path.id).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const refreshToken = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          refreshToken,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        ibmCloudCodeEngineService.listKubeconfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await ibmCloudCodeEngineService.listKubeconfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', (done) => {
        const listKubeconfigPromise = ibmCloudCodeEngineService.listKubeconfig();
        expectToBePromise(listKubeconfigPromise);

        listKubeconfigPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
