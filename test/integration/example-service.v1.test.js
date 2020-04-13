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

'use strict';

const ExampleServiceV1 = require('../../dist/example-service/v1');
const authHelper = require('../resources/auth-helper.js');

// Use this to retrieve test-specific config properties from your credentials file.
const { readExternalSources } = require('ibm-cloud-sdk-core');

// testcase timeout value (10s).
const timeout = 10000;

// Location of our config file.
// This file contains config properties like these:
//   EXAMPLE_SERVICE_AUTHTYPE
//   EXAMPLE_SERVICE_URL
//   EXAMPLE_SERVICE_TEST_RESOURCE_ID   <== test-specific property
const configFile = 'example-service.env';
// Use authHelper to skip tests if our configFile is not available
// This step also sets env var IBM_CREDENTIALS_FILE=<configFile>
const describe = authHelper.prepareTests(configFile);

describe('ExampleServiceV1_integration', () => {
  jest.setTimeout(timeout);

  // Service client used throughout the tests.
  let service;

  // Object containing our config properties.
  let config;

  // Test-specific config property values.
  let testResourceId;
  let testTitle;
  let testTag;

  it('should successfully complete initialization', done => {
    // Initialize the service client.
    service = ExampleServiceV1.newInstance({});
    expect(service).not.toBeNull();

    // Grab our test-specific config properies:
    // Example: EXAMPLE_SERVICE_TEST_RESOURCE_ID=my-resource-id
    // Property names have the service name stripped off and then
    // folded to camel case:
    // EXAMPLE_SERVICE_TEST_RESOURCE_ID ==> testResourceId
    config = readExternalSources(ExampleServiceV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
    expect(config).toHaveProperty('testResourceId');

    // Retrieve the test-specific properties we'll use later.
    testResourceId = config.testResourceId;
    expect(testResourceId).toBeTruthy();

    testTitle = config.testTitle;
    expect(testTitle).toBeTruthy();

    testTag = config.testTag;
    expect(testTag).toBeTruthy();

    done();
  });

  // nested describe statements are helpful when organizing multiple categories of an api
  describe('resources', () => {
    // variable shared among the test blocks that follow.
    let resourceId;

    it('listResources', async done => {
      let response;
      try {
        response = await service.listResources();
      } catch (err) {
        done(err);
      }

      expect(response).toBeDefined();
      const { result } = response || {};
      expect(result).toBeDefined();
      done();
    });

    it('createResource', async done => {
      // Create a new resource using our test properties.
      const params = {
        name: testTitle,
        resourceId: testResourceId,
        tag: testTag,
      };

      let response;
      try {
        response = await service.createResource(params);
      } catch (err) {
        done(err);
      }

      expect(response).toBeDefined();
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.resource_id).toBe(testResourceId);
      expect(result.name).toBe(testTitle);
      expect(result.tag).toBe(testTag);

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
        response = await service.getResource(params);
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
