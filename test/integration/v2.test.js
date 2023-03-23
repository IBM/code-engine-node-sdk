/* eslint-disable no-plusplus */
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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const CodeEngineV2 = require('../../dist/code-engine/v2');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'code_engine_v2.env';

const describe = authHelper.prepareTests(configFile);

// the e2e default project
let e2eTestProjectId;

// helper function to allow the code to wait for a while
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

describe('CodeEngineV2_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let codeEngineService;

  test('Initialize service', async () => {
    codeEngineService = CodeEngineV2.newInstance();

    expect(codeEngineService).not.toBeNull();

    const config = readExternalSources(CodeEngineV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    codeEngineService.enableRetries();
  });

  test('listProjects()', async () => {
    const params = {
      limit: 100,
      start: 'testString',
    };

    const res = await codeEngineService.listProjects(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProjects() via ProjectsPager', async () => {
    const params = {
      limit: 100,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CodeEngineV2.ProjectsPager(codeEngineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CodeEngineV2.ProjectsPager(codeEngineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createProject()', async () => {
    const params = {
      name: `sdk-e2e-node-${Date.now()}`,
      tags: ['testString'],
    };

    const res = await codeEngineService.createProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
    e2eTestProjectId = res.result.id;
    console.log(`Created project ${e2eTestProjectId}`);
  });

  test('getProject()', async () => {
    const params = {
      id: e2eTestProjectId,
    };

    const res = await codeEngineService.getProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // Assume that the project creation takes some time
    const times = 20;
    let obtainedProject;
    for (let i = 0; i < times; i++) {
      await sleep(10000);
      try {
        const projRes = await codeEngineService.getProject({
          id: e2eTestProjectId,
        });
        obtainedProject = projRes.result;
        console.info(
          `Obtained status of project '${obtainedProject.name}' (guid: '${obtainedProject.id}'): ${obtainedProject.status}.`
        );
        if (obtainedProject.status === 'active') {
          break;
        }
      } catch (err) {
        console.warn(`Failed to obtain project`, err);
        throw err;
      }
    }
    expect(obtainedProject.status).toBe('active');
  });

  test('listApps()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const res = await codeEngineService.listApps(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listApps() via AppsPager', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CodeEngineV2.AppsPager(codeEngineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CodeEngineV2.AppsPager(codeEngineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createApp()', async () => {
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

    const params = {
      projectId: e2eTestProjectId,
      imageReference: 'icr.io/codeengine/helloworld',
      name: 'my-app',
      imagePort: 8080,
      imageSecret: 'my-secret',
      managedDomainMappings: 'local_public',
      runArguments: ['testString'],
      runAsUser: 1001,
      runCommands: ['testString'],
      runEnvVariables: [envVarPrototypeModel],
      runServiceAccount: 'default',
      runVolumeMounts: [volumeMountPrototypeModel],
      scaleConcurrency: 100,
      scaleConcurrencyTarget: 80,
      scaleCpuLimit: '1',
      scaleEphemeralStorageLimit: '4G',
      scaleInitialInstances: 1,
      scaleMaxInstances: 10,
      scaleMemoryLimit: '4G',
      scaleMinInstances: 0,
      scaleRequestTimeout: 300,
    };

    const res = await codeEngineService.createApp(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getApp()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-app',
    };

    const res = await codeEngineService.getApp(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateApp()', async () => {
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

    const params = {
      projectId: e2eTestProjectId,
      name: 'my-app',
      ifMatch: '*',
      imagePort: 8080,
      imageReference: 'icr.io/codeengine/helloworld',
      imageSecret: 'my-secret',
      managedDomainMappings: 'local_public',
      runArguments: ['testString'],
      runAsUser: 1001,
      runCommands: ['testString'],
      runEnvVariables: [envVarPrototypeModel],
      runServiceAccount: 'default',
      runVolumeMounts: [volumeMountPrototypeModel],
      scaleConcurrency: 100,
      scaleConcurrencyTarget: 80,
      scaleCpuLimit: '1',
      scaleEphemeralStorageLimit: '4G',
      scaleInitialInstances: 1,
      scaleMaxInstances: 10,
      scaleMemoryLimit: '4G',
      scaleMinInstances: 0,
      scaleRequestTimeout: 300,
    };

    const res = await codeEngineService.updateApp(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listAppRevisions()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      appName: 'my-app',
      limit: 100,
    };

    const res = await codeEngineService.listAppRevisions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listAppRevisions() via AppRevisionsPager', async () => {
    const params = {
      projectId: e2eTestProjectId,
      appName: 'my-app',
      limit: 100,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CodeEngineV2.AppRevisionsPager(codeEngineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CodeEngineV2.AppRevisionsPager(codeEngineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getAppRevision()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      appName: 'my-app',
      name: 'my-app-00001',
    };

    const res = await codeEngineService.getAppRevision(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listJobs()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const res = await codeEngineService.listJobs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listJobs() via JobsPager', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CodeEngineV2.JobsPager(codeEngineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CodeEngineV2.JobsPager(codeEngineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createJob()', async () => {
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

    const params = {
      projectId: e2eTestProjectId,
      imageReference: 'icr.io/codeengine/helloworld',
      name: 'my-job',
      imageSecret: 'my-secret',
      runArguments: ['testString'],
      runAsUser: 1001,
      runCommands: ['testString'],
      runEnvVariables: [envVarPrototypeModel],
      runMode: 'task',
      runServiceAccount: 'default',
      runVolumeMounts: [volumeMountPrototypeModel],
      scaleArraySpec: '1-5,7-8,10',
      scaleCpuLimit: '1',
      scaleEphemeralStorageLimit: '4G',
      scaleMaxExecutionTime: 7200,
      scaleMemoryLimit: '4G',
      scaleRetryLimit: 3,
    };

    const res = await codeEngineService.createJob(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getJob()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-job',
    };

    const res = await codeEngineService.getJob(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateJob()', async () => {
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

    const params = {
      projectId: e2eTestProjectId,
      name: 'my-job',
      ifMatch: '*',
      imageReference: 'icr.io/codeengine/helloworld',
      imageSecret: 'my-secret',
      runArguments: ['testString'],
      runAsUser: 1001,
      runCommands: ['testString'],
      runEnvVariables: [envVarPrototypeModel],
      runMode: 'task',
      runServiceAccount: 'default',
      runVolumeMounts: [volumeMountPrototypeModel],
      scaleArraySpec: '1-5,7-8,10',
      scaleCpuLimit: '1',
      scaleEphemeralStorageLimit: '4G',
      scaleMaxExecutionTime: 7200,
      scaleMemoryLimit: '4G',
      scaleRetryLimit: 3,
    };

    const res = await codeEngineService.updateJob(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listJobRuns()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      jobName: 'my-job',
      limit: 100,
    };

    const res = await codeEngineService.listJobRuns(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listJobRuns() via JobRunsPager', async () => {
    const params = {
      projectId: e2eTestProjectId,
      jobName: 'my-job',
      limit: 100,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CodeEngineV2.JobRunsPager(codeEngineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CodeEngineV2.JobRunsPager(codeEngineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createJobRun()', async () => {
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

    const params = {
      projectId: e2eTestProjectId,
      imageReference: 'icr.io/codeengine/helloworld',
      imageSecret: 'my-secret',
      name: 'my-job-run',
      runArguments: ['testString'],
      runAsUser: 1001,
      runCommands: ['testString'],
      runEnvVariables: [envVarPrototypeModel],
      runMode: 'task',
      runServiceAccount: 'default',
      runVolumeMounts: [volumeMountPrototypeModel],
      scaleArraySpec: '1-5,7-8,10',
      scaleCpuLimit: '1',
      scaleEphemeralStorageLimit: '4G',
      scaleMaxExecutionTime: 7200,
      scaleMemoryLimit: '4G',
      scaleRetryLimit: 3,
    };

    const res = await codeEngineService.createJobRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getJobRun()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-job-run',
    };

    const res = await codeEngineService.getJobRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listBuilds()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const res = await codeEngineService.listBuilds(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listBuilds() via BuildsPager', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CodeEngineV2.BuildsPager(codeEngineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CodeEngineV2.BuildsPager(codeEngineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createBuild()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-build',
      outputImage: 'private.de.icr.io/icr_namespace/image-name',
      outputSecret: 'ce-auto-icr-private-eu-de',
      sourceUrl: 'https://github.com/IBM/CodeEngine',
      strategyType: 'dockerfile',
      sourceContextDir: 'some/subfolder',
      sourceRevision: 'main',
      sourceSecret: 'my-secret',
      sourceType: 'git',
      strategySize: 'medium',
      strategySpecFile: 'Dockerfile',
      timeout: 600,
    };

    const res = await codeEngineService.createBuild(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getBuild()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-build',
    };

    const res = await codeEngineService.getBuild(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateBuild()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-build',
      ifMatch: '*',
      outputImage: 'private.de.icr.io/icr_namespace/image-name',
      outputSecret: 'ce-auto-icr-private-eu-de',
      sourceContextDir: 'some/subfolder',
      sourceRevision: 'main',
      sourceSecret: 'my-secret',
      sourceType: 'git',
      sourceUrl: 'https://github.com/IBM/CodeEngine',
      strategySize: 'medium',
      strategySpecFile: 'Dockerfile',
      strategyType: 'dockerfile',
      timeout: 600,
    };

    const res = await codeEngineService.updateBuild(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listBuildRuns()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      buildName: 'my-build',
      limit: 100,
    };

    const res = await codeEngineService.listBuildRuns(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listBuildRuns() via BuildRunsPager', async () => {
    const params = {
      projectId: e2eTestProjectId,
      buildName: 'my-build',
      limit: 100,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CodeEngineV2.BuildRunsPager(codeEngineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CodeEngineV2.BuildRunsPager(codeEngineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createBuildRun()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      buildName: 'my-build',
      name: 'my-build-run',
      outputImage: 'private.de.icr.io/icr_namespace/image-name',
      outputSecret: 'ce-auto-icr-private-eu-de',
      serviceAccount: 'default',
      sourceContextDir: 'some/subfolder',
      sourceRevision: 'main',
      sourceSecret: 'my-secret',
      sourceType: 'git',
      sourceUrl: 'https://github.com/IBM/CodeEngine',
      strategySize: 'medium',
      strategySpecFile: 'Dockerfile',
      strategyType: 'dockerfile',
      timeout: 600,
    };

    const res = await codeEngineService.createBuildRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getBuildRun()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-build-run',
    };

    const res = await codeEngineService.getBuildRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listConfigMaps()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const res = await codeEngineService.listConfigMaps(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listConfigMaps() via ConfigMapsPager', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CodeEngineV2.ConfigMapsPager(codeEngineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CodeEngineV2.ConfigMapsPager(codeEngineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createConfigMap()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-config-map',
      data: { 'key1': 'testString' },
    };

    const res = await codeEngineService.createConfigMap(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getConfigMap()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-config-map',
    };

    const res = await codeEngineService.getConfigMap(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceConfigMap()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-config-map',
      ifMatch: '*',
      data: { 'key1': 'testString' },
    };

    const res = await codeEngineService.replaceConfigMap(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSecrets()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const res = await codeEngineService.listSecrets(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSecrets() via SecretsPager', async () => {
    const params = {
      projectId: e2eTestProjectId,
      limit: 100,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CodeEngineV2.SecretsPager(codeEngineService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CodeEngineV2.SecretsPager(codeEngineService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      format: 'generic',
      name: 'my-secret',
      data: { 'key1': 'testString' },
    };

    const res = await codeEngineService.createSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-secret',
    };

    const res = await codeEngineService.getSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-secret',
      ifMatch: '*',
      data: { 'key1': 'testString' },
      format: 'generic',
    };

    const res = await codeEngineService.replaceSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSSHSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      format: 'ssh_auth',
      name: 'my-ssh-secret',
      data: { 'ssh_key': '---BEGIN PRIVATE KEY------END PRIVATE KEY---' },
    };

    const res = await codeEngineService.createSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getSSHSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-ssh-secret',
    };

    const res = await codeEngineService.getSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceSSHSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-ssh-secret',
      ifMatch: '*',
      data: {
        'ssh_key': '---BEGIN PRIVATE KEY------END PRIVATE KEY---',
        'known_hosts': 'github.com',
      },
      format: 'ssh_auth',
    };

    const res = await codeEngineService.replaceSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createTLSSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      format: 'tls',
      name: 'my-tls-secret',
      data: {
        'tls_key': '---BEGIN PRIVATE KEY------END PRIVATE KEY---',
        'tls_cert': '---BEGIN CERTIFICATE------END CERTIFICATE---',
      },
    };

    const res = await codeEngineService.createSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getTLSSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-tls-secret',
    };

    const res = await codeEngineService.getSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceTLSSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-tls-secret',
      ifMatch: '*',
      data: {
        'tls_key': '---BEGIN PRIVATE KEY------END PRIVATE KEY---',
        'tls_cert': '---BEGIN CERTIFICATE---test---END CERTIFICATE---',
      },
      format: 'tls',
    };

    const res = await codeEngineService.replaceSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createBasicAuthSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      format: 'basic_auth',
      name: 'my-ba-secret',
      data: {
        'username': 'user',
        'password': 'pass',
      },
    };

    const res = await codeEngineService.createSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getBasicAuthSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-ba-secret',
    };

    const res = await codeEngineService.getSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceBasicAuthSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-ba-secret',
      ifMatch: '*',
      data: {
        'username': 'user2',
        'password': 'pass2',
      },
      format: 'basic_auth',
    };

    const res = await codeEngineService.replaceSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createRegistrySecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      format: 'registry',
      name: 'my-reg-secret',
      data: {
        'username': 'user',
        'password': 'pass',
        'server': 'github.com',
        'email': 'test@123.com',
      },
    };

    const res = await codeEngineService.createSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getRegistrySecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-reg-secret',
    };

    const res = await codeEngineService.getSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceRegistrySecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-reg-secret',
      ifMatch: '*',
      data: {
        'username': 'user2',
        'password': 'pass2',
        'server': 'github.com',
        'email': 'test@123.com',
      },
      format: 'registry',
    };

    const res = await codeEngineService.replaceSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteAppRevision()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      appName: 'my-app',
      name: 'my-app-00001',
    };

    const res = await codeEngineService.deleteAppRevision(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteApp()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-app',
    };

    const res = await codeEngineService.deleteApp(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteJobRun()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-job-run',
    };

    const res = await codeEngineService.deleteJobRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteJob()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-job',
    };

    const res = await codeEngineService.deleteJob(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteBuild()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-build',
    };

    const res = await codeEngineService.deleteBuild(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteBuildRun()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-build-run',
    };

    const res = await codeEngineService.deleteBuildRun(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteConfigMap()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-config-map',
    };

    const res = await codeEngineService.deleteConfigMap(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-secret',
    };

    const res = await codeEngineService.deleteSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteSSHSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-ssh-secret',
    };

    const res = await codeEngineService.deleteSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });
  test('deleteTLSSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-tls-secret',
    };

    const res = await codeEngineService.deleteSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });
  test('deleteBasicAuthSecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-ba-secret',
    };

    const res = await codeEngineService.deleteSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });
  test('deleteRegistrySecret()', async () => {
    const params = {
      projectId: e2eTestProjectId,
      name: 'my-reg-secret',
    };

    const res = await codeEngineService.deleteSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteProject()', async () => {
    const params = {
      id: e2eTestProjectId,
    };

    const res = await codeEngineService.deleteProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });
});
