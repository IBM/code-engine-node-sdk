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

  test('getProjectEgressIps()', async () => {
    const params = {
      projectId: e2eTestProjectId,
    };

    const res = await codeEngineService.getProjectEgressIps(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
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
        'tls_key':
          '-----BEGIN PRIVATE KEY-----\n' +
          'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCr+Qx5OrAHLWwm' +
          '\nmstn7aEo317g/Lxv/Dmb/N/lanbGZfaVlnE1JrASNnEjps5CrVBLkjctbRYuAWOb' +
          '\nvX4OKIGbSmT2JDu3gieg1v2gg0iuMmfqh9pgP8szlfB8lG7/rZ5m4ApEEB8iszIe' +
          '\n+BrPsmlBBqd+tuJ3+t/BY9a7PjphkaMCbGlvoaDZEjT6KqubAMmZqkkYFT8mYx+A' +
          '\nkwImgqVR5zMs4R2XSEl0QGLsFjnDtWLDvrHGdeGE0hnqTS5OusJ8bmNLJDOvSJSd' +
          '\nZSWPtyahNQT4wAnp3RKxd3D2pdChqmxGdIs+eeNwzoXD42M2VEE/MgPLu7hPuPmC' +
          '\nnN6AsET9AgMBAAECggEAc9d1cYv42zzbpz2KWt2VO6ULkl5syLqMS+kRIMaQb6Br' +
          '\nc+Q9KeJ/pCUMHUnVktCQT/eUN4NN93t0D4qbiQn8FBEO5UcO+tQvwYZQnnkQ0lad' +
          '\n7TvJ/B+8z2jm7+REyPG4y++KusJpVsSCtJ3H4bR6dhT3asHi15Mkem64TLTkOqf2' +
          '\n5lWg5BUi3ZR5qFjriZdb7N3A+/Cb1fwOObCwNjRUJX6FAPpCdwEr+L9/o6bod+1N' +
          '\nUArBYlSP8yMNyct3WzkPSpFnZxaYapjl0Nm9ipOfR5b9CHThoHg007WxdDF+6a/e' +
          '\nSEJOZ0jRHwSctLhjSuL8/EOIuQGSHsyOK4SOmeHRgQKBgQDYlrafbArou+pStqIU' +
          '\nZCmV51UqSfqZAAJ+YzV9rqhsM97yQKQYEESeIbgAnWCGlAbY7XrysIA/aOdglOuF' +
          '\no60oRqlnkYZJT8SXjvnwmyxor67f3G0jbVuoefYL1G1EPdcL9l2K0xehOa2huYm0' +
          '\n8lvlI8PPKKJkmu22r/TNyp6VEQKBgQDLRAHsDjNdwyMKVGe2G6ZmnyDWhGzVOOZf' +
          '\n+Ixfmt0BK5AnmJBeABM6WRC/6EM0eX31lcev7sJMpWF4Iw0Op+tW2gmtfphi3j/l' +
          '\nG7B3lU4V/M6jw0CrASy1RGY257ou3o+/yS4N6/lafZw/V8KDjgJngCeyRhgFf+Rj' +
          '\nVNC3FIsBLQKBgERN43ILZLVY7eD/78V2gRbhSZ54jitKMX8iUnA8cKkPArRrZlSg' +
          '\nbMNh5uFqwFIwxKgM3MVEnG1i6/Utgck3gRg+kJY08qCUI2+Yi4IxraOmJAQ9Q730' +
          '\ncv+C1vGMIJlw1yzSmVV6lO0nf3aNSLxj4k81JD9klTIdGfKPMyjjSXfBAoGBALhl' +
          '\nWI0JkOWlSZtsWK1mxfzgrMyOU6DWvn8fnlB4z7bpCxwwlf8AeHD9LWm6zYTEFlV8' +
          '\n7CsZIOChQxvWSFkcUi13HUJrztgaIMK57Mt/AdiGf/sl/Ptk1GcYxtVWQJuWQbfN' +
          '\nTN9KS+oge2cnOQlZAatdIiXi2pXaoJjP74u2sid9AoGAFuustiKF2vffjhyEg+HL' +
          '\nU57p6LG7y6x02COLDhKTX4c/bEa6MX4f91ZKXy2S47tCgLSf4SYd49k1H0wQEDkl' +
          '\nYs+pznN30O/Jxu063JfvFbLZxJkeayLpQL12w+NQUDwsF6MGvIYTnUefhkfb3LWC' +
          '\njBKCTCcw9u4SVX1jK4f2/OU=' +
          '\n-----END PRIVATE KEY-----',
        'tls_cert':
          '-----BEGIN CERTIFICATE-----' +
          '\nMIICqDCCAZACCQDB2CY2jE7CCjANBgkqhkiG9w0BAQsFADAWMRQwEgYDVQQDDAtm' +
          '\nb28uYmFyLmNvbTAeFw0yMzA2MjkyMDM5MzhaFw0yNDA2MjgyMDM5MzhaMBYxFDAS' +
          '\nBgNVBAMMC2Zvby5iYXIuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC' +
          '\nAQEAq/kMeTqwBy1sJprLZ+2hKN9e4Py8b/w5m/zf5Wp2xmX2lZZxNSawEjZxI6bO' +
          '\nQq1QS5I3LW0WLgFjm71+DiiBm0pk9iQ7t4InoNb9oINIrjJn6ofaYD/LM5XwfJRu' +
          '\n/62eZuAKRBAfIrMyHvgaz7JpQQanfrbid/rfwWPWuz46YZGjAmxpb6Gg2RI0+iqr' +
          '\nmwDJmapJGBU/JmMfgJMCJoKlUeczLOEdl0hJdEBi7BY5w7Viw76xxnXhhNIZ6k0u' +
          '\nTrrCfG5jSyQzr0iUnWUlj7cmoTUE+MAJ6d0SsXdw9qXQoapsRnSLPnnjcM6Fw+Nj' +
          '\nNlRBPzIDy7u4T7j5gpzegLBE/QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCXRwhk' +
          '\nwjvOzKh5R+QKHGjtcjutSkwZbMj5+5enN/8IwX2BbX0i/aALxEPcZExMK5aIS5rm' +
          '\n+kUkDyZkYVaMQQoTGNHSnnET8WJf8zGqd/GdiVxZRVXjOnQ5tEezdwFm0a3TEEKw' +
          '\n/2HG9chz24ywhbIZZMEFmse7LLrcy5XSUQzOTMWBKZ8fTEXBYaEVhD/9b4SPuLpw' +
          '\ni4vDZPt+e+p96NcGNf0b932aod+X34dARUd55UM9PY4i4Z7UzzV7zK+U6tHjzzmg' +
          '\nrv+JA2kDt3mwQXn7bfgRxLcpBZFpUHjLRe+MGlQJM2xFYAXop9ZzF1go58ErHbsT' +
          '\nCyXJ56cw0ffDrXSn' +
          '\n-----END CERTIFICATE-----',
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
        'tls_key':
          '-----BEGIN PRIVATE KEY-----' +
          '\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGfJO9qkAlq8Vy' +
          '\nKNyJEAwJ+VGurknonWKL+/B/8uS45qDYHP9McyokfHR6GEeL3p/vk4zf+QI/+5Dn' +
          '\n0IK6jyiLzl4x0FlEVbEesLubi/6B8r6I+pYfWlOX+ShJkryuZcMjuEtvP6sli+Wj' +
          '\nr5yILu8YHgAVVdvLs7XJmlDPv/kmq9R66Nsl02PgLazJfztijcdBGkQAPxClwwkJ' +
          '\nzVCWE/G7fS0iYUb76ScHrxLwN7Bh+wTOIMHk6qqK2UA45a8MmyGOkD4SoB4K3z3y' +
          '\nGNTQrxQbj+wCyK9kY2/sTs++kcsiwTfTx+17UYO05S0+ExqIWrD6bJpnYmWART/2' +
          '\niBvcAfLvAgMBAAECggEBAKzVj6SJGmBzKXQVxquHEKSiuBC+bVcjrMsuL6aKb8Xd' +
          '\n9VMaNOhyI9EvmhEzESHnUidAuVvSLbZfLTfeZedjfy/2HCmOPhz17UxHIqX4ij7H' +
          '\njEgkxBI7Ci18ZStjne7SZ9CzyuPtce842VbmNQyUqde7T+FEKSdArlwFhrbQeHjF' +
          '\ngJQrsroY8d0h9Xt6UlfVzX/CeNWP98YJLJ7my9WYRhZlcBE5qwyaMRIY2UKcjgpx' +
          '\nXaViny79P5GwiaVGgOUYZ32bA+GHf7u5WP7lCiqT32SgTZzQ9dov9KN+QSkui7qO' +
          '\nj0tC0c7OI59zatPAbp+t1LDjsgTjkuoReHes4nhupvECgYEA5b+S9uLtTn3XxLMf' +
          '\nR00anvek8EUbTA/TRrJWUhCgvyVCafpyx0BqJC9eR5LnmD3f3yFXDvD5DF201zTn' +
          '\n1Py+sk6oUfuPLXz8P76L5Wpz8ryRjR4LfLu0CTGMuUMDfE3NRHQJHNKnkrPwu0mX' +
          '\njwbZrI08Xs8yjyx4gapdwE1cEvkCgYEA3SqPHW1AjCdnhSpnzf9QwxX0hzUKvUBK' +
          '\neuuhKvmwh/AnE2y4b/6VH7TRj+fUvbaSFl63tTKXvUA2J7gHvz8o3j24EYAibwe/' +
          '\nTvcloLjNxHOEq42vwB9zoZZ1UjvNhRo7lB6626/ffQRHXeSfoyMr2GTFYdpCAZds' +
          '\nf8/fHA14RycCgYASzd9FfcVWi05Btzd0KodnQ3WohL97NkBgpPATv3CotG//JJSI' +
          '\nYmlNlOLukMOL3mSYaq4pduerb3ABvT7MW/NvvKhiLWjGnFg5D2t7136t+2keV7sw' +
          '\n9lwB9KBD+YwrfGK0m5qzVTqJ81hcu+U/u5vNV7H9QJAuz8D9O+h4eNx0YQKBgQC+' +
          '\naa3dv/oasLJHzEKi8HYv/+8PmXMtjPSS79tKjL6XywNZjfkdMypgqeTi6M4Yp98O' +
          '\ns22m63AI2AfIGoFQ/qfI74pSRudegGUNL2uN/I3r3SkUKmBuIKYFMOzBaAuB1RwG' +
          '\nYo6uJbVchRqMlBF8+wL8w4XMwYSiqiQXxnhoRpCPcQKBgE2UoeHxvydgQjcfx7/M' +
          '\n8BmmLqohWUF6tU62TVBMhYeO77H5Qkn/y0K6UPvar7x0lNAz2ljiUtYvvHc3S9Mc' +
          '\nwSQ7GGIZu4ro/tLfi1xVfeQH5Ibm/pdk+1BZfcGeYAHC9Gr+LAT0iJRu8nFyWroB' +
          '\nq/Tq26sIqxRotUdtRDJ6D6jf' +
          '\n-----END PRIVATE KEY-----',
        'tls_cert':
          '-----BEGIN CERTIFICATE-----' +
          '\nMIICqDCCAZACCQDB2CY2jE7CCjANBgkqhkiG9w0BAQsFADAWMRQwEgYDVQQDDAtm' +
          '\nb28uYmFyLmNvbTAeFw0yMzA2MjkyMDM5MzhaFw0yNDA2MjgyMDM5MzhaMBYxFDAS' +
          '\nBgNVBAMMC2Zvby5iYXIuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC' +
          '\nAQEAq/kMeTqwBy1sJprLZ+2hKN9e4Py8b/w5m/zf5Wp2xmX2lZZxNSawEjZxI6bO' +
          '\nQq1QS5I3LW0WLgFjm71+DiiBm0pk9iQ7t4InoNb9oINIrjJn6ofaYD/LM5XwfJRu' +
          '\n/62eZuAKRBAfIrMyHvgaz7JpQQanfrbid/rfwWPWuz46YZGjAmxpb6Gg2RI0+iqr' +
          '\nmwDJmapJGBU/JmMfgJMCJoKlUeczLOEdl0hJdEBi7BY5w7Viw76xxnXhhNIZ6k0u' +
          '\nTrrCfG5jSyQzr0iUnWUlj7cmoTUE+MAJ6d0SsXdw9qXQoapsRnSLPnnjcM6Fw+Nj' +
          '\nNlRBPzIDy7u4T7j5gpzegLBE/QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCXRwhk' +
          '\nwjvOzKh5R+QKHGjtcjutSkwZbMj5+5enN/8IwX2BbX0i/aALxEPcZExMK5aIS5rm' +
          '\n+kUkDyZkYVaMQQoTGNHSnnET8WJf8zGqd/GdiVxZRVXjOnQ5tEezdwFm0a3TEEKw' +
          '\n/2HG9chz24ywhbIZZMEFmse7LLrcy5XSUQzOTMWBKZ8fTEXBYaEVhD/9b4SPuLpw' +
          '\ni4vDZPt+e+p96NcGNf0b932aod+X34dARUd55UM9PY4i4Z7UzzV7zK+U6tHjzzmg' +
          '\nrv+JA2kDt3mwQXn7bfgRxLcpBZFpUHjLRe+MGlQJM2xFYAXop9ZzF1go58ErHbsT' +
          '\nCyXJ56cw0ffDrXSn' +
          '\n-----END CERTIFICATE-----',
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
