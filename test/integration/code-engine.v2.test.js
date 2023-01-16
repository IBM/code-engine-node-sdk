/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2023.
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

const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const CodeEngineV2 = require('../../dist/code-engine/v2');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../resources/auth-helper.js');

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('CodeEngineV2', () => {
  // Service instance
  let codeEngineService;

  test('Initialize service', async () => {
    // Determine the target IAM endpoint
    let iamEndpoint = 'https://iam.cloud.ibm.com';
    if (process.env.IAM_ENDPOINT) {
      iamEndpoint = process.env.IAM_ENDPOINT;
    }

    // Create an IAM authenticator.
    const authenticator = new IamAuthenticator({
      apikey: process.env.CE_API_KEY,
      clientId: 'bx',
      clientSecret: 'bx',
      url: iamEndpoint,
    });

    const codeEngineApiEndpoint = `https://${process.env.CE_API_HOST}/v2`;
    console.info(`Using Code Engine API endpoint: '${codeEngineApiEndpoint}'`);

    // Construct the Code Engine client using the IAM authenticator.
    const options = {
      authenticator,
      serviceUrl: codeEngineApiEndpoint,
    };

    // Init the service
    codeEngineService = CodeEngineV2.newInstance(options);
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
});
