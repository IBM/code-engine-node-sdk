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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const CodeEngineV1 = require('../../dist/ibm-cloud-code-engine/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'code_engine_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('CodeEngineV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let codeEngineService;

  test('Initialize service', async () => {
    codeEngineService = CodeEngineV1.newInstance();

    expect(codeEngineService).not.toBeNull();

    const config = readExternalSources(CodeEngineV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    codeEngineService.enableRetries();
  });

  test('projectConfigGet()', async () => {
    const params = {
      xDelegatedRefreshToken: 'testString',
      projectGuid: 'testString',
      endpoint: 'testString',
    };

    const res = await codeEngineService.projectConfigGet(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
