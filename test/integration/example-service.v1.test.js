'use strict';

const ExampleServiceV1 = require('../../example-service/v1');
const { IamAuthenticator } = require('../../auth');
const authHelper = require('../resources/auth-helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

describe('example service v1 integration', () => {
  const options = authHelper.auth.exampleService;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });

  const exampleServiceClient = new ExampleServiceV1(options);

  // nested describe statements are helpful when organizing multiple categories of an api
  describe('resources', () => {
    let resourceId;

    it('listResources', async done => {
      let response;
      try {
        response = await exampleServiceClient.listResources();
      } catch (err) {
        done(err);
      }

      expect(response).toBeDefined();
      const { result } = response || {};
      expect(result).toBeDefined();
      done();
    });

    it('createResource', async done => {
      const params = {
        name: 'node-sdk-test-resource',
      };

      let response;
      try {
        response = await exampleServiceClient.createResource(params);
      } catch (err) {
        done(err);
      }

      expect(response).toBeDefined();
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.resource_id).toBeDefined();

      // extract the id for the created resource to be used in later tests
      resourceId = result.resource_id;
      done();
    });

    it('getResource', async done => {
      // if the resource creation failed, skip this test
      if (!resourceId) {
        return done();
      }

      const params = {
        resourceId,
      };

      let response;
      try {
        response = await exampleServiceClient.getResource(params);
      } catch (err) {
        done(err);
      }

      expect(response).toBeDefined();
      const { result } = response || {};
      expect(result).toBeDefined();
      done();
    });
  });
});
