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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.80.0-29334a73-20230925-151553
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * REST API for Code Engine
 *
 * API Version: 2.0.0
 */

class CodeEngineV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.au-syd.codeengine.cloud.ibm.com/v2';

  static DEFAULT_SERVICE_NAME: string = 'code_engine';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of CodeEngineV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {CodeEngineV2}
   */

  public static newInstance(options: UserOptions): CodeEngineV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new CodeEngineV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a CodeEngineV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {CodeEngineV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(CodeEngineV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * projects
   ************************/

  /**
   * List all projects.
   *
   * List all projects in the current account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.limit] - Optional maximum number of projects per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. Any additional query parameters are ignored if a page token is present. If omitted, the first page of
   * results is returned. This value is obtained from the 'start' query parameter in the `next` object of the operation
   * response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.ProjectList>>}
   */
  public listProjects(
    params?: CodeEngineV2.ListProjectsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.ProjectList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listProjects');

    const parameters = {
      options: {
        url: '/projects',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a project.
   *
   * Create a Code Engine project on IBM Cloud. The project will be created in the region that corresponds to the API
   * endpoint that is being called.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the project.
   * @param {string} [params.resourceGroupId] - Optional ID of the resource group for your project deployment. If this
   * field is not defined, the default resource group of the account will be used.
   * @param {string[]} [params.tags] - Optional list of labels to assign to your project. Tags are not part of the
   * project resource that is returned by the server, but can be obtained and managed through the Global Tagging API in
   * IBM Cloud. Find more information on [Global Tagging API docs](https://cloud.ibm.com/apidocs/tagging).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Project>>}
   */
  public createProject(
    params: CodeEngineV2.CreateProjectParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Project>> {
    const _params = { ...params };
    const _requiredParams = ['name'];
    const _validParams = ['name', 'resourceGroupId', 'tags', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'resource_group_id': _params.resourceGroupId,
      'tags': _params.tags,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createProject');

    const parameters = {
      options: {
        url: '/projects',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a project.
   *
   * Display the details of a single project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the project.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Project>>}
   */
  public getProject(
    params: CodeEngineV2.GetProjectParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Project>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getProject');

    const parameters = {
      options: {
        url: '/projects/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a project.
   *
   * Delete a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the project.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteProject(
    params: CodeEngineV2.DeleteProjectParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteProject');

    const parameters = {
      options: {
        url: '/projects/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List egress IP addresses.
   *
   * Lists all egress IP addresses (public and private) that are used by components running in this project. For
   * information about using egress IP addresses, see [Code Engine public and private IP
   * addresses](https://cloud.ibm.com/docs/codeengine?topic=codeengine-network-addresses).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.ProjectEgressIPAddresses>>}
   */
  public getProjectEgressIps(
    params: CodeEngineV2.GetProjectEgressIpsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.ProjectEgressIPAddresses>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getProjectEgressIps'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/egress_ips',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get the status details for a project.
   *
   * Retrieves status details about the given project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.ProjectStatusDetails>>}
   */
  public getProjectStatusDetails(
    params: CodeEngineV2.GetProjectStatusDetailsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.ProjectStatusDetails>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getProjectStatusDetails'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/status_details',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * applications
   ************************/

  /**
   * List applications.
   *
   * List all applications in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of apps per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.AppList>>}
   */
  public listApps(
    params: CodeEngineV2.ListAppsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.AppList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listApps');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create an application.
   *
   * Create an application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.imageReference - The name of the image that is used for this app. The format is
   * `REGISTRY/NAMESPACE/REPOSITORY:TAG` where `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the
   * default is `docker.io`. If `TAG` is not specified, the default is `latest`. If the image reference points to a
   * registry that requires authentication, make sure to also specify the property `image_secret`.
   * @param {string} params.name - The name of the app. Use a name that is unique within the project.
   * @param {number} [params.imagePort] - Optional port the app listens on. While the app will always be exposed via
   * port `443` for end users, this port is used to connect to the port that is exposed by the container image.
   * @param {string} [params.imageSecret] - Optional name of the image registry access secret. The image registry access
   * secret is used to authenticate with a private registry when you download the container image. If the image
   * reference points to a registry that requires authentication, the app will be created but cannot reach the ready
   * status, until this property is provided, too.
   * @param {string} [params.managedDomainMappings] - Optional value controlling which of the system managed domain
   * mappings will be setup for the application. Valid values are 'local_public', 'local_private' and 'local'.
   * Visibility can only be 'local_private' if the project supports application private visibility.
   * @param {ProbePrototype} [params.probeLiveness] - Request model for probes.
   * @param {ProbePrototype} [params.probeReadiness] - Request model for probes.
   * @param {string[]} [params.runArguments] - Optional arguments for the app that are passed to start the container. If
   * not specified an empty string array will be applied and the arguments specified by the container image, will be
   * used to start the container.
   * @param {number} [params.runAsUser] - Optional user ID (UID) to run the app (e.g., `1001`).
   * @param {string[]} [params.runCommands] - Optional commands for the app that are passed to start the container. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {EnvVarPrototype[]} [params.runEnvVariables] - Optional references to config maps, secrets or literal values
   * that are exposed as environment variables within the running application.
   * @param {string} [params.runServiceAccount] - Optional name of the service account. For built-in service accounts,
   * you can use the shortened names `manager` , `none`, `reader`, and `writer`.
   * @param {VolumeMountPrototype[]} [params.runVolumeMounts] - Optional mounts of config maps or a secrets.
   * @param {number} [params.scaleConcurrency] - Optional maximum number of requests that can be processed concurrently
   * per instance.
   * @param {number} [params.scaleConcurrencyTarget] - Optional threshold of concurrent requests per instance at which
   * one or more additional instances are created. Use this value to scale up instances based on concurrent number of
   * requests. This option defaults to the value of the `scale_concurrency` option, if not specified.
   * @param {string} [params.scaleCpuLimit] - Optional number of CPU set for the instance of the app. For valid values
   * see [Supported memory and CPU combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
   * @param {number} [params.scaleDownDelay] - Optional amount of time in seconds that delays the scale down behavior
   * for an app instance.
   * @param {string} [params.scaleEphemeralStorageLimit] - Optional amount of ephemeral storage to set for the instance
   * of the app. The amount specified as ephemeral storage, must not exceed the amount of `scale_memory_limit`. The
   * units for specifying ephemeral storage are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand
   * expressions for GB and MB. For more information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleInitialInstances] - Optional initial number of instances that are created upon app
   * creation or app update.
   * @param {number} [params.scaleMaxInstances] - Optional maximum number of instances for this app. If you set this
   * value to `0`, this property does not set a upper scaling limit. However, the app scaling is still limited by the
   * project quota for instances. See [Limits and quotas for Code
   * Engine](https://cloud.ibm.com/docs/codeengine?topic=codeengine-limits).
   * @param {string} [params.scaleMemoryLimit] - Optional amount of memory set for the instance of the app. For valid
   * values see [Supported memory and CPU
   * combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
   * memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
   * information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleMinInstances] - Optional minimum number of instances for this app. If you set this
   * value to `0`, the app will scale down to zero, if not hit by any request for some time.
   * @param {number} [params.scaleRequestTimeout] - Optional amount of time in seconds that is allowed for a running app
   * to respond to a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.App>>}
   */
  public createApp(
    params: CodeEngineV2.CreateAppParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.App>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'imageReference', 'name'];
    const _validParams = [
      'projectId',
      'imageReference',
      'name',
      'imagePort',
      'imageSecret',
      'managedDomainMappings',
      'probeLiveness',
      'probeReadiness',
      'runArguments',
      'runAsUser',
      'runCommands',
      'runEnvVariables',
      'runServiceAccount',
      'runVolumeMounts',
      'scaleConcurrency',
      'scaleConcurrencyTarget',
      'scaleCpuLimit',
      'scaleDownDelay',
      'scaleEphemeralStorageLimit',
      'scaleInitialInstances',
      'scaleMaxInstances',
      'scaleMemoryLimit',
      'scaleMinInstances',
      'scaleRequestTimeout',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'image_reference': _params.imageReference,
      'name': _params.name,
      'image_port': _params.imagePort,
      'image_secret': _params.imageSecret,
      'managed_domain_mappings': _params.managedDomainMappings,
      'probe_liveness': _params.probeLiveness,
      'probe_readiness': _params.probeReadiness,
      'run_arguments': _params.runArguments,
      'run_as_user': _params.runAsUser,
      'run_commands': _params.runCommands,
      'run_env_variables': _params.runEnvVariables,
      'run_service_account': _params.runServiceAccount,
      'run_volume_mounts': _params.runVolumeMounts,
      'scale_concurrency': _params.scaleConcurrency,
      'scale_concurrency_target': _params.scaleConcurrencyTarget,
      'scale_cpu_limit': _params.scaleCpuLimit,
      'scale_down_delay': _params.scaleDownDelay,
      'scale_ephemeral_storage_limit': _params.scaleEphemeralStorageLimit,
      'scale_initial_instances': _params.scaleInitialInstances,
      'scale_max_instances': _params.scaleMaxInstances,
      'scale_memory_limit': _params.scaleMemoryLimit,
      'scale_min_instances': _params.scaleMinInstances,
      'scale_request_timeout': _params.scaleRequestTimeout,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createApp');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an application.
   *
   * Display the details of an application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your application.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.App>>}
   */
  public getApp(
    params: CodeEngineV2.GetAppParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.App>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getApp');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an application.
   *
   * Delete an application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your application.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteApp(
    params: CodeEngineV2.DeleteAppParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteApp');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an application.
   *
   * An application contains one or more revisions. A revision represents an immutable version of the configuration
   * properties of the application. Each update of an application configuration property creates a new revision of the
   * application. [Learn more](https://cloud.ibm.com/docs/codeengine?topic=codeengine-update-app).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your application.
   * @param {string} params.ifMatch - Version of the app settings to be updated. Specify the version that you retrieved
   * as entity_tag (ETag header) when reading the app. This value helps identifying parallel usage of this API. Pass *
   * to indicate to update any version available. This might result in stale updates.
   * @param {number} [params.imagePort] - Optional port the app listens on. While the app will always be exposed via
   * port `443` for end users, this port is used to connect to the port that is exposed by the container image.
   * @param {string} [params.imageReference] - The name of the image that is used for this app. The format is
   * `REGISTRY/NAMESPACE/REPOSITORY:TAG` where `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the
   * default is `docker.io`. If `TAG` is not specified, the default is `latest`. If the image reference points to a
   * registry that requires authentication, make sure to also specify the property `image_secret`.
   * @param {string} [params.imageSecret] - Optional name of the image registry access secret. The image registry access
   * secret is used to authenticate with a private registry when you download the container image. If the image
   * reference points to a registry that requires authentication, the app will be created but cannot reach the ready
   * status, until this property is provided, too.
   * @param {string} [params.managedDomainMappings] - Optional value controlling which of the system managed domain
   * mappings will be setup for the application. Valid values are 'local_public', 'local_private' and 'local'.
   * Visibility can only be 'local_private' if the project supports application private visibility.
   * @param {ProbePrototype} [params.probeLiveness] - Request model for probes.
   * @param {ProbePrototype} [params.probeReadiness] - Request model for probes.
   * @param {string[]} [params.runArguments] - Optional arguments for the app that are passed to start the container. If
   * not specified an empty string array will be applied and the arguments specified by the container image, will be
   * used to start the container.
   * @param {number} [params.runAsUser] - Optional user ID (UID) to run the app (e.g., `1001`).
   * @param {string[]} [params.runCommands] - Optional commands for the app that are passed to start the container. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {EnvVarPrototype[]} [params.runEnvVariables] - Optional references to config maps, secrets or literal
   * values.
   * @param {string} [params.runServiceAccount] - Optional name of the service account. For built-in service accounts,
   * you can use the shortened names `manager` , `none`, `reader`, and `writer`.
   * @param {VolumeMountPrototype[]} [params.runVolumeMounts] - Optional mounts of config maps or a secrets. In case
   * this is provided, existing `run_volume_mounts` will be overwritten.
   * @param {number} [params.scaleConcurrency] - Optional maximum number of requests that can be processed concurrently
   * per instance.
   * @param {number} [params.scaleConcurrencyTarget] - Optional threshold of concurrent requests per instance at which
   * one or more additional instances are created. Use this value to scale up instances based on concurrent number of
   * requests. This option defaults to the value of the `scale_concurrency` option, if not specified.
   * @param {string} [params.scaleCpuLimit] - Optional number of CPU set for the instance of the app. For valid values
   * see [Supported memory and CPU combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
   * @param {number} [params.scaleDownDelay] - Optional amount of time in seconds that delays the scale down behavior
   * for an app instance.
   * @param {string} [params.scaleEphemeralStorageLimit] - Optional amount of ephemeral storage to set for the instance
   * of the app. The amount specified as ephemeral storage, must not exceed the amount of `scale_memory_limit`. The
   * units for specifying ephemeral storage are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand
   * expressions for GB and MB. For more information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleInitialInstances] - Optional initial number of instances that are created upon app
   * creation or app update.
   * @param {number} [params.scaleMaxInstances] - Optional maximum number of instances for this app. If you set this
   * value to `0`, this property does not set a upper scaling limit. However, the app scaling is still limited by the
   * project quota for instances. See [Limits and quotas for Code
   * Engine](https://cloud.ibm.com/docs/codeengine?topic=codeengine-limits).
   * @param {string} [params.scaleMemoryLimit] - Optional amount of memory set for the instance of the app. For valid
   * values see [Supported memory and CPU
   * combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
   * memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
   * information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleMinInstances] - Optional minimum number of instances for this app. If you set this
   * value to `0`, the app will scale down to zero, if not hit by any request for some time.
   * @param {number} [params.scaleRequestTimeout] - Optional amount of time in seconds that is allowed for a running app
   * to respond to a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.App>>}
   */
  public updateApp(
    params: CodeEngineV2.UpdateAppParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.App>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'ifMatch'];
    const _validParams = [
      'projectId',
      'name',
      'ifMatch',
      'imagePort',
      'imageReference',
      'imageSecret',
      'managedDomainMappings',
      'probeLiveness',
      'probeReadiness',
      'runArguments',
      'runAsUser',
      'runCommands',
      'runEnvVariables',
      'runServiceAccount',
      'runVolumeMounts',
      'scaleConcurrency',
      'scaleConcurrencyTarget',
      'scaleCpuLimit',
      'scaleDownDelay',
      'scaleEphemeralStorageLimit',
      'scaleInitialInstances',
      'scaleMaxInstances',
      'scaleMemoryLimit',
      'scaleMinInstances',
      'scaleRequestTimeout',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'image_port': _params.imagePort,
      'image_reference': _params.imageReference,
      'image_secret': _params.imageSecret,
      'managed_domain_mappings': _params.managedDomainMappings,
      'probe_liveness': _params.probeLiveness,
      'probe_readiness': _params.probeReadiness,
      'run_arguments': _params.runArguments,
      'run_as_user': _params.runAsUser,
      'run_commands': _params.runCommands,
      'run_env_variables': _params.runEnvVariables,
      'run_service_account': _params.runServiceAccount,
      'run_volume_mounts': _params.runVolumeMounts,
      'scale_concurrency': _params.scaleConcurrency,
      'scale_concurrency_target': _params.scaleConcurrencyTarget,
      'scale_cpu_limit': _params.scaleCpuLimit,
      'scale_down_delay': _params.scaleDownDelay,
      'scale_ephemeral_storage_limit': _params.scaleEphemeralStorageLimit,
      'scale_initial_instances': _params.scaleInitialInstances,
      'scale_max_instances': _params.scaleMaxInstances,
      'scale_memory_limit': _params.scaleMemoryLimit,
      'scale_min_instances': _params.scaleMinInstances,
      'scale_request_timeout': _params.scaleRequestTimeout,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'updateApp');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps/{name}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List application revisions.
   *
   * List all application revisions in a particular application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.appName - The name of your application.
   * @param {number} [params.limit] - Optional maximum number of apps per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.AppRevisionList>>}
   */
  public listAppRevisions(
    params: CodeEngineV2.ListAppRevisionsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.AppRevisionList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'appName'];
    const _validParams = ['projectId', 'appName', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
      'app_name': _params.appName,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listAppRevisions');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps/{app_name}/revisions',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an application revision.
   *
   * Display the details of an application revision.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.appName - The name of your application.
   * @param {string} params.name - The name of your application revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.AppRevision>>}
   */
  public getAppRevision(
    params: CodeEngineV2.GetAppRevisionParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.AppRevision>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'appName', 'name'];
    const _validParams = ['projectId', 'appName', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'app_name': _params.appName,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getAppRevision');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps/{app_name}/revisions/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an application revision.
   *
   * Delete an application revision.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.appName - The name of your application.
   * @param {string} params.name - The name of your application revision.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteAppRevision(
    params: CodeEngineV2.DeleteAppRevisionParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'appName', 'name'];
    const _validParams = ['projectId', 'appName', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'app_name': _params.appName,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteAppRevision');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps/{app_name}/revisions/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * jobs
   ************************/

  /**
   * List jobs.
   *
   * List all jobs in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of jobs per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.JobList>>}
   */
  public listJobs(
    params: CodeEngineV2.ListJobsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.JobList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listJobs');

    const parameters = {
      options: {
        url: '/projects/{project_id}/jobs',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a job.
   *
   * Create a job.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.imageReference - The name of the image that is used for this job. The format is
   * `REGISTRY/NAMESPACE/REPOSITORY:TAG` where `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the
   * default is `docker.io`. If `TAG` is not specified, the default is `latest`. If the image reference points to a
   * registry that requires authentication, make sure to also specify the property `image_secret`.
   * @param {string} params.name - The name of the job. Use a name that is unique within the project.
   * @param {string} [params.imageSecret] - The name of the image registry access secret. The image registry access
   * secret is used to authenticate with a private registry when you download the container image. If the image
   * reference points to a registry that requires authentication, the job / job runs will be created but submitted job
   * runs will fail, until this property is provided, too. This property must not be set on a job run, which references
   * a job template.
   * @param {string[]} [params.runArguments] - Set arguments for the job that are passed to start job run containers. If
   * not specified an empty string array will be applied and the arguments specified by the container image, will be
   * used to start the container.
   * @param {number} [params.runAsUser] - The user ID (UID) to run the job (e.g., 1001).
   * @param {string[]} [params.runCommands] - Set commands for the job that are passed to start job run containers. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {EnvVarPrototype[]} [params.runEnvVariables] - Optional references to config maps, secrets or literal
   * values.
   * @param {string} [params.runMode] - The mode for runs of the job. Valid values are `task` and `daemon`. In `task`
   * mode, the `max_execution_time` and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and
   * failed instances are restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
   * @param {string} [params.runServiceAccount] - The name of the service account. For built-in service accounts, you
   * can use the shortened names `manager`, `none`, `reader`, and `writer`. This property must not be set on a job run,
   * which references a job template.
   * @param {VolumeMountPrototype[]} [params.runVolumeMounts] - Optional mounts of config maps or a secrets.
   * @param {string} [params.scaleArraySpec] - Define a custom set of array indices as comma-separated list containing
   * single values and hyphen-separated ranges like `5,12-14,23,27`. Each instance can pick up its array index via
   * environment variable `JOB_INDEX`. The number of unique array indices specified here determines the number of job
   * instances to run.
   * @param {string} [params.scaleCpuLimit] - Optional amount of CPU set for the instance of the job. For valid values
   * see [Supported memory and CPU combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
   * @param {string} [params.scaleEphemeralStorageLimit] - Optional amount of ephemeral storage to set for the instance
   * of the job. The amount specified as ephemeral storage, must not exceed the amount of `scale_memory_limit`. The
   * units for specifying ephemeral storage are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand
   * expressions for GB and MB. For more information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleMaxExecutionTime] - The maximum execution time in seconds for runs of the job. This
   * property can only be specified if `run_mode` is `task`.
   * @param {string} [params.scaleMemoryLimit] - Optional amount of memory set for the instance of the job. For valid
   * values see [Supported memory and CPU
   * combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
   * memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
   * information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleRetryLimit] - The number of times to rerun an instance of the job before the job is
   * marked as failed. This property can only be specified if `run_mode` is `task`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Job>>}
   */
  public createJob(
    params: CodeEngineV2.CreateJobParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Job>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'imageReference', 'name'];
    const _validParams = [
      'projectId',
      'imageReference',
      'name',
      'imageSecret',
      'runArguments',
      'runAsUser',
      'runCommands',
      'runEnvVariables',
      'runMode',
      'runServiceAccount',
      'runVolumeMounts',
      'scaleArraySpec',
      'scaleCpuLimit',
      'scaleEphemeralStorageLimit',
      'scaleMaxExecutionTime',
      'scaleMemoryLimit',
      'scaleRetryLimit',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'image_reference': _params.imageReference,
      'name': _params.name,
      'image_secret': _params.imageSecret,
      'run_arguments': _params.runArguments,
      'run_as_user': _params.runAsUser,
      'run_commands': _params.runCommands,
      'run_env_variables': _params.runEnvVariables,
      'run_mode': _params.runMode,
      'run_service_account': _params.runServiceAccount,
      'run_volume_mounts': _params.runVolumeMounts,
      'scale_array_spec': _params.scaleArraySpec,
      'scale_cpu_limit': _params.scaleCpuLimit,
      'scale_ephemeral_storage_limit': _params.scaleEphemeralStorageLimit,
      'scale_max_execution_time': _params.scaleMaxExecutionTime,
      'scale_memory_limit': _params.scaleMemoryLimit,
      'scale_retry_limit': _params.scaleRetryLimit,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createJob');

    const parameters = {
      options: {
        url: '/projects/{project_id}/jobs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a job.
   *
   * Display the details of a job.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your job.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Job>>}
   */
  public getJob(
    params: CodeEngineV2.GetJobParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Job>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getJob');

    const parameters = {
      options: {
        url: '/projects/{project_id}/jobs/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a job.
   *
   * Delete a job.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your job.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteJob(
    params: CodeEngineV2.DeleteJobParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteJob');

    const parameters = {
      options: {
        url: '/projects/{project_id}/jobs/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a job.
   *
   * Update the given job.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your job.
   * @param {string} params.ifMatch - Version of the job settings to be updated. Specify the version that you retrieved
   * as entity_tag (ETag header) when reading the job. This value helps identifying parallel usage of this API. Pass *
   * to indicate to update any version available. This might result in stale updates.
   * @param {string} [params.imageReference] - The name of the image that is used for this job. The format is
   * `REGISTRY/NAMESPACE/REPOSITORY:TAG` where `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the
   * default is `docker.io`. If `TAG` is not specified, the default is `latest`. If the image reference points to a
   * registry that requires authentication, make sure to also specify the property `image_secret`.
   * @param {string} [params.imageSecret] - The name of the image registry access secret. The image registry access
   * secret is used to authenticate with a private registry when you download the container image. If the image
   * reference points to a registry that requires authentication, the job / job runs will be created but submitted job
   * runs will fail, until this property is provided, too. This property must not be set on a job run, which references
   * a job template.
   * @param {string[]} [params.runArguments] - Set arguments for the job that are passed to start job run containers. If
   * not specified an empty string array will be applied and the arguments specified by the container image, will be
   * used to start the container.
   * @param {number} [params.runAsUser] - The user ID (UID) to run the job (e.g., 1001).
   * @param {string[]} [params.runCommands] - Set commands for the job that are passed to start job run containers. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {EnvVarPrototype[]} [params.runEnvVariables] - Optional references to config maps, secrets or literal
   * values.
   * @param {string} [params.runMode] - The mode for runs of the job. Valid values are `task` and `daemon`. In `task`
   * mode, the `max_execution_time` and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and
   * failed instances are restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
   * @param {string} [params.runServiceAccount] - The name of the service account. For built-in service accounts, you
   * can use the shortened names `manager`, `none`, `reader`, and `writer`. This property must not be set on a job run,
   * which references a job template.
   * @param {VolumeMountPrototype[]} [params.runVolumeMounts] - Optional mounts of config maps or a secrets. In case
   * this is provided, existing `run_volume_mounts` will be overwritten.
   * @param {string} [params.scaleArraySpec] - Define a custom set of array indices as comma-separated list containing
   * single values and hyphen-separated ranges like `5,12-14,23,27`. Each instance can pick up its array index via
   * environment variable `JOB_INDEX`. The number of unique array indices specified here determines the number of job
   * instances to run.
   * @param {string} [params.scaleCpuLimit] - Optional amount of CPU set for the instance of the job. For valid values
   * see [Supported memory and CPU combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
   * @param {string} [params.scaleEphemeralStorageLimit] - Optional amount of ephemeral storage to set for the instance
   * of the job. The amount specified as ephemeral storage, must not exceed the amount of `scale_memory_limit`. The
   * units for specifying ephemeral storage are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand
   * expressions for GB and MB. For more information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleMaxExecutionTime] - The maximum execution time in seconds for runs of the job. This
   * property can only be specified if `run_mode` is `task`.
   * @param {string} [params.scaleMemoryLimit] - Optional amount of memory set for the instance of the job. For valid
   * values see [Supported memory and CPU
   * combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
   * memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
   * information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleRetryLimit] - The number of times to rerun an instance of the job before the job is
   * marked as failed. This property can only be specified if `run_mode` is `task`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Job>>}
   */
  public updateJob(
    params: CodeEngineV2.UpdateJobParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Job>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'ifMatch'];
    const _validParams = [
      'projectId',
      'name',
      'ifMatch',
      'imageReference',
      'imageSecret',
      'runArguments',
      'runAsUser',
      'runCommands',
      'runEnvVariables',
      'runMode',
      'runServiceAccount',
      'runVolumeMounts',
      'scaleArraySpec',
      'scaleCpuLimit',
      'scaleEphemeralStorageLimit',
      'scaleMaxExecutionTime',
      'scaleMemoryLimit',
      'scaleRetryLimit',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'image_reference': _params.imageReference,
      'image_secret': _params.imageSecret,
      'run_arguments': _params.runArguments,
      'run_as_user': _params.runAsUser,
      'run_commands': _params.runCommands,
      'run_env_variables': _params.runEnvVariables,
      'run_mode': _params.runMode,
      'run_service_account': _params.runServiceAccount,
      'run_volume_mounts': _params.runVolumeMounts,
      'scale_array_spec': _params.scaleArraySpec,
      'scale_cpu_limit': _params.scaleCpuLimit,
      'scale_ephemeral_storage_limit': _params.scaleEphemeralStorageLimit,
      'scale_max_execution_time': _params.scaleMaxExecutionTime,
      'scale_memory_limit': _params.scaleMemoryLimit,
      'scale_retry_limit': _params.scaleRetryLimit,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'updateJob');

    const parameters = {
      options: {
        url: '/projects/{project_id}/jobs/{name}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List job runs.
   *
   * List all job runs in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} [params.jobName] - Optional name of the job that should be filtered for.
   * @param {number} [params.limit] - Optional maximum number of job runs per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.JobRunList>>}
   */
  public listJobRuns(
    params: CodeEngineV2.ListJobRunsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.JobRunList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'jobName', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'job_name': _params.jobName,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listJobRuns');

    const parameters = {
      options: {
        url: '/projects/{project_id}/job_runs',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a job run.
   *
   * Create an job run.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} [params.imageReference] - The name of the image that is used for this job. The format is
   * `REGISTRY/NAMESPACE/REPOSITORY:TAG` where `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the
   * default is `docker.io`. If `TAG` is not specified, the default is `latest`. If the image reference points to a
   * registry that requires authentication, make sure to also specify the property `image_secret`.
   * @param {string} [params.imageSecret] - The name of the image registry access secret. The image registry access
   * secret is used to authenticate with a private registry when you download the container image. If the image
   * reference points to a registry that requires authentication, the job / job runs will be created but submitted job
   * runs will fail, until this property is provided, too. This property must not be set on a job run, which references
   * a job template.
   * @param {string} [params.jobName] - Optional name of the job on which this job run is based on. If specified, the
   * job run will inherit the configuration of the referenced job.
   * @param {string} [params.name] - The name of the job. Use a name that is unique within the project.
   * @param {string[]} [params.runArguments] - Set arguments for the job that are passed to start job run containers. If
   * not specified an empty string array will be applied and the arguments specified by the container image, will be
   * used to start the container.
   * @param {number} [params.runAsUser] - The user ID (UID) to run the job (e.g., 1001).
   * @param {string[]} [params.runCommands] - Set commands for the job that are passed to start job run containers. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {EnvVarPrototype[]} [params.runEnvVariables] - Optional references to config maps, secrets or literal
   * values.
   * @param {string} [params.runMode] - The mode for runs of the job. Valid values are `task` and `daemon`. In `task`
   * mode, the `max_execution_time` and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and
   * failed instances are restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
   * @param {string} [params.runServiceAccount] - The name of the service account. For built-in service accounts, you
   * can use the shortened names `manager`, `none`, `reader`, and `writer`. This property must not be set on a job run,
   * which references a job template.
   * @param {VolumeMountPrototype[]} [params.runVolumeMounts] - Optional mounts of config maps or a secrets.
   * @param {number} [params.scaleArraySizeVariableOverride] - Optional value to override the JOB_ARRAY_SIZE environment
   * variable for a job run.
   * @param {string} [params.scaleArraySpec] - Define a custom set of array indices as comma-separated list containing
   * single values and hyphen-separated ranges like `5,12-14,23,27`. Each instance can pick up its array index via
   * environment variable `JOB_INDEX`. The number of unique array indices specified here determines the number of job
   * instances to run.
   * @param {string} [params.scaleCpuLimit] - Optional amount of CPU set for the instance of the job. For valid values
   * see [Supported memory and CPU combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
   * @param {string} [params.scaleEphemeralStorageLimit] - Optional amount of ephemeral storage to set for the instance
   * of the job. The amount specified as ephemeral storage, must not exceed the amount of `scale_memory_limit`. The
   * units for specifying ephemeral storage are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand
   * expressions for GB and MB. For more information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleMaxExecutionTime] - The maximum execution time in seconds for runs of the job. This
   * property can only be specified if `run_mode` is `task`.
   * @param {string} [params.scaleMemoryLimit] - Optional amount of memory set for the instance of the job. For valid
   * values see [Supported memory and CPU
   * combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
   * memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
   * information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {number} [params.scaleRetryLimit] - The number of times to rerun an instance of the job before the job is
   * marked as failed. This property can only be specified if `run_mode` is `task`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.JobRun>>}
   */
  public createJobRun(
    params: CodeEngineV2.CreateJobRunParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.JobRun>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = [
      'projectId',
      'imageReference',
      'imageSecret',
      'jobName',
      'name',
      'runArguments',
      'runAsUser',
      'runCommands',
      'runEnvVariables',
      'runMode',
      'runServiceAccount',
      'runVolumeMounts',
      'scaleArraySizeVariableOverride',
      'scaleArraySpec',
      'scaleCpuLimit',
      'scaleEphemeralStorageLimit',
      'scaleMaxExecutionTime',
      'scaleMemoryLimit',
      'scaleRetryLimit',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'image_reference': _params.imageReference,
      'image_secret': _params.imageSecret,
      'job_name': _params.jobName,
      'name': _params.name,
      'run_arguments': _params.runArguments,
      'run_as_user': _params.runAsUser,
      'run_commands': _params.runCommands,
      'run_env_variables': _params.runEnvVariables,
      'run_mode': _params.runMode,
      'run_service_account': _params.runServiceAccount,
      'run_volume_mounts': _params.runVolumeMounts,
      'scale_array_size_variable_override': _params.scaleArraySizeVariableOverride,
      'scale_array_spec': _params.scaleArraySpec,
      'scale_cpu_limit': _params.scaleCpuLimit,
      'scale_ephemeral_storage_limit': _params.scaleEphemeralStorageLimit,
      'scale_max_execution_time': _params.scaleMaxExecutionTime,
      'scale_memory_limit': _params.scaleMemoryLimit,
      'scale_retry_limit': _params.scaleRetryLimit,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createJobRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/job_runs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a job run.
   *
   * Display the details of a job run.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your job run.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.JobRun>>}
   */
  public getJobRun(
    params: CodeEngineV2.GetJobRunParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.JobRun>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getJobRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/job_runs/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a job run.
   *
   * Delete a job run.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your job run.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteJobRun(
    params: CodeEngineV2.DeleteJobRunParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteJobRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/job_runs/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * serviceBindings
   ************************/

  /**
   * List bindings.
   *
   * List all bindings in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of bindings per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.BindingList>>}
   */
  public listBindings(
    params: CodeEngineV2.ListBindingsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.BindingList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listBindings');

    const parameters = {
      options: {
        url: '/projects/{project_id}/bindings',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a binding.
   *
   * Create a binding. Creating a service binding with a Code Engine app will update the app, creating a new revision.
   * For more information see the
   * [documentaion](https://cloud.ibm.com/docs/codeengine?topic=codeengine-service-binding).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {ComponentRef} params.component - A reference to another component.
   * @param {string} params.prefix - Optional value that is set as prefix in the component that is bound. Will be
   * generated if not provided.
   * @param {string} params.secretName - The service access secret that is binding to a component.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Binding>>}
   */
  public createBinding(
    params: CodeEngineV2.CreateBindingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Binding>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'component', 'prefix', 'secretName'];
    const _validParams = ['projectId', 'component', 'prefix', 'secretName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'component': _params.component,
      'prefix': _params.prefix,
      'secret_name': _params.secretName,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createBinding');

    const parameters = {
      options: {
        url: '/projects/{project_id}/bindings',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a binding.
   *
   * Display the details of a binding.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.id - The id of your binding.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Binding>>}
   */
  public getBinding(
    params: CodeEngineV2.GetBindingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Binding>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getBinding');

    const parameters = {
      options: {
        url: '/projects/{project_id}/bindings/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a binding.
   *
   * Delete a binding.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.id - The id of your binding.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteBinding(
    params: CodeEngineV2.DeleteBindingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteBinding');

    const parameters = {
      options: {
        url: '/projects/{project_id}/bindings/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * builds
   ************************/

  /**
   * List builds.
   *
   * List all builds in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of builds per page.
   * @param {string} [params.start] - The token to continue traversing paginated list of builds.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.BuildList>>}
   */
  public listBuilds(
    params: CodeEngineV2.ListBuildsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.BuildList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listBuilds');

    const parameters = {
      options: {
        url: '/projects/{project_id}/builds',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a build.
   *
   * Create a build.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of the build. Use a name that is unique within the project.
   * @param {string} params.outputImage - The name of the image.
   * @param {string} params.outputSecret - The secret that is required to access the image registry. Make sure that the
   * secret is granted with push permissions towards the specified container registry namespace.
   * @param {string} params.strategyType - The strategy to use for building the image.
   * @param {string} [params.sourceContextDir] - Option directory in the repository that contains the buildpacks file or
   * the Dockerfile.
   * @param {string} [params.sourceRevision] - Commit, tag, or branch in the source repository to pull. This field is
   * optional if the `source_type` is `git` and uses the HEAD of default branch if not specified. If the `source_type`
   * value is `local`, this field must be omitted.
   * @param {string} [params.sourceSecret] - Name of the secret that is used access the repository source. This field is
   * optional if the `source_type` is `git`. Additionally, if the `source_url` points to a repository that requires
   * authentication, the build will be created but cannot access any source code, until this property is provided, too.
   * If the `source_type` value is `local`, this field must be omitted.
   * @param {string} [params.sourceType] - Specifies the type of source to determine if your build source is in a
   * repository or based on local source code.
   * * local - For builds from local source code.
   * * git - For builds from git version controlled source code.
   * @param {string} [params.sourceUrl] - The URL of the code repository. This field is required if the `source_type` is
   * `git`. If the `source_type` value is `local`, this field must be omitted. If the repository is publicly available
   * you can provide a 'https' URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication,
   * you need to provide a 'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points
   * to a secret of format `ssh_auth`.
   * @param {string} [params.strategySize] - Optional size for the build, which determines the amount of resources used.
   * Build sizes are `small`, `medium`, `large`, `xlarge`, `xxlarge`.
   * @param {string} [params.strategySpecFile] - Optional path to the specification file that is used for build
   * strategies for building an image.
   * @param {number} [params.timeout] - The maximum amount of time, in seconds, that can pass before the build must
   * succeed or fail.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Build>>}
   */
  public createBuild(
    params: CodeEngineV2.CreateBuildParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Build>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'outputImage', 'outputSecret', 'strategyType'];
    const _validParams = [
      'projectId',
      'name',
      'outputImage',
      'outputSecret',
      'strategyType',
      'sourceContextDir',
      'sourceRevision',
      'sourceSecret',
      'sourceType',
      'sourceUrl',
      'strategySize',
      'strategySpecFile',
      'timeout',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'output_image': _params.outputImage,
      'output_secret': _params.outputSecret,
      'strategy_type': _params.strategyType,
      'source_context_dir': _params.sourceContextDir,
      'source_revision': _params.sourceRevision,
      'source_secret': _params.sourceSecret,
      'source_type': _params.sourceType,
      'source_url': _params.sourceUrl,
      'strategy_size': _params.strategySize,
      'strategy_spec_file': _params.strategySpecFile,
      'timeout': _params.timeout,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createBuild');

    const parameters = {
      options: {
        url: '/projects/{project_id}/builds',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a build.
   *
   * Display the details of a build.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your build.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Build>>}
   */
  public getBuild(
    params: CodeEngineV2.GetBuildParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Build>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getBuild');

    const parameters = {
      options: {
        url: '/projects/{project_id}/builds/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a build.
   *
   * Delete a build.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your build.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteBuild(
    params: CodeEngineV2.DeleteBuildParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteBuild');

    const parameters = {
      options: {
        url: '/projects/{project_id}/builds/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a build.
   *
   * Update a build.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your build.
   * @param {string} params.ifMatch - Version of the build settings to be updated. Specify the version that you
   * retrieved as entity_tag (ETag header) when reading the build. This value helps identifying parallel usage of this
   * API. Pass * to indicate to update any version available. This might result in stale updates.
   * @param {string} [params.outputImage] - The name of the image.
   * @param {string} [params.outputSecret] - The secret that is required to access the image registry. Make sure that
   * the secret is granted with push permissions towards the specified container registry namespace.
   * @param {string} [params.sourceContextDir] - Option directory in the repository that contains the buildpacks file or
   * the Dockerfile.
   * @param {string} [params.sourceRevision] - Commit, tag, or branch in the source repository to pull. This field is
   * optional if the `source_type` is `git` and uses the HEAD of default branch if not specified. If the `source_type`
   * value is `local`, this field must be omitted.
   * @param {string} [params.sourceSecret] - Name of the secret that is used access the repository source. This field is
   * optional if the `source_type` is `git`. Additionally, if the `source_url` points to a repository that requires
   * authentication, the build will be created but cannot access any source code, until this property is provided, too.
   * If the `source_type` value is `local`, this field must be omitted.
   * @param {string} [params.sourceType] - Specifies the type of source to determine if your build source is in a
   * repository or based on local source code.
   * * local - For builds from local source code.
   * * git - For builds from git version controlled source code.
   * @param {string} [params.sourceUrl] - The URL of the code repository. This field is required if the `source_type` is
   * `git`. If the `source_type` value is `local`, this field must be omitted. If the repository is publicly available
   * you can provide a 'https' URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication,
   * you need to provide a 'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points
   * to a secret of format `ssh_auth`.
   * @param {string} [params.strategySize] - Optional size for the build, which determines the amount of resources used.
   * Build sizes are `small`, `medium`, `large`, `xlarge`, `xxlarge`.
   * @param {string} [params.strategySpecFile] - Optional path to the specification file that is used for build
   * strategies for building an image.
   * @param {string} [params.strategyType] - The strategy to use for building the image.
   * @param {number} [params.timeout] - The maximum amount of time, in seconds, that can pass before the build must
   * succeed or fail.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Build>>}
   */
  public updateBuild(
    params: CodeEngineV2.UpdateBuildParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Build>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'ifMatch'];
    const _validParams = [
      'projectId',
      'name',
      'ifMatch',
      'outputImage',
      'outputSecret',
      'sourceContextDir',
      'sourceRevision',
      'sourceSecret',
      'sourceType',
      'sourceUrl',
      'strategySize',
      'strategySpecFile',
      'strategyType',
      'timeout',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'output_image': _params.outputImage,
      'output_secret': _params.outputSecret,
      'source_context_dir': _params.sourceContextDir,
      'source_revision': _params.sourceRevision,
      'source_secret': _params.sourceSecret,
      'source_type': _params.sourceType,
      'source_url': _params.sourceUrl,
      'strategy_size': _params.strategySize,
      'strategy_spec_file': _params.strategySpecFile,
      'strategy_type': _params.strategyType,
      'timeout': _params.timeout,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'updateBuild');

    const parameters = {
      options: {
        url: '/projects/{project_id}/builds/{name}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List build runs.
   *
   * List all build runs in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} [params.buildName] - Optional name of the build that should be filtered for.
   * @param {number} [params.limit] - Optional maximum number of build runs per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.BuildRunList>>}
   */
  public listBuildRuns(
    params: CodeEngineV2.ListBuildRunsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.BuildRunList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'buildName', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'build_name': _params.buildName,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listBuildRuns');

    const parameters = {
      options: {
        url: '/projects/{project_id}/build_runs',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a build run.
   *
   * Create a build run.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} [params.buildName] - Optional name of the build on which this build run is based on. If specified,
   * the build run will inherit the configuration of the referenced build. If not specified, make sure to specify at
   * least the fields `strategy_type`, `source_url`, `output_image` and `output_secret` to describe the build run.
   * @param {string} [params.name] - Name of the build run. This field is optional, if the field `build_name` is
   * specified and its value will be generated like so: `[BUILD_NAME]-run-[timestamp with format: YYMMDD-hhmmss] if not
   * set.`.
   * @param {string} [params.outputImage] - The name of the image.
   * @param {string} [params.outputSecret] - The secret that is required to access the image registry. Make sure that
   * the secret is granted with push permissions towards the specified container registry namespace.
   * @param {string} [params.serviceAccount] - Optional service account which is used for resource control.
   * @param {string} [params.sourceContextDir] - Option directory in the repository that contains the buildpacks file or
   * the Dockerfile.
   * @param {string} [params.sourceRevision] - Commit, tag, or branch in the source repository to pull. This field is
   * optional if the `source_type` is `git` and uses the HEAD of default branch if not specified. If the `source_type`
   * value is `local`, this field must be omitted.
   * @param {string} [params.sourceSecret] - Name of the secret that is used access the repository source. This field is
   * optional if the `source_type` is `git`. Additionally, if the `source_url` points to a repository that requires
   * authentication, the build will be created but cannot access any source code, until this property is provided, too.
   * If the `source_type` value is `local`, this field must be omitted.
   * @param {string} [params.sourceType] - Specifies the type of source to determine if your build source is in a
   * repository or based on local source code.
   * * local - For builds from local source code.
   * * git - For builds from git version controlled source code.
   * @param {string} [params.sourceUrl] - The URL of the code repository. This field is required if the `source_type` is
   * `git`. If the `source_type` value is `local`, this field must be omitted. If the repository is publicly available
   * you can provide a 'https' URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication,
   * you need to provide a 'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points
   * to a secret of format `ssh_auth`.
   * @param {string} [params.strategySize] - Optional size for the build, which determines the amount of resources used.
   * Build sizes are `small`, `medium`, `large`, `xlarge`, `xxlarge`.
   * @param {string} [params.strategySpecFile] - Optional path to the specification file that is used for build
   * strategies for building an image.
   * @param {string} [params.strategyType] - The strategy to use for building the image.
   * @param {number} [params.timeout] - The maximum amount of time, in seconds, that can pass before the build must
   * succeed or fail.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.BuildRun>>}
   */
  public createBuildRun(
    params: CodeEngineV2.CreateBuildRunParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.BuildRun>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = [
      'projectId',
      'buildName',
      'name',
      'outputImage',
      'outputSecret',
      'serviceAccount',
      'sourceContextDir',
      'sourceRevision',
      'sourceSecret',
      'sourceType',
      'sourceUrl',
      'strategySize',
      'strategySpecFile',
      'strategyType',
      'timeout',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'build_name': _params.buildName,
      'name': _params.name,
      'output_image': _params.outputImage,
      'output_secret': _params.outputSecret,
      'service_account': _params.serviceAccount,
      'source_context_dir': _params.sourceContextDir,
      'source_revision': _params.sourceRevision,
      'source_secret': _params.sourceSecret,
      'source_type': _params.sourceType,
      'source_url': _params.sourceUrl,
      'strategy_size': _params.strategySize,
      'strategy_spec_file': _params.strategySpecFile,
      'strategy_type': _params.strategyType,
      'timeout': _params.timeout,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createBuildRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/build_runs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a build run.
   *
   * Display the details of a build run.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your build run.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.BuildRun>>}
   */
  public getBuildRun(
    params: CodeEngineV2.GetBuildRunParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.BuildRun>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getBuildRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/build_runs/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a build run.
   *
   * Delete a build run.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your build run.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteBuildRun(
    params: CodeEngineV2.DeleteBuildRunParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteBuildRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/build_runs/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * secretsAndConfigMaps
   ************************/

  /**
   * List config maps.
   *
   * List all config maps in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of config maps per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.ConfigMapList>>}
   */
  public listConfigMaps(
    params: CodeEngineV2.ListConfigMapsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.ConfigMapList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listConfigMaps');

    const parameters = {
      options: {
        url: '/projects/{project_id}/config_maps',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a config map.
   *
   * Create a config map.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of the configmap. Use a name that is unique within the project.
   * @param {JsonObject} [params.data] - The key-value pair for the config map. Values must be specified in `KEY=VALUE`
   * format. Each `KEY` field must consist of alphanumeric characters, `-`, `_` or `.` and must not be exceed a max
   * length of 253 characters. Each `VALUE` field can consists of any character and must not be exceed a max length of
   * 1048576 characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.ConfigMap>>}
   */
  public createConfigMap(
    params: CodeEngineV2.CreateConfigMapParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.ConfigMap>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'data', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'data': _params.data,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createConfigMap');

    const parameters = {
      options: {
        url: '/projects/{project_id}/config_maps',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a config map.
   *
   * Display the details of a config map.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your configmap.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.ConfigMap>>}
   */
  public getConfigMap(
    params: CodeEngineV2.GetConfigMapParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.ConfigMap>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getConfigMap');

    const parameters = {
      options: {
        url: '/projects/{project_id}/config_maps/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a config map.
   *
   * Update a config map.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your configmap.
   * @param {string} params.ifMatch - Version of the config map settings to be updated. Specify the version that you
   * retrieved as entity_tag (ETag header) when reading the config map. This value helps identifying parallel usage of
   * this API. Pass * to indicate to update any version available. This might result in stale updates.
   * @param {JsonObject} [params.data] - The key-value pair for the config map. Values must be specified in `KEY=VALUE`
   * format. Each `KEY` field must consist of alphanumeric characters, `-`, `_` or `.` and must not be exceed a max
   * length of 253 characters. Each `VALUE` field can consists of any character and must not be exceed a max length of
   * 1048576 characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.ConfigMap>>}
   */
  public replaceConfigMap(
    params: CodeEngineV2.ReplaceConfigMapParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.ConfigMap>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'ifMatch'];
    const _validParams = ['projectId', 'name', 'ifMatch', 'data', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'data': _params.data,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'replaceConfigMap');

    const parameters = {
      options: {
        url: '/projects/{project_id}/config_maps/{name}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a config map.
   *
   * Delete a config map.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your configmap.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteConfigMap(
    params: CodeEngineV2.DeleteConfigMapParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteConfigMap');

    const parameters = {
      options: {
        url: '/projects/{project_id}/config_maps/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List secrets.
   *
   * List all secrets in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of secrets per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.SecretList>>}
   */
  public listSecrets(
    params: CodeEngineV2.ListSecretsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.SecretList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listSecrets');

    const parameters = {
      options: {
        url: '/projects/{project_id}/secrets',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a secret.
   *
   * Create a secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.format - Specify the format of the secret. The format of the secret will determine how the
   * secret is used.
   * @param {string} params.name - The name of the secret.
   * @param {SecretData} [params.data] - Data container that allows to specify config parameters and their values as a
   * key-value map. Each key field must consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max
   * length of 253 characters. Each value field can consists of any character and must not exceed a max length of
   * 1048576 characters.
   * @param {ServiceAccessSecretPrototypeProps} [params.serviceAccess] - Properties for Service Access Secret
   * Prototypes.
   * @param {OperatorSecretPrototypeProps} [params.serviceOperator] - Properties for the IBM Cloud Operator Secret
   * Prototype.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Secret>>}
   */
  public createSecret(
    params: CodeEngineV2.CreateSecretParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Secret>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'format', 'name'];
    const _validParams = [
      'projectId',
      'format',
      'name',
      'data',
      'serviceAccess',
      'serviceOperator',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'format': _params.format,
      'name': _params.name,
      'data': _params.data,
      'service_access': _params.serviceAccess,
      'service_operator': _params.serviceOperator,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createSecret');

    const parameters = {
      options: {
        url: '/projects/{project_id}/secrets',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a secret.
   *
   * Get a secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Secret>>}
   */
  public getSecret(
    params: CodeEngineV2.GetSecretParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Secret>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getSecret');

    const parameters = {
      options: {
        url: '/projects/{project_id}/secrets/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a secret.
   *
   * Update a secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your secret.
   * @param {string} params.ifMatch - Version of the secret settings to be updated. Specify the version that you
   * retrieved as entity_tag (ETag header) when reading the secret. This value helps identifying parallel usage of this
   * API. Pass * to indicate to update any version available. This might result in stale updates.
   * @param {string} params.format - Specify the format of the secret. The format of the secret will determine how the
   * secret is used.
   * @param {SecretData} [params.data] - Data container that allows to specify config parameters and their values as a
   * key-value map. Each key field must consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max
   * length of 253 characters. Each value field can consists of any character and must not exceed a max length of
   * 1048576 characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Secret>>}
   */
  public replaceSecret(
    params: CodeEngineV2.ReplaceSecretParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Secret>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'ifMatch', 'format'];
    const _validParams = ['projectId', 'name', 'ifMatch', 'format', 'data', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'format': _params.format,
      'data': _params.data,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'replaceSecret');

    const parameters = {
      options: {
        url: '/projects/{project_id}/secrets/{name}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a secret.
   *
   * Delete a secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteSecret(
    params: CodeEngineV2.DeleteSecretParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSecret');

    const parameters = {
      options: {
        url: '/projects/{project_id}/secrets/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * domainMappings
   ************************/

  /**
   * List domain mappings.
   *
   * List all domain mappings in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of domain mappings per page.
   * @param {string} [params.start] - The token to continue traversing paginated list of domain mappings.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.DomainMappingList>>}
   */
  public listDomainMappings(
    params: CodeEngineV2.ListDomainMappingsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.DomainMappingList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listDomainMappings');

    const parameters = {
      options: {
        url: '/projects/{project_id}/domain_mappings',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a domain mapping.
   *
   * Create a domain mapping.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {ComponentRef} params.component - A reference to another component.
   * @param {string} params.name - The name of the domain mapping.
   * @param {string} params.tlsSecret - The name of the TLS secret that holds the certificate and private key of this
   * domain mapping.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>>}
   */
  public createDomainMapping(
    params: CodeEngineV2.CreateDomainMappingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'component', 'name', 'tlsSecret'];
    const _validParams = ['projectId', 'component', 'name', 'tlsSecret', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'component': _params.component,
      'name': _params.name,
      'tls_secret': _params.tlsSecret,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createDomainMapping'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/domain_mappings',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a domain mapping.
   *
   * Get domain mapping.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your domain mapping.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>>}
   */
  public getDomainMapping(
    params: CodeEngineV2.GetDomainMappingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getDomainMapping');

    const parameters = {
      options: {
        url: '/projects/{project_id}/domain_mappings/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a domain mapping.
   *
   * Delete a domain mapping.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your domain mapping.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteDomainMapping(
    params: CodeEngineV2.DeleteDomainMappingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteDomainMapping'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/domain_mappings/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a domain mapping.
   *
   * Update a domain mapping.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your domain mapping.
   * @param {string} params.ifMatch - Version of the domain mapping to be updated. Specify the version that you
   * retrieved as entity_tag (ETag header) when reading the domain mapping. This value helps identify parallel usage of
   * this API. Pass * to indicate to update any version available. This might result in stale updates.
   * @param {ComponentRef} [params.component] - A reference to another component.
   * @param {string} [params.tlsSecret] - The name of the TLS secret that holds the certificate and private key of this
   * domain mapping.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>>}
   */
  public updateDomainMapping(
    params: CodeEngineV2.UpdateDomainMappingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'ifMatch'];
    const _validParams = ['projectId', 'name', 'ifMatch', 'component', 'tlsSecret', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'component': _params.component,
      'tls_secret': _params.tlsSecret,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateDomainMapping'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/domain_mappings/{name}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace CodeEngineV2 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listProjects` operation. */
  export interface ListProjectsParams {
    /** Optional maximum number of projects per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. Any additional query
     *  parameters are ignored if a page token is present. If omitted, the first page of results is returned. This value
     *  is obtained from the 'start' query parameter in the `next` object of the operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProject` operation. */
  export interface CreateProjectParams {
    /** The name of the project. */
    name: string;
    /** Optional ID of the resource group for your project deployment. If this field is not defined, the default
     *  resource group of the account will be used.
     */
    resourceGroupId?: string;
    /** Optional list of labels to assign to your project. Tags are not part of the project resource that is
     *  returned by the server, but can be obtained and managed through the Global Tagging API in IBM Cloud. Find more
     *  information on [Global Tagging API docs](https://cloud.ibm.com/apidocs/tagging).
     */
    tags?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProject` operation. */
  export interface GetProjectParams {
    /** The ID of the project. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProject` operation. */
  export interface DeleteProjectParams {
    /** The ID of the project. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProjectEgressIps` operation. */
  export interface GetProjectEgressIpsParams {
    /** The ID of the project. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProjectStatusDetails` operation. */
  export interface GetProjectStatusDetailsParams {
    /** The ID of the project. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listApps` operation. */
  export interface ListAppsParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of apps per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createApp` operation. */
  export interface CreateAppParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of the image that is used for this app. The format is `REGISTRY/NAMESPACE/REPOSITORY:TAG` where
     *  `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the default is `docker.io`. If `TAG` is not
     *  specified, the default is `latest`. If the image reference points to a registry that requires authentication,
     *  make sure to also specify the property `image_secret`.
     */
    imageReference: string;
    /** The name of the app. Use a name that is unique within the project. */
    name: string;
    /** Optional port the app listens on. While the app will always be exposed via port `443` for end users, this
     *  port is used to connect to the port that is exposed by the container image.
     */
    imagePort?: number;
    /** Optional name of the image registry access secret. The image registry access secret is used to authenticate
     *  with a private registry when you download the container image. If the image reference points to a registry that
     *  requires authentication, the app will be created but cannot reach the ready status, until this property is
     *  provided, too.
     */
    imageSecret?: string;
    /** Optional value controlling which of the system managed domain mappings will be setup for the application.
     *  Valid values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the
     *  project supports application private visibility.
     */
    managedDomainMappings?: CreateAppConstants.ManagedDomainMappings | string;
    /** Request model for probes. */
    probeLiveness?: ProbePrototype;
    /** Request model for probes. */
    probeReadiness?: ProbePrototype;
    /** Optional arguments for the app that are passed to start the container. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    runArguments?: string[];
    /** Optional user ID (UID) to run the app (e.g., `1001`). */
    runAsUser?: number;
    /** Optional commands for the app that are passed to start the container. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional references to config maps, secrets or literal values that are exposed as environment variables
     *  within the running application.
     */
    runEnvVariables?: EnvVarPrototype[];
    /** Optional name of the service account. For built-in service accounts, you can use the shortened names
     *  `manager` , `none`, `reader`, and `writer`.
     */
    runServiceAccount?: CreateAppConstants.RunServiceAccount | string;
    /** Optional mounts of config maps or a secrets. */
    runVolumeMounts?: VolumeMountPrototype[];
    /** Optional maximum number of requests that can be processed concurrently per instance. */
    scaleConcurrency?: number;
    /** Optional threshold of concurrent requests per instance at which one or more additional instances are
     *  created. Use this value to scale up instances based on concurrent number of requests. This option defaults to
     *  the value of the `scale_concurrency` option, if not specified.
     */
    scaleConcurrencyTarget?: number;
    /** Optional number of CPU set for the instance of the app. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scaleCpuLimit?: string;
    /** Optional amount of time in seconds that delays the scale down behavior for an app instance. */
    scaleDownDelay?: number;
    /** Optional amount of ephemeral storage to set for the instance of the app. The amount specified as ephemeral
     *  storage, must not exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are
     *  Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information
     *  see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleEphemeralStorageLimit?: string;
    /** Optional initial number of instances that are created upon app creation or app update. */
    scaleInitialInstances?: number;
    /** Optional maximum number of instances for this app. If you set this value to `0`, this property does not set
     *  a upper scaling limit. However, the app scaling is still limited by the project quota for instances. See [Limits
     *  and quotas for Code Engine](https://cloud.ibm.com/docs/codeengine?topic=codeengine-limits).
     */
    scaleMaxInstances?: number;
    /** Optional amount of memory set for the instance of the app. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleMemoryLimit?: string;
    /** Optional minimum number of instances for this app. If you set this value to `0`, the app will scale down to
     *  zero, if not hit by any request for some time.
     */
    scaleMinInstances?: number;
    /** Optional amount of time in seconds that is allowed for a running app to respond to a request. */
    scaleRequestTimeout?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createApp` operation. */
  export namespace CreateAppConstants {
    /** Optional value controlling which of the system managed domain mappings will be setup for the application. Valid values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the project supports application private visibility. */
    export enum ManagedDomainMappings {
      LOCAL = 'local',
      LOCAL_PRIVATE = 'local_private',
      LOCAL_PUBLIC = 'local_public',
    }
    /** Optional name of the service account. For built-in service accounts, you can use the shortened names `manager` , `none`, `reader`, and `writer`. */
    export enum RunServiceAccount {
      DEFAULT = 'default',
      MANAGER = 'manager',
      READER = 'reader',
      WRITER = 'writer',
      NONE = 'none',
    }
  }

  /** Parameters for the `getApp` operation. */
  export interface GetAppParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteApp` operation. */
  export interface DeleteAppParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateApp` operation. */
  export interface UpdateAppParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    name: string;
    /** Version of the app settings to be updated. Specify the version that you retrieved as entity_tag (ETag
     *  header) when reading the app. This value helps identifying parallel usage of this API. Pass * to indicate to
     *  update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** Optional port the app listens on. While the app will always be exposed via port `443` for end users, this
     *  port is used to connect to the port that is exposed by the container image.
     */
    imagePort?: number;
    /** The name of the image that is used for this app. The format is `REGISTRY/NAMESPACE/REPOSITORY:TAG` where
     *  `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the default is `docker.io`. If `TAG` is not
     *  specified, the default is `latest`. If the image reference points to a registry that requires authentication,
     *  make sure to also specify the property `image_secret`.
     */
    imageReference?: string;
    /** Optional name of the image registry access secret. The image registry access secret is used to authenticate
     *  with a private registry when you download the container image. If the image reference points to a registry that
     *  requires authentication, the app will be created but cannot reach the ready status, until this property is
     *  provided, too.
     */
    imageSecret?: string;
    /** Optional value controlling which of the system managed domain mappings will be setup for the application.
     *  Valid values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the
     *  project supports application private visibility.
     */
    managedDomainMappings?: UpdateAppConstants.ManagedDomainMappings | string;
    /** Request model for probes. */
    probeLiveness?: ProbePrototype;
    /** Request model for probes. */
    probeReadiness?: ProbePrototype;
    /** Optional arguments for the app that are passed to start the container. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    runArguments?: string[];
    /** Optional user ID (UID) to run the app (e.g., `1001`). */
    runAsUser?: number;
    /** Optional commands for the app that are passed to start the container. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional references to config maps, secrets or literal values. */
    runEnvVariables?: EnvVarPrototype[];
    /** Optional name of the service account. For built-in service accounts, you can use the shortened names
     *  `manager` , `none`, `reader`, and `writer`.
     */
    runServiceAccount?: UpdateAppConstants.RunServiceAccount | string;
    /** Optional mounts of config maps or a secrets. In case this is provided, existing `run_volume_mounts` will be
     *  overwritten.
     */
    runVolumeMounts?: VolumeMountPrototype[];
    /** Optional maximum number of requests that can be processed concurrently per instance. */
    scaleConcurrency?: number;
    /** Optional threshold of concurrent requests per instance at which one or more additional instances are
     *  created. Use this value to scale up instances based on concurrent number of requests. This option defaults to
     *  the value of the `scale_concurrency` option, if not specified.
     */
    scaleConcurrencyTarget?: number;
    /** Optional number of CPU set for the instance of the app. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scaleCpuLimit?: string;
    /** Optional amount of time in seconds that delays the scale down behavior for an app instance. */
    scaleDownDelay?: number;
    /** Optional amount of ephemeral storage to set for the instance of the app. The amount specified as ephemeral
     *  storage, must not exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are
     *  Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information
     *  see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleEphemeralStorageLimit?: string;
    /** Optional initial number of instances that are created upon app creation or app update. */
    scaleInitialInstances?: number;
    /** Optional maximum number of instances for this app. If you set this value to `0`, this property does not set
     *  a upper scaling limit. However, the app scaling is still limited by the project quota for instances. See [Limits
     *  and quotas for Code Engine](https://cloud.ibm.com/docs/codeengine?topic=codeengine-limits).
     */
    scaleMaxInstances?: number;
    /** Optional amount of memory set for the instance of the app. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleMemoryLimit?: string;
    /** Optional minimum number of instances for this app. If you set this value to `0`, the app will scale down to
     *  zero, if not hit by any request for some time.
     */
    scaleMinInstances?: number;
    /** Optional amount of time in seconds that is allowed for a running app to respond to a request. */
    scaleRequestTimeout?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateApp` operation. */
  export namespace UpdateAppConstants {
    /** Optional value controlling which of the system managed domain mappings will be setup for the application. Valid values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the project supports application private visibility. */
    export enum ManagedDomainMappings {
      LOCAL = 'local',
      LOCAL_PRIVATE = 'local_private',
      LOCAL_PUBLIC = 'local_public',
    }
    /** Optional name of the service account. For built-in service accounts, you can use the shortened names `manager` , `none`, `reader`, and `writer`. */
    export enum RunServiceAccount {
      DEFAULT = 'default',
      MANAGER = 'manager',
      READER = 'reader',
      WRITER = 'writer',
      NONE = 'none',
    }
  }

  /** Parameters for the `listAppRevisions` operation. */
  export interface ListAppRevisionsParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    appName: string;
    /** Optional maximum number of apps per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAppRevision` operation. */
  export interface GetAppRevisionParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    appName: string;
    /** The name of your application revision. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAppRevision` operation. */
  export interface DeleteAppRevisionParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    appName: string;
    /** The name of your application revision. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listJobs` operation. */
  export interface ListJobsParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of jobs per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createJob` operation. */
  export interface CreateJobParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of the image that is used for this job. The format is `REGISTRY/NAMESPACE/REPOSITORY:TAG` where
     *  `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the default is `docker.io`. If `TAG` is not
     *  specified, the default is `latest`. If the image reference points to a registry that requires authentication,
     *  make sure to also specify the property `image_secret`.
     */
    imageReference: string;
    /** The name of the job. Use a name that is unique within the project. */
    name: string;
    /** The name of the image registry access secret. The image registry access secret is used to authenticate with
     *  a private registry when you download the container image. If the image reference points to a registry that
     *  requires authentication, the job / job runs will be created but submitted job runs will fail, until this
     *  property is provided, too. This property must not be set on a job run, which references a job template.
     */
    imageSecret?: string;
    /** Set arguments for the job that are passed to start job run containers. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    runArguments?: string[];
    /** The user ID (UID) to run the job (e.g., 1001). */
    runAsUser?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional references to config maps, secrets or literal values. */
    runEnvVariables?: EnvVarPrototype[];
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time`
     *  and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are
     *  restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
     */
    runMode?: CreateJobConstants.RunMode | string;
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`,
     *  `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template.
     */
    runServiceAccount?: CreateJobConstants.RunServiceAccount | string;
    /** Optional mounts of config maps or a secrets. */
    runVolumeMounts?: VolumeMountPrototype[];
    /** Define a custom set of array indices as comma-separated list containing single values and hyphen-separated
     *  ranges like `5,12-14,23,27`. Each instance can pick up its array index via environment variable `JOB_INDEX`. The
     *  number of unique array indices specified here determines the number of job instances to run.
     */
    scaleArraySpec?: string;
    /** Optional amount of CPU set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scaleCpuLimit?: string;
    /** Optional amount of ephemeral storage to set for the instance of the job. The amount specified as ephemeral
     *  storage, must not exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are
     *  Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information
     *  see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleEphemeralStorageLimit?: string;
    /** The maximum execution time in seconds for runs of the job. This property can only be specified if `run_mode`
     *  is `task`.
     */
    scaleMaxExecutionTime?: number;
    /** Optional amount of memory set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleMemoryLimit?: string;
    /** The number of times to rerun an instance of the job before the job is marked as failed. This property can
     *  only be specified if `run_mode` is `task`.
     */
    scaleRetryLimit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createJob` operation. */
  export namespace CreateJobConstants {
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time` and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed. */
    export enum RunMode {
      TASK = 'task',
      DAEMON = 'daemon',
    }
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`, `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template. */
    export enum RunServiceAccount {
      DEFAULT = 'default',
      MANAGER = 'manager',
      READER = 'reader',
      WRITER = 'writer',
      NONE = 'none',
    }
  }

  /** Parameters for the `getJob` operation. */
  export interface GetJobParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your job. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteJob` operation. */
  export interface DeleteJobParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your job. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateJob` operation. */
  export interface UpdateJobParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your job. */
    name: string;
    /** Version of the job settings to be updated. Specify the version that you retrieved as entity_tag (ETag
     *  header) when reading the job. This value helps identifying parallel usage of this API. Pass * to indicate to
     *  update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** The name of the image that is used for this job. The format is `REGISTRY/NAMESPACE/REPOSITORY:TAG` where
     *  `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the default is `docker.io`. If `TAG` is not
     *  specified, the default is `latest`. If the image reference points to a registry that requires authentication,
     *  make sure to also specify the property `image_secret`.
     */
    imageReference?: string;
    /** The name of the image registry access secret. The image registry access secret is used to authenticate with
     *  a private registry when you download the container image. If the image reference points to a registry that
     *  requires authentication, the job / job runs will be created but submitted job runs will fail, until this
     *  property is provided, too. This property must not be set on a job run, which references a job template.
     */
    imageSecret?: string;
    /** Set arguments for the job that are passed to start job run containers. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    runArguments?: string[];
    /** The user ID (UID) to run the job (e.g., 1001). */
    runAsUser?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional references to config maps, secrets or literal values. */
    runEnvVariables?: EnvVarPrototype[];
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time`
     *  and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are
     *  restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
     */
    runMode?: UpdateJobConstants.RunMode | string;
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`,
     *  `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template.
     */
    runServiceAccount?: UpdateJobConstants.RunServiceAccount | string;
    /** Optional mounts of config maps or a secrets. In case this is provided, existing `run_volume_mounts` will be
     *  overwritten.
     */
    runVolumeMounts?: VolumeMountPrototype[];
    /** Define a custom set of array indices as comma-separated list containing single values and hyphen-separated
     *  ranges like `5,12-14,23,27`. Each instance can pick up its array index via environment variable `JOB_INDEX`. The
     *  number of unique array indices specified here determines the number of job instances to run.
     */
    scaleArraySpec?: string;
    /** Optional amount of CPU set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scaleCpuLimit?: string;
    /** Optional amount of ephemeral storage to set for the instance of the job. The amount specified as ephemeral
     *  storage, must not exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are
     *  Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information
     *  see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleEphemeralStorageLimit?: string;
    /** The maximum execution time in seconds for runs of the job. This property can only be specified if `run_mode`
     *  is `task`.
     */
    scaleMaxExecutionTime?: number;
    /** Optional amount of memory set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleMemoryLimit?: string;
    /** The number of times to rerun an instance of the job before the job is marked as failed. This property can
     *  only be specified if `run_mode` is `task`.
     */
    scaleRetryLimit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateJob` operation. */
  export namespace UpdateJobConstants {
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time` and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed. */
    export enum RunMode {
      TASK = 'task',
      DAEMON = 'daemon',
    }
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`, `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template. */
    export enum RunServiceAccount {
      DEFAULT = 'default',
      MANAGER = 'manager',
      READER = 'reader',
      WRITER = 'writer',
      NONE = 'none',
    }
  }

  /** Parameters for the `listJobRuns` operation. */
  export interface ListJobRunsParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional name of the job that should be filtered for. */
    jobName?: string;
    /** Optional maximum number of job runs per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createJobRun` operation. */
  export interface CreateJobRunParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of the image that is used for this job. The format is `REGISTRY/NAMESPACE/REPOSITORY:TAG` where
     *  `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the default is `docker.io`. If `TAG` is not
     *  specified, the default is `latest`. If the image reference points to a registry that requires authentication,
     *  make sure to also specify the property `image_secret`.
     */
    imageReference?: string;
    /** The name of the image registry access secret. The image registry access secret is used to authenticate with
     *  a private registry when you download the container image. If the image reference points to a registry that
     *  requires authentication, the job / job runs will be created but submitted job runs will fail, until this
     *  property is provided, too. This property must not be set on a job run, which references a job template.
     */
    imageSecret?: string;
    /** Optional name of the job on which this job run is based on. If specified, the job run will inherit the
     *  configuration of the referenced job.
     */
    jobName?: string;
    /** The name of the job. Use a name that is unique within the project. */
    name?: string;
    /** Set arguments for the job that are passed to start job run containers. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    runArguments?: string[];
    /** The user ID (UID) to run the job (e.g., 1001). */
    runAsUser?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional references to config maps, secrets or literal values. */
    runEnvVariables?: EnvVarPrototype[];
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time`
     *  and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are
     *  restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
     */
    runMode?: CreateJobRunConstants.RunMode | string;
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`,
     *  `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template.
     */
    runServiceAccount?: CreateJobRunConstants.RunServiceAccount | string;
    /** Optional mounts of config maps or a secrets. */
    runVolumeMounts?: VolumeMountPrototype[];
    /** Optional value to override the JOB_ARRAY_SIZE environment variable for a job run. */
    scaleArraySizeVariableOverride?: number;
    /** Define a custom set of array indices as comma-separated list containing single values and hyphen-separated
     *  ranges like `5,12-14,23,27`. Each instance can pick up its array index via environment variable `JOB_INDEX`. The
     *  number of unique array indices specified here determines the number of job instances to run.
     */
    scaleArraySpec?: string;
    /** Optional amount of CPU set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scaleCpuLimit?: string;
    /** Optional amount of ephemeral storage to set for the instance of the job. The amount specified as ephemeral
     *  storage, must not exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are
     *  Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information
     *  see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleEphemeralStorageLimit?: string;
    /** The maximum execution time in seconds for runs of the job. This property can only be specified if `run_mode`
     *  is `task`.
     */
    scaleMaxExecutionTime?: number;
    /** Optional amount of memory set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleMemoryLimit?: string;
    /** The number of times to rerun an instance of the job before the job is marked as failed. This property can
     *  only be specified if `run_mode` is `task`.
     */
    scaleRetryLimit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createJobRun` operation. */
  export namespace CreateJobRunConstants {
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time` and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed. */
    export enum RunMode {
      TASK = 'task',
      DAEMON = 'daemon',
    }
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`, `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template. */
    export enum RunServiceAccount {
      DEFAULT = 'default',
      MANAGER = 'manager',
      READER = 'reader',
      WRITER = 'writer',
      NONE = 'none',
    }
  }

  /** Parameters for the `getJobRun` operation. */
  export interface GetJobRunParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your job run. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteJobRun` operation. */
  export interface DeleteJobRunParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your job run. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listBindings` operation. */
  export interface ListBindingsParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of bindings per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createBinding` operation. */
  export interface CreateBindingParams {
    /** The ID of the project. */
    projectId: string;
    /** A reference to another component. */
    component: ComponentRef;
    /** Optional value that is set as prefix in the component that is bound. Will be generated if not provided. */
    prefix: string;
    /** The service access secret that is binding to a component. */
    secretName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getBinding` operation. */
  export interface GetBindingParams {
    /** The ID of the project. */
    projectId: string;
    /** The id of your binding. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteBinding` operation. */
  export interface DeleteBindingParams {
    /** The ID of the project. */
    projectId: string;
    /** The id of your binding. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listBuilds` operation. */
  export interface ListBuildsParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of builds per page. */
    limit?: number;
    /** The token to continue traversing paginated list of builds. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createBuild` operation. */
  export interface CreateBuildParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of the build. Use a name that is unique within the project. */
    name: string;
    /** The name of the image. */
    outputImage: string;
    /** The secret that is required to access the image registry. Make sure that the secret is granted with push
     *  permissions towards the specified container registry namespace.
     */
    outputSecret: string;
    /** The strategy to use for building the image. */
    strategyType: string;
    /** Option directory in the repository that contains the buildpacks file or the Dockerfile. */
    sourceContextDir?: string;
    /** Commit, tag, or branch in the source repository to pull. This field is optional if the `source_type` is
     *  `git` and uses the HEAD of default branch if not specified. If the `source_type` value is `local`, this field
     *  must be omitted.
     */
    sourceRevision?: string;
    /** Name of the secret that is used access the repository source. This field is optional if the `source_type` is
     *  `git`. Additionally, if the `source_url` points to a repository that requires authentication, the build will be
     *  created but cannot access any source code, until this property is provided, too. If the `source_type` value is
     *  `local`, this field must be omitted.
     */
    sourceSecret?: string;
    /** Specifies the type of source to determine if your build source is in a repository or based on local source
     *  code.
     *  * local - For builds from local source code.
     *  * git - For builds from git version controlled source code.
     */
    sourceType?: CreateBuildConstants.SourceType | string;
    /** The URL of the code repository. This field is required if the `source_type` is `git`. If the `source_type`
     *  value is `local`, this field must be omitted. If the repository is publicly available you can provide a 'https'
     *  URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication, you need to provide a
     *  'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points to a secret of
     *  format `ssh_auth`.
     */
    sourceUrl?: string;
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`,
     *  `medium`, `large`, `xlarge`, `xxlarge`.
     */
    strategySize?: string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategySpecFile?: string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createBuild` operation. */
  export namespace CreateBuildConstants {
    /** Specifies the type of source to determine if your build source is in a repository or based on local source code. * local - For builds from local source code. * git - For builds from git version controlled source code. */
    export enum SourceType {
      LOCAL = 'local',
      GIT = 'git',
    }
  }

  /** Parameters for the `getBuild` operation. */
  export interface GetBuildParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your build. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteBuild` operation. */
  export interface DeleteBuildParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your build. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateBuild` operation. */
  export interface UpdateBuildParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your build. */
    name: string;
    /** Version of the build settings to be updated. Specify the version that you retrieved as entity_tag (ETag
     *  header) when reading the build. This value helps identifying parallel usage of this API. Pass * to indicate to
     *  update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** The name of the image. */
    outputImage?: string;
    /** The secret that is required to access the image registry. Make sure that the secret is granted with push
     *  permissions towards the specified container registry namespace.
     */
    outputSecret?: string;
    /** Option directory in the repository that contains the buildpacks file or the Dockerfile. */
    sourceContextDir?: string;
    /** Commit, tag, or branch in the source repository to pull. This field is optional if the `source_type` is
     *  `git` and uses the HEAD of default branch if not specified. If the `source_type` value is `local`, this field
     *  must be omitted.
     */
    sourceRevision?: string;
    /** Name of the secret that is used access the repository source. This field is optional if the `source_type` is
     *  `git`. Additionally, if the `source_url` points to a repository that requires authentication, the build will be
     *  created but cannot access any source code, until this property is provided, too. If the `source_type` value is
     *  `local`, this field must be omitted.
     */
    sourceSecret?: string;
    /** Specifies the type of source to determine if your build source is in a repository or based on local source
     *  code.
     *  * local - For builds from local source code.
     *  * git - For builds from git version controlled source code.
     */
    sourceType?: UpdateBuildConstants.SourceType | string;
    /** The URL of the code repository. This field is required if the `source_type` is `git`. If the `source_type`
     *  value is `local`, this field must be omitted. If the repository is publicly available you can provide a 'https'
     *  URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication, you need to provide a
     *  'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points to a secret of
     *  format `ssh_auth`.
     */
    sourceUrl?: string;
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`,
     *  `medium`, `large`, `xlarge`, `xxlarge`.
     */
    strategySize?: string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategySpecFile?: string;
    /** The strategy to use for building the image. */
    strategyType?: string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateBuild` operation. */
  export namespace UpdateBuildConstants {
    /** Specifies the type of source to determine if your build source is in a repository or based on local source code. * local - For builds from local source code. * git - For builds from git version controlled source code. */
    export enum SourceType {
      LOCAL = 'local',
      GIT = 'git',
    }
  }

  /** Parameters for the `listBuildRuns` operation. */
  export interface ListBuildRunsParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional name of the build that should be filtered for. */
    buildName?: string;
    /** Optional maximum number of build runs per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createBuildRun` operation. */
  export interface CreateBuildRunParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional name of the build on which this build run is based on. If specified, the build run will inherit the
     *  configuration of the referenced build. If not specified, make sure to specify at least the fields
     *  `strategy_type`, `source_url`, `output_image` and `output_secret` to describe the build run.
     */
    buildName?: string;
    /** Name of the build run. This field is optional, if the field `build_name` is specified and its value will be
     *  generated like so: `[BUILD_NAME]-run-[timestamp with format: YYMMDD-hhmmss] if not set.`.
     */
    name?: string;
    /** The name of the image. */
    outputImage?: string;
    /** The secret that is required to access the image registry. Make sure that the secret is granted with push
     *  permissions towards the specified container registry namespace.
     */
    outputSecret?: string;
    /** Optional service account which is used for resource control. */
    serviceAccount?: CreateBuildRunConstants.ServiceAccount | string;
    /** Option directory in the repository that contains the buildpacks file or the Dockerfile. */
    sourceContextDir?: string;
    /** Commit, tag, or branch in the source repository to pull. This field is optional if the `source_type` is
     *  `git` and uses the HEAD of default branch if not specified. If the `source_type` value is `local`, this field
     *  must be omitted.
     */
    sourceRevision?: string;
    /** Name of the secret that is used access the repository source. This field is optional if the `source_type` is
     *  `git`. Additionally, if the `source_url` points to a repository that requires authentication, the build will be
     *  created but cannot access any source code, until this property is provided, too. If the `source_type` value is
     *  `local`, this field must be omitted.
     */
    sourceSecret?: string;
    /** Specifies the type of source to determine if your build source is in a repository or based on local source
     *  code.
     *  * local - For builds from local source code.
     *  * git - For builds from git version controlled source code.
     */
    sourceType?: CreateBuildRunConstants.SourceType | string;
    /** The URL of the code repository. This field is required if the `source_type` is `git`. If the `source_type`
     *  value is `local`, this field must be omitted. If the repository is publicly available you can provide a 'https'
     *  URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication, you need to provide a
     *  'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points to a secret of
     *  format `ssh_auth`.
     */
    sourceUrl?: string;
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`,
     *  `medium`, `large`, `xlarge`, `xxlarge`.
     */
    strategySize?: string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategySpecFile?: string;
    /** The strategy to use for building the image. */
    strategyType?: string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createBuildRun` operation. */
  export namespace CreateBuildRunConstants {
    /** Optional service account which is used for resource control. */
    export enum ServiceAccount {
      DEFAULT = 'default',
      MANAGER = 'manager',
      READER = 'reader',
      WRITER = 'writer',
      NONE = 'none',
    }
    /** Specifies the type of source to determine if your build source is in a repository or based on local source code. * local - For builds from local source code. * git - For builds from git version controlled source code. */
    export enum SourceType {
      LOCAL = 'local',
      GIT = 'git',
    }
  }

  /** Parameters for the `getBuildRun` operation. */
  export interface GetBuildRunParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your build run. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteBuildRun` operation. */
  export interface DeleteBuildRunParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your build run. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigMaps` operation. */
  export interface ListConfigMapsParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of config maps per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createConfigMap` operation. */
  export interface CreateConfigMapParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of the configmap. Use a name that is unique within the project. */
    name: string;
    /** The key-value pair for the config map. Values must be specified in `KEY=VALUE` format. Each `KEY` field must
     *  consist of alphanumeric characters, `-`, `_` or `.` and must not be exceed a max length of 253 characters. Each
     *  `VALUE` field can consists of any character and must not be exceed a max length of 1048576 characters.
     */
    data?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfigMap` operation. */
  export interface GetConfigMapParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your configmap. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceConfigMap` operation. */
  export interface ReplaceConfigMapParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your configmap. */
    name: string;
    /** Version of the config map settings to be updated. Specify the version that you retrieved as entity_tag (ETag
     *  header) when reading the config map. This value helps identifying parallel usage of this API. Pass * to indicate
     *  to update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** The key-value pair for the config map. Values must be specified in `KEY=VALUE` format. Each `KEY` field must
     *  consist of alphanumeric characters, `-`, `_` or `.` and must not be exceed a max length of 253 characters. Each
     *  `VALUE` field can consists of any character and must not be exceed a max length of 1048576 characters.
     */
    data?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfigMap` operation. */
  export interface DeleteConfigMapParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your configmap. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecrets` operation. */
  export interface ListSecretsParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of secrets per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecret` operation. */
  export interface CreateSecretParams {
    /** The ID of the project. */
    projectId: string;
    /** Specify the format of the secret. The format of the secret will determine how the secret is used. */
    format: CreateSecretConstants.Format | string;
    /** The name of the secret. */
    name: string;
    /** Data container that allows to specify config parameters and their values as a key-value map. Each key field
     *  must consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max length of 253 characters.
     *  Each value field can consists of any character and must not exceed a max length of 1048576 characters.
     */
    data?: SecretData;
    /** Properties for Service Access Secret Prototypes. */
    serviceAccess?: ServiceAccessSecretPrototypeProps;
    /** Properties for the IBM Cloud Operator Secret Prototype. */
    serviceOperator?: OperatorSecretPrototypeProps;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSecret` operation. */
  export namespace CreateSecretConstants {
    /** Specify the format of the secret. The format of the secret will determine how the secret is used. */
    export enum Format {
      GENERIC = 'generic',
      SSH_AUTH = 'ssh_auth',
      BASIC_AUTH = 'basic_auth',
      TLS = 'tls',
      SERVICE_ACCESS = 'service_access',
      REGISTRY = 'registry',
      SERVICE_OPERATOR = 'service_operator',
      OTHER = 'other',
    }
  }

  /** Parameters for the `getSecret` operation. */
  export interface GetSecretParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your secret. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceSecret` operation. */
  export interface ReplaceSecretParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your secret. */
    name: string;
    /** Version of the secret settings to be updated. Specify the version that you retrieved as entity_tag (ETag
     *  header) when reading the secret. This value helps identifying parallel usage of this API. Pass * to indicate to
     *  update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** Specify the format of the secret. The format of the secret will determine how the secret is used. */
    format: ReplaceSecretConstants.Format | string;
    /** Data container that allows to specify config parameters and their values as a key-value map. Each key field
     *  must consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max length of 253 characters.
     *  Each value field can consists of any character and must not exceed a max length of 1048576 characters.
     */
    data?: SecretData;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceSecret` operation. */
  export namespace ReplaceSecretConstants {
    /** Specify the format of the secret. The format of the secret will determine how the secret is used. */
    export enum Format {
      GENERIC = 'generic',
      SSH_AUTH = 'ssh_auth',
      BASIC_AUTH = 'basic_auth',
      TLS = 'tls',
      SERVICE_ACCESS = 'service_access',
      REGISTRY = 'registry',
      SERVICE_OPERATOR = 'service_operator',
      OTHER = 'other',
    }
  }

  /** Parameters for the `deleteSecret` operation. */
  export interface DeleteSecretParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your secret. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDomainMappings` operation. */
  export interface ListDomainMappingsParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of domain mappings per page. */
    limit?: number;
    /** The token to continue traversing paginated list of domain mappings. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDomainMapping` operation. */
  export interface CreateDomainMappingParams {
    /** The ID of the project. */
    projectId: string;
    /** A reference to another component. */
    component: ComponentRef;
    /** The name of the domain mapping. */
    name: string;
    /** The name of the TLS secret that holds the certificate and private key of this domain mapping. */
    tlsSecret: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDomainMapping` operation. */
  export interface GetDomainMappingParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your domain mapping. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDomainMapping` operation. */
  export interface DeleteDomainMappingParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your domain mapping. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDomainMapping` operation. */
  export interface UpdateDomainMappingParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your domain mapping. */
    name: string;
    /** Version of the domain mapping to be updated. Specify the version that you retrieved as entity_tag (ETag
     *  header) when reading the domain mapping. This value helps identify parallel usage of this API. Pass * to
     *  indicate to update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** A reference to another component. */
    component?: ComponentRef;
    /** The name of the TLS secret that holds the certificate and private key of this domain mapping. */
    tlsSecret?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** App is the response model for app resources. */
  export interface App {
    /** Reference to a build that is associated with the application. */
    build?: string;
    /** Reference to a buildrun that is associated with the application. */
    build_run?: string;
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** Optional URL to invoke app. Depending on visibility this is accessible publicly or in the private network
     *  only. Empty in case 'managed_domain_mappings' is set to 'local'.
     */
    endpoint?: string;
    /** URL to app that is only visible within the project. */
    endpoint_internal?: string;
    /** The version of the app instance, which is used to achieve optimistic locking. */
    entity_tag: string;
    /** When you provision a new app,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** Optional port the app listens on. While the app will always be exposed via port `443` for end users, this
     *  port is used to connect to the port that is exposed by the container image.
     */
    image_port?: number;
    /** The name of the image that is used for this app. The format is `REGISTRY/NAMESPACE/REPOSITORY:TAG` where
     *  `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the default is `docker.io`. If `TAG` is not
     *  specified, the default is `latest`. If the image reference points to a registry that requires authentication,
     *  make sure to also specify the property `image_secret`.
     */
    image_reference: string;
    /** Optional name of the image registry access secret. The image registry access secret is used to authenticate
     *  with a private registry when you download the container image. If the image reference points to a registry that
     *  requires authentication, the app will be created but cannot reach the ready status, until this property is
     *  provided, too.
     */
    image_secret?: string;
    /** Optional value controlling which of the system managed domain mappings will be setup for the application.
     *  Valid values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the
     *  project supports application private visibility.
     */
    managed_domain_mappings: string;
    /** The name of the app. */
    name: string;
    /** Response model for probes. */
    probe_liveness?: Probe;
    /** Response model for probes. */
    probe_readiness?: Probe;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the app. */
    resource_type?: string;
    /** Optional arguments for the app that are passed to start the container. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    run_arguments: string[];
    /** Optional user ID (UID) to run the app (e.g., `1001`). */
    run_as_user?: number;
    /** Optional commands for the app that are passed to start the container. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    run_commands: string[];
    /** References to config maps, secrets or literal values, which are exposed as environment variables in the
     *  application.
     */
    run_env_variables: EnvVar[];
    /** Optional name of the service account. For built-in service accounts, you can use the shortened names
     *  `manager` , `none`, `reader`, and `writer`.
     */
    run_service_account?: string;
    /** Mounts of config maps or secrets. */
    run_volume_mounts: VolumeMount[];
    /** Optional maximum number of requests that can be processed concurrently per instance. */
    scale_concurrency?: number;
    /** Optional threshold of concurrent requests per instance at which one or more additional instances are
     *  created. Use this value to scale up instances based on concurrent number of requests. This option defaults to
     *  the value of the `scale_concurrency` option, if not specified.
     */
    scale_concurrency_target?: number;
    /** Optional number of CPU set for the instance of the app. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scale_cpu_limit: string;
    /** Optional amount of time in seconds that delays the scale down behavior for an app instance. */
    scale_down_delay?: number;
    /** Optional amount of ephemeral storage to set for the instance of the app. The amount specified as ephemeral
     *  storage, must not exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are
     *  Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information
     *  see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_ephemeral_storage_limit: string;
    /** Optional initial number of instances that are created upon app creation or app update. */
    scale_initial_instances?: number;
    /** Optional maximum number of instances for this app. If you set this value to `0`, this property does not set
     *  a upper scaling limit. However, the app scaling is still limited by the project quota for instances. See [Limits
     *  and quotas for Code Engine](https://cloud.ibm.com/docs/codeengine?topic=codeengine-limits).
     */
    scale_max_instances: number;
    /** Optional amount of memory set for the instance of the app. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_memory_limit: string;
    /** Optional minimum number of instances for this app. If you set this value to `0`, the app will scale down to
     *  zero, if not hit by any request for some time.
     */
    scale_min_instances: number;
    /** Optional amount of time in seconds that is allowed for a running app to respond to a request. */
    scale_request_timeout: number;
    /** The current status of the app. */
    status?: string;
    /** The detailed status of the application. */
    status_details?: AppStatus;
  }

  /** Contains a list of apps and pagination information. */
  export interface AppList {
    /** List of all apps. */
    apps: App[];
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /** AppRevision is the response model for app revision resources. */
  export interface AppRevision {
    /** Name of the associated app. */
    app_name?: string;
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** When you provision a new revision,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** Optional port the app listens on. While the app will always be exposed via port `443` for end users, this
     *  port is used to connect to the port that is exposed by the container image.
     */
    image_port?: number;
    /** The name of the image that is used for this app. The format is `REGISTRY/NAMESPACE/REPOSITORY:TAG` where
     *  `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the default is `docker.io`. If `TAG` is not
     *  specified, the default is `latest`. If the image reference points to a registry that requires authentication,
     *  make sure to also specify the property `image_secret`.
     */
    image_reference: string;
    /** Optional name of the image registry access secret. The image registry access secret is used to authenticate
     *  with a private registry when you download the container image. If the image reference points to a registry that
     *  requires authentication, the app will be created but cannot reach the ready status, until this property is
     *  provided, too.
     */
    image_secret?: string;
    /** The name of the app revison. */
    name?: string;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the app revision. */
    resource_type?: string;
    /** Optional arguments for the app that are passed to start the container. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    run_arguments: string[];
    /** Optional user ID (UID) to run the app (e.g., `1001`). */
    run_as_user?: number;
    /** Optional commands for the app that are passed to start the container. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    run_commands: string[];
    /** References to config maps, secrets or literal values, which are exposed as environment variables in the
     *  application.
     */
    run_env_variables: EnvVar[];
    /** Optional name of the service account. For built-in service accounts, you can use the shortened names
     *  `manager` , `none`, `reader`, and `writer`.
     */
    run_service_account?: string;
    /** Mounts of config maps or secrets. */
    run_volume_mounts: VolumeMount[];
    /** Optional maximum number of requests that can be processed concurrently per instance. */
    scale_concurrency?: number;
    /** Optional threshold of concurrent requests per instance at which one or more additional instances are
     *  created. Use this value to scale up instances based on concurrent number of requests. This option defaults to
     *  the value of the `scale_concurrency` option, if not specified.
     */
    scale_concurrency_target?: number;
    /** Optional number of CPU set for the instance of the app. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scale_cpu_limit: string;
    /** Optional amount of time in seconds that delays the scale down behavior for an app instance. */
    scale_down_delay?: number;
    /** Optional amount of ephemeral storage to set for the instance of the app. The amount specified as ephemeral
     *  storage, must not exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are
     *  Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information
     *  see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_ephemeral_storage_limit: string;
    /** Optional initial number of instances that are created upon app creation or app update. */
    scale_initial_instances?: number;
    /** Optional maximum number of instances for this app. If you set this value to `0`, this property does not set
     *  a upper scaling limit. However, the app scaling is still limited by the project quota for instances. See [Limits
     *  and quotas for Code Engine](https://cloud.ibm.com/docs/codeengine?topic=codeengine-limits).
     */
    scale_max_instances: number;
    /** Optional amount of memory set for the instance of the app. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_memory_limit: string;
    /** Optional minimum number of instances for this app. If you set this value to `0`, the app will scale down to
     *  zero, if not hit by any request for some time.
     */
    scale_min_instances: number;
    /** Optional amount of time in seconds that is allowed for a running app to respond to a request. */
    scale_request_timeout: number;
    /** The current status of the app revision. */
    status?: string;
    /** The detailed status of the application revision. */
    status_details?: AppRevisionStatus;
  }

  /** Contains a list of app revisions and pagination information. */
  export interface AppRevisionList {
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
    /** List of all app revisions. */
    revisions: AppRevision[];
  }

  /** The detailed status of the application revision. */
  export interface AppRevisionStatus {
    /** The number of running instances of the revision. */
    actual_instances?: number;
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: string;
  }

  /** The detailed status of the application. */
  export interface AppStatus {
    /** Latest app revision that has been created. */
    latest_created_revision?: string;
    /** Latest app revision that reached a ready state. */
    latest_ready_revision?: string;
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: string;
  }

  /** Describes the model of a binding. */
  export interface Binding {
    /** A reference to another component. */
    component: ComponentRef;
    /** When you provision a new binding,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The ID of the binding. */
    id?: string;
    /** The value that is set as prefix in the component that is bound. */
    prefix: string;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The type of the binding. */
    resource_type?: string;
    /** The service access secret that is bound to a component. */
    secret_name: string;
    /** The current status of the binding. */
    status?: string;
  }

  /** Contains a list of bindings and pagination information. */
  export interface BindingList {
    /** List of all bindings. */
    bindings: Binding[];
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /** Response model for build definitions. */
  export interface Build {
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** The version of the build instance, which is used to achieve optimistic locking. */
    entity_tag: string;
    /** When you provision a new build,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the build. */
    name?: string;
    /** The name of the image. */
    output_image: string;
    /** The secret that is required to access the image registry. Make sure that the secret is granted with push
     *  permissions towards the specified container registry namespace.
     */
    output_secret: string;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the build. */
    resource_type?: string;
    /** Option directory in the repository that contains the buildpacks file or the Dockerfile. */
    source_context_dir?: string;
    /** Commit, tag, or branch in the source repository to pull. This field is optional if the `source_type` is
     *  `git` and uses the HEAD of default branch if not specified. If the `source_type` value is `local`, this field
     *  must be omitted.
     */
    source_revision?: string;
    /** Name of the secret that is used access the repository source. This field is optional if the `source_type` is
     *  `git`. Additionally, if the `source_url` points to a repository that requires authentication, the build will be
     *  created but cannot access any source code, until this property is provided, too. If the `source_type` value is
     *  `local`, this field must be omitted.
     */
    source_secret?: string;
    /** Specifies the type of source to determine if your build source is in a repository or based on local source
     *  code.
     *  * local - For builds from local source code.
     *  * git - For builds from git version controlled source code.
     */
    source_type: string;
    /** The URL of the code repository. This field is required if the `source_type` is `git`. If the `source_type`
     *  value is `local`, this field must be omitted. If the repository is publicly available you can provide a 'https'
     *  URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication, you need to provide a
     *  'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points to a secret of
     *  format `ssh_auth`.
     */
    source_url?: string;
    /** The current status of the build. */
    status?: string;
    /** The detailed status of the build. */
    status_details?: BuildStatus;
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`,
     *  `medium`, `large`, `xlarge`, `xxlarge`.
     */
    strategy_size: string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategy_spec_file?: string;
    /** The strategy to use for building the image. */
    strategy_type: string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
  }

  /** Contains a list of builds and pagination information. */
  export interface BuildList {
    /** List of all builds. */
    builds: Build[];
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /** Response model for build run objects. */
  export interface BuildRun {
    /** Optional name of the build on which this build run is based on. If specified, the build run will inherit the
     *  configuration of the referenced build. If not specified, make sure to specify at least the fields
     *  `strategy_type`, `source_url`, `output_image` and `output_secret` to describe the build run.
     */
    build_name: string;
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** When you trigger a new build run,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the build run. */
    name: string;
    /** The name of the image. */
    output_image?: string;
    /** The secret that is required to access the image registry. Make sure that the secret is granted with push
     *  permissions towards the specified container registry namespace.
     */
    output_secret?: string;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the build run. */
    resource_type?: string;
    /** Optional service account which is used for resource control. */
    service_account?: string;
    /** Option directory in the repository that contains the buildpacks file or the Dockerfile. */
    source_context_dir?: string;
    /** Commit, tag, or branch in the source repository to pull. This field is optional if the `source_type` is
     *  `git` and uses the HEAD of default branch if not specified. If the `source_type` value is `local`, this field
     *  must be omitted.
     */
    source_revision?: string;
    /** Name of the secret that is used access the repository source. This field is optional if the `source_type` is
     *  `git`. Additionally, if the `source_url` points to a repository that requires authentication, the build will be
     *  created but cannot access any source code, until this property is provided, too. If the `source_type` value is
     *  `local`, this field must be omitted.
     */
    source_secret?: string;
    /** Specifies the type of source to determine if your build source is in a repository or based on local source
     *  code.
     *  * local - For builds from local source code.
     *  * git - For builds from git version controlled source code.
     */
    source_type?: string;
    /** The URL of the code repository. This field is required if the `source_type` is `git`. If the `source_type`
     *  value is `local`, this field must be omitted. If the repository is publicly available you can provide a 'https'
     *  URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication, you need to provide a
     *  'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points to a secret of
     *  format `ssh_auth`.
     */
    source_url?: string;
    /** The current status of the build run. */
    status?: string;
    /** Current status condition of a build run. */
    status_details?: BuildRunStatus;
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`,
     *  `medium`, `large`, `xlarge`, `xxlarge`.
     */
    strategy_size?: string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategy_spec_file?: string;
    /** The strategy to use for building the image. */
    strategy_type?: string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
  }

  /** Contains a list of build runs and pagination information. */
  export interface BuildRunList {
    /** List of all build runs. */
    build_runs: BuildRun[];
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /** Current status condition of a build run. */
  export interface BuildRunStatus {
    /** Time the build run completed. */
    completion_time?: string;
    /** Describes the time the build run completed. */
    output_digest?: string;
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: string;
    /** Time the build run started. */
    start_time?: string;
  }

  /** The detailed status of the build. */
  export interface BuildStatus {
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: string;
  }

  /** A reference to another component. */
  export interface ComponentRef {
    /** The name of the referenced component. */
    name: string;
    /** The type of the referenced resource. */
    resource_type: string;
  }

  /** Describes the model of a configmap. */
  export interface ConfigMap {
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** The key-value pair for the config map. Values must be specified in `KEY=VALUE` format. */
    data?: JsonObject;
    /** The version of the config map instance, which is used to achieve optimistic locking. */
    entity_tag: string;
    /** When you provision a new config map,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the config map. */
    name: string;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the config map. */
    resource_type?: string;
  }

  /** Contains a list of configmaps and pagination information. */
  export interface ConfigMapList {
    /** List of all configmaps. */
    config_maps: ConfigMap[];
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /** Response model for domain mapping definitions. */
  export interface DomainMapping {
    /** Exposes the value of the CNAME record that needs to be configured in the DNS settings of the domain, to
     *  route traffic properly to the target Code Engine region.
     */
    cname_target?: string;
    /** A reference to another component. */
    component: ComponentRef;
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** The version of the domain mapping instance, which is used to achieve optimistic locking. */
    entity_tag: string;
    /** When you provision a new domain mapping, a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the domain mapping. */
    name: string;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the CE Resource. */
    resource_type?: string;
    /** The current status of the domain mapping. */
    status?: string;
    /** The detailed status of the domain mapping. */
    status_details?: DomainMappingStatus;
    /** The name of the TLS secret that holds the certificate and private key of this domain mapping. */
    tls_secret: string;
    /** Exposes whether the domain mapping is managed by the user or by Code Engine. */
    user_managed?: boolean;
    /** Exposes whether the domain mapping is reachable through the public internet, or private IBM network, or only
     *  through other components within the same Code Engine project.
     */
    visibility?: string;
  }

  /** Contains a list of domain mappings and pagination information. */
  export interface DomainMappingList {
    /** List of all domain mappings. */
    domain_mappings: DomainMapping[];
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /** The detailed status of the domain mapping. */
  export interface DomainMappingStatus {
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: string;
  }

  /** Response model for environment variables. */
  export interface EnvVar {
    /** The key to reference as environment variable. */
    key?: string;
    /** The name of the environment variable. */
    name?: string;
    /** A prefix that can be added to all keys of a full secret or config map reference. */
    prefix?: string;
    /** The name of the secret or config map. */
    reference?: string;
    /** Specify the type of the environment variable. */
    type: string;
    /** The literal value of the environment variable. */
    value?: string;
  }

  /** Prototype model for environment variables. */
  export interface EnvVarPrototype {
    /** The key to reference as environment variable. */
    key?: string;
    /** The name of the environment variable. */
    name?: string;
    /** A prefix that can be added to all keys of a full secret or config map reference. */
    prefix?: string;
    /** The name of the secret or config map. */
    reference?: string;
    /** Specify the type of the environment variable. */
    type?: string;
    /** The literal value of the environment variable. */
    value?: string;
  }

  /** Job is the response model for job resources. */
  export interface Job {
    /** Reference to a build that is associated with the job. */
    build?: string;
    /** Reference to a buildrun that is associated with the job. */
    build_run?: string;
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** The version of the job instance, which is used to achieve optimistic locking. */
    entity_tag: string;
    /** When you provision a new job,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the image that is used for this job. The format is `REGISTRY/NAMESPACE/REPOSITORY:TAG` where
     *  `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the default is `docker.io`. If `TAG` is not
     *  specified, the default is `latest`. If the image reference points to a registry that requires authentication,
     *  make sure to also specify the property `image_secret`.
     */
    image_reference: string;
    /** The name of the image registry access secret. The image registry access secret is used to authenticate with
     *  a private registry when you download the container image. If the image reference points to a registry that
     *  requires authentication, the job / job runs will be created but submitted job runs will fail, until this
     *  property is provided, too. This property must not be set on a job run, which references a job template.
     */
    image_secret?: string;
    /** The name of the job. */
    name: string;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the job. */
    resource_type?: string;
    /** Set arguments for the job that are passed to start job run containers. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    run_arguments: string[];
    /** The user ID (UID) to run the job (e.g., 1001). */
    run_as_user?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    run_commands: string[];
    /** References to config maps, secrets or literal values, which are exposed as environment variables in the job
     *  run.
     */
    run_env_variables: EnvVar[];
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time`
     *  and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are
     *  restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
     */
    run_mode: string;
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`,
     *  `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template.
     */
    run_service_account?: string;
    /** Optional mounts of config maps or a secrets. */
    run_volume_mounts: VolumeMount[];
    /** Define a custom set of array indices as comma-separated list containing single values and hyphen-separated
     *  ranges like `5,12-14,23,27`. Each instance can pick up its array index via environment variable `JOB_INDEX`. The
     *  number of unique array indices specified here determines the number of job instances to run.
     */
    scale_array_spec: string;
    /** Optional amount of CPU set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scale_cpu_limit: string;
    /** Optional amount of ephemeral storage to set for the instance of the job. The amount specified as ephemeral
     *  storage, must not exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are
     *  Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information
     *  see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_ephemeral_storage_limit: string;
    /** The maximum execution time in seconds for runs of the job. This property can only be specified if `run_mode`
     *  is `task`.
     */
    scale_max_execution_time?: number;
    /** Optional amount of memory set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_memory_limit: string;
    /** The number of times to rerun an instance of the job before the job is marked as failed. This property can
     *  only be specified if `run_mode` is `task`.
     */
    scale_retry_limit?: number;
  }

  /** Contains a list of jobs and pagination information. */
  export interface JobList {
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** List of all jobs. */
    jobs: Job[];
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /** Response model for job run resources. */
  export interface JobRun {
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** When you provision a new job run,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the image that is used for this job. The format is `REGISTRY/NAMESPACE/REPOSITORY:TAG` where
     *  `REGISTRY` and `TAG` are optional. If `REGISTRY` is not specified, the default is `docker.io`. If `TAG` is not
     *  specified, the default is `latest`. If the image reference points to a registry that requires authentication,
     *  make sure to also specify the property `image_secret`.
     */
    image_reference?: string;
    /** The name of the image registry access secret. The image registry access secret is used to authenticate with
     *  a private registry when you download the container image. If the image reference points to a registry that
     *  requires authentication, the job / job runs will be created but submitted job runs will fail, until this
     *  property is provided, too. This property must not be set on a job run, which references a job template.
     */
    image_secret?: string;
    /** Optional name of the job reference of this job run. If specified, the job run will inherit the configuration
     *  of the referenced job.
     */
    job_name?: string;
    /** The name of the job run. */
    name?: string;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the job run. */
    resource_type?: string;
    /** Set arguments for the job that are passed to start job run containers. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    run_arguments: string[];
    /** The user ID (UID) to run the job (e.g., 1001). */
    run_as_user?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    run_commands: string[];
    /** References to config maps, secrets or literal values, which are exposed as environment variables in the job
     *  run.
     */
    run_env_variables: EnvVar[];
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time`
     *  and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are
     *  restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
     */
    run_mode?: string;
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`,
     *  `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template.
     */
    run_service_account?: string;
    /** Optional mounts of config maps or a secrets. */
    run_volume_mounts: VolumeMount[];
    /** Optional value to override the JOB_ARRAY_SIZE environment variable for a job run. */
    scale_array_size_variable_override?: number;
    /** Define a custom set of array indices as comma-separated list containing single values and hyphen-separated
     *  ranges like `5,12-14,23,27`. Each instance can pick up its array index via environment variable `JOB_INDEX`. The
     *  number of unique array indices specified here determines the number of job instances to run.
     */
    scale_array_spec?: string;
    /** Optional amount of CPU set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scale_cpu_limit?: string;
    /** Optional amount of ephemeral storage to set for the instance of the job. The amount specified as ephemeral
     *  storage, must not exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are
     *  Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information
     *  see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_ephemeral_storage_limit?: string;
    /** The maximum execution time in seconds for runs of the job. This property can only be specified if `run_mode`
     *  is `task`.
     */
    scale_max_execution_time?: number;
    /** Optional amount of memory set for the instance of the job. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_memory_limit?: string;
    /** The number of times to rerun an instance of the job before the job is marked as failed. This property can
     *  only be specified if `run_mode` is `task`.
     */
    scale_retry_limit?: number;
    /** The current status of the job run. */
    status?: string;
    /** The detailed status of the job run. */
    status_details?: JobRunStatus;
  }

  /** Contains a list of job runs and pagination information. */
  export interface JobRunList {
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** List of all jobs. */
    job_runs: JobRun[];
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /** The detailed status of the job run. */
  export interface JobRunStatus {
    /** Time the job run completed. */
    completion_time?: string;
    /** Number of failed job run instances. */
    failed?: number;
    /** Number of pending job run instances. */
    pending?: number;
    /** Number of requested job run instances. */
    requested?: number;
    /** Number of running job run instances. */
    running?: number;
    /** Time the job run started. */
    start_time?: string;
    /** Number of succeeded job run instances. */
    succeeded?: number;
    /** Number of job run instances with unknown state. */
    unknown?: number;
  }

  /** Describes properties needed to retrieve the first page of a result list. */
  export interface ListFirstMetadata {
    /** Href that points to the first page. */
    href?: string;
  }

  /** Describes properties needed to retrieve the next page of a result list. */
  export interface ListNextMetadata {
    /** Href that points to the next page. */
    href?: string;
    /** Token. */
    start?: string;
  }

  /** Properties for the IBM Cloud Operator Secret. */
  export interface OperatorSecretProps {
    /** The ID of the apikey associated with the operator secret. */
    apikey_id: string;
    /** The list of resource groups (by ID) that the operator secret can bind services in. */
    resource_group_ids: string[];
    /** A reference to a Service ID. */
    serviceid: ServiceIDRef;
    /** Specifies whether the operator secret is user managed. */
    user_managed: boolean;
  }

  /** Properties for the IBM Cloud Operator Secret Prototype. */
  export interface OperatorSecretPrototypeProps {
    /** The list of resource groups (by ID) that the operator secret can bind services in. */
    resource_group_ids?: string[];
    /** A reference to the Service ID. */
    serviceid?: ServiceIDRefPrototype;
  }

  /** Response model for probes. */
  export interface Probe {
    /** The number of consecutive, unsuccessful checks for the probe to be considered failed. */
    failure_threshold?: number;
    /** The amount of time in seconds to wait before the first probe check is performed. */
    initial_delay?: number;
    /** The amount of time in seconds between probe checks. */
    interval?: number;
    /** The path of the HTTP request to the resource. A path is only supported for a probe with a `type` of `http`. */
    path?: string;
    /** The port on which to probe the resource. */
    port?: number;
    /** The amount of time in seconds that the probe waits for a response from the application before it times out
     *  and fails.
     */
    timeout?: number;
    /** Specifies whether to use HTTP or TCP for the probe checks. The default is TCP. */
    type?: string;
  }

  /** Request model for probes. */
  export interface ProbePrototype {
    /** The number of consecutive, unsuccessful checks for the probe to be considered failed. */
    failure_threshold?: number;
    /** The amount of time in seconds to wait before the first probe check is performed. */
    initial_delay?: number;
    /** The amount of time in seconds between probe checks. */
    interval?: number;
    /** The path of the HTTP request to the resource. A path is only supported for a probe with a `type` of `http`. */
    path?: string;
    /** The port on which to probe the resource. */
    port?: number;
    /** The amount of time in seconds that the probe waits for a response from the application before it times out
     *  and fails.
     */
    timeout?: number;
    /** Specifies whether to use HTTP or TCP for the probe checks. The default is TCP. */
    type?: string;
  }

  /** Describes the model of a project. */
  export interface Project {
    /** An alphanumeric value identifying the account ID. */
    account_id?: string;
    /** The timestamp when the project was created. */
    created_at?: string;
    /** The CRN of the project. */
    crn?: string;
    /** When you provision a new resource, a URL is created identifying the location of the instance. */
    href?: string;
    /** The ID of the project. */
    id?: string;
    /** The name of the project. */
    name: string;
    /** The region for your project deployment. Possible values: 'au-syd', 'br-sao', 'ca-tor', 'eu-de', 'eu-gb',
     *  'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The ID of the resource group. */
    resource_group_id: string;
    /** The type of the project. */
    resource_type?: string;
    /** The current state of the project. For example, if the project is created and ready to get used, it will
     *  return active.
     */
    status?: string;
  }

  /** Describes the model of egress IP addresses. */
  export interface ProjectEgressIPAddresses {
    /** List of IBM private network IP addresses. */
    private?: string[];
    /** List of public IP addresses. */
    public?: string[];
  }

  /** Contains a list of projects and pagination information. */
  export interface ProjectList {
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
    /** List of projects. */
    projects: Project[];
  }

  /** Describes the model of a project status details. */
  export interface ProjectStatusDetails {
    /** Status of the domain created for the project. */
    domain: string;
    /** Defines whether a project is enabled for management and consumption. */
    project: string;
  }

  /** The service credential associated with the secret. */
  export interface ResourceKeyRef {
    /** ID of the service credential associated with the secret. */
    id?: string;
    /** Name of the service credential associated with the secret. */
    name?: string;
  }

  /** The service credential associated with the secret. */
  export interface ResourceKeyRefPrototype {
    /** ID of the service credential associated with the secret. */
    id?: string;
  }

  /** A reference to the Role and Role CRN for service binding. */
  export interface RoleRef {
    /** CRN of the IAM Role for this service access secret. */
    crn?: string;
    /** Role of the service credential. */
    name?: string;
  }

  /** A reference to the Role and Role CRN for service binding. */
  export interface RoleRefPrototype {
    /** CRN of the IAM Role for this service access secret. */
    crn?: string;
  }

  /** Describes the model of a secret. */
  export interface Secret {
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** Data container that allows to specify config parameters and their values as a key-value map. Each key field
     *  must consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max length of 253 characters.
     *  Each value field can consists of any character and must not exceed a max length of 1048576 characters.
     */
    data?: JsonObject;
    /** The version of the secret instance, which is used to achieve optimistic locking. */
    entity_tag: string;
    /** Specify the format of the secret. */
    format?: string;
    /** When you provision a new secret,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the secret. */
    name: string;
    /** The ID of the project the resource is located in. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the secret. */
    resource_type?: string;
    /** Properties for Service Access Secrets. */
    service_access?: ServiceAccessSecretProps;
    /** Properties for the IBM Cloud Operator Secret. */
    service_operator?: OperatorSecretProps;
  }

  /** Data container that allows to specify config parameters and their values as a key-value map. Each key field must consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max length of 253 characters. Each value field can consists of any character and must not exceed a max length of 1048576 characters. */
  export interface SecretData {
    /** SecretData accepts additional properties. */
    [propName: string]: any;
  }

  /** List of secret resources. */
  export interface SecretList {
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
    /** List of Secrets. */
    secrets: Secret[];
  }

  /** Properties for Service Access Secrets. */
  export interface ServiceAccessSecretProps {
    /** The service credential associated with the secret. */
    resource_key: ResourceKeyRef;
    /** A reference to the Role and Role CRN for service binding. */
    role?: RoleRef;
    /** The IBM Cloud service instance associated with the secret. */
    service_instance: ServiceInstanceRef;
    /** A reference to a Service ID. */
    serviceid?: ServiceIDRef;
  }

  /** Properties for Service Access Secret Prototypes. */
  export interface ServiceAccessSecretPrototypeProps {
    /** The service credential associated with the secret. */
    resource_key: ResourceKeyRefPrototype;
    /** A reference to the Role and Role CRN for service binding. */
    role?: RoleRefPrototype;
    /** The IBM Cloud service instance associated with the secret. */
    service_instance: ServiceInstanceRefPrototype;
    /** A reference to a Service ID. */
    serviceid?: ServiceIDRef;
  }

  /** A reference to a Service ID. */
  export interface ServiceIDRef {
    /** CRN value of a Service ID. */
    crn?: string;
    /** The ID of the Service ID. */
    id?: string;
  }

  /** A reference to the Service ID. */
  export interface ServiceIDRefPrototype {
    /** The ID of the Service ID. */
    id?: string;
  }

  /** The IBM Cloud service instance associated with the secret. */
  export interface ServiceInstanceRef {
    /** ID of the IBM Cloud service instance associated with the secret. */
    id?: string;
    /** Type of IBM Cloud service associated with the secret. */
    type?: string;
  }

  /** The IBM Cloud service instance associated with the secret. */
  export interface ServiceInstanceRefPrototype {
    /** ID of the IBM Cloud service instance associated with the secret. */
    id?: string;
  }

  /** Response model of a volume mount. */
  export interface VolumeMount {
    /** The path that should be mounted. */
    mount_path: string;
    /** The name of the mount. */
    name: string;
    /** The name of the referenced secret or config map. */
    reference: string;
    /** Specify the type of the volume mount. Allowed types are: 'config_map', 'secret'. */
    type: string;
  }

  /** Prototype model of a volume mount. */
  export interface VolumeMountPrototype {
    /** The path that should be mounted. */
    mount_path: string;
    /** Optional name of the mount. If not set, it will be generated based on the `ref` and a random ID. In case the
     *  `ref` is longer than 58 characters, it will be cut off.
     */
    name?: string;
    /** The name of the referenced secret or config map. */
    reference: string;
    /** Specify the type of the volume mount. Allowed types are: 'config_map', 'secret'. */
    type: string;
  }

  /** SecretDataBasicAuthSecretData. */
  export interface SecretDataBasicAuthSecretData extends SecretData {
    /** Basic auth username. */
    username: string;
    /** Basic auth password. */
    password: string;
  }

  /** Data container that allows to specify config parameters and their values as a key-value map. Each key field must consist of alphanumeric characters, `-`, `_` or `.` and must not be exceed a max length of 253 characters. Each value field can consists of any character and must not be exceed a max length of 1048576 characters. */
  export interface SecretDataGenericSecretData extends SecretData {}

  /** SecretDataRegistrySecretData. */
  export interface SecretDataRegistrySecretData extends SecretData {
    /** Registry username. */
    username: string;
    /** Registry password. */
    password: string;
    /** Registry server. */
    server: string;
    /** Registry email address. */
    email: string;
  }

  /** Secret Data field used by SSH secrets. */
  export interface SecretDataSSHSecretData extends SecretData {
    /** SSH key. */
    ssh_key: string;
    /** Known hosts. */
    known_hosts?: string;
  }

  /** SecretDataTLSSecretData. */
  export interface SecretDataTLSSecretData extends SecretData {
    /** The TLS certificate used in a TLS secret. */
    tls_cert: string;
    /** The TLS key used in a TLS secret. */
    tls_key: string;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * ProjectsPager can be used to simplify the use of listProjects().
   */
  export class ProjectsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListProjectsParams;

    /**
     * Construct a ProjectsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listProjects()
     * @param {Object} [params] - The parameters to be passed to listProjects()
     * @constructor
     * @returns {ProjectsPager}
     */
    constructor(client: CodeEngineV2, params?: CodeEngineV2.ListProjectsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listProjects().
     * @returns {Promise<CodeEngineV2.Project[]>}
     */
    public async getNext(): Promise<CodeEngineV2.Project[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listProjects(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.projects;
    }

    /**
     * Returns all results by invoking listProjects() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.Project[]>}
     */
    public async getAll(): Promise<CodeEngineV2.Project[]> {
      const results: Project[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * AppsPager can be used to simplify the use of listApps().
   */
  export class AppsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListAppsParams;

    /**
     * Construct a AppsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listApps()
     * @param {Object} params - The parameters to be passed to listApps()
     * @constructor
     * @returns {AppsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListAppsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listApps().
     * @returns {Promise<CodeEngineV2.App[]>}
     */
    public async getNext(): Promise<CodeEngineV2.App[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listApps(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.apps;
    }

    /**
     * Returns all results by invoking listApps() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.App[]>}
     */
    public async getAll(): Promise<CodeEngineV2.App[]> {
      const results: App[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * AppRevisionsPager can be used to simplify the use of listAppRevisions().
   */
  export class AppRevisionsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListAppRevisionsParams;

    /**
     * Construct a AppRevisionsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listAppRevisions()
     * @param {Object} params - The parameters to be passed to listAppRevisions()
     * @constructor
     * @returns {AppRevisionsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListAppRevisionsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listAppRevisions().
     * @returns {Promise<CodeEngineV2.AppRevision[]>}
     */
    public async getNext(): Promise<CodeEngineV2.AppRevision[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listAppRevisions(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.revisions;
    }

    /**
     * Returns all results by invoking listAppRevisions() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.AppRevision[]>}
     */
    public async getAll(): Promise<CodeEngineV2.AppRevision[]> {
      const results: AppRevision[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * JobsPager can be used to simplify the use of listJobs().
   */
  export class JobsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListJobsParams;

    /**
     * Construct a JobsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listJobs()
     * @param {Object} params - The parameters to be passed to listJobs()
     * @constructor
     * @returns {JobsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListJobsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listJobs().
     * @returns {Promise<CodeEngineV2.Job[]>}
     */
    public async getNext(): Promise<CodeEngineV2.Job[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listJobs(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.jobs;
    }

    /**
     * Returns all results by invoking listJobs() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.Job[]>}
     */
    public async getAll(): Promise<CodeEngineV2.Job[]> {
      const results: Job[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * JobRunsPager can be used to simplify the use of listJobRuns().
   */
  export class JobRunsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListJobRunsParams;

    /**
     * Construct a JobRunsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listJobRuns()
     * @param {Object} params - The parameters to be passed to listJobRuns()
     * @constructor
     * @returns {JobRunsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListJobRunsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listJobRuns().
     * @returns {Promise<CodeEngineV2.JobRun[]>}
     */
    public async getNext(): Promise<CodeEngineV2.JobRun[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listJobRuns(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.job_runs;
    }

    /**
     * Returns all results by invoking listJobRuns() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.JobRun[]>}
     */
    public async getAll(): Promise<CodeEngineV2.JobRun[]> {
      const results: JobRun[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * BindingsPager can be used to simplify the use of listBindings().
   */
  export class BindingsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListBindingsParams;

    /**
     * Construct a BindingsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listBindings()
     * @param {Object} params - The parameters to be passed to listBindings()
     * @constructor
     * @returns {BindingsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListBindingsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listBindings().
     * @returns {Promise<CodeEngineV2.Binding[]>}
     */
    public async getNext(): Promise<CodeEngineV2.Binding[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listBindings(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.bindings;
    }

    /**
     * Returns all results by invoking listBindings() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.Binding[]>}
     */
    public async getAll(): Promise<CodeEngineV2.Binding[]> {
      const results: Binding[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * BuildsPager can be used to simplify the use of listBuilds().
   */
  export class BuildsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListBuildsParams;

    /**
     * Construct a BuildsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listBuilds()
     * @param {Object} params - The parameters to be passed to listBuilds()
     * @constructor
     * @returns {BuildsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListBuildsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listBuilds().
     * @returns {Promise<CodeEngineV2.Build[]>}
     */
    public async getNext(): Promise<CodeEngineV2.Build[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listBuilds(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.builds;
    }

    /**
     * Returns all results by invoking listBuilds() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.Build[]>}
     */
    public async getAll(): Promise<CodeEngineV2.Build[]> {
      const results: Build[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * BuildRunsPager can be used to simplify the use of listBuildRuns().
   */
  export class BuildRunsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListBuildRunsParams;

    /**
     * Construct a BuildRunsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listBuildRuns()
     * @param {Object} params - The parameters to be passed to listBuildRuns()
     * @constructor
     * @returns {BuildRunsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListBuildRunsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listBuildRuns().
     * @returns {Promise<CodeEngineV2.BuildRun[]>}
     */
    public async getNext(): Promise<CodeEngineV2.BuildRun[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listBuildRuns(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.build_runs;
    }

    /**
     * Returns all results by invoking listBuildRuns() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.BuildRun[]>}
     */
    public async getAll(): Promise<CodeEngineV2.BuildRun[]> {
      const results: BuildRun[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ConfigMapsPager can be used to simplify the use of listConfigMaps().
   */
  export class ConfigMapsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListConfigMapsParams;

    /**
     * Construct a ConfigMapsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listConfigMaps()
     * @param {Object} params - The parameters to be passed to listConfigMaps()
     * @constructor
     * @returns {ConfigMapsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListConfigMapsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listConfigMaps().
     * @returns {Promise<CodeEngineV2.ConfigMap[]>}
     */
    public async getNext(): Promise<CodeEngineV2.ConfigMap[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listConfigMaps(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.config_maps;
    }

    /**
     * Returns all results by invoking listConfigMaps() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.ConfigMap[]>}
     */
    public async getAll(): Promise<CodeEngineV2.ConfigMap[]> {
      const results: ConfigMap[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * SecretsPager can be used to simplify the use of listSecrets().
   */
  export class SecretsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListSecretsParams;

    /**
     * Construct a SecretsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listSecrets()
     * @param {Object} params - The parameters to be passed to listSecrets()
     * @constructor
     * @returns {SecretsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListSecretsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listSecrets().
     * @returns {Promise<CodeEngineV2.Secret[]>}
     */
    public async getNext(): Promise<CodeEngineV2.Secret[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listSecrets(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.secrets;
    }

    /**
     * Returns all results by invoking listSecrets() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.Secret[]>}
     */
    public async getAll(): Promise<CodeEngineV2.Secret[]> {
      const results: Secret[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * DomainMappingsPager can be used to simplify the use of listDomainMappings().
   */
  export class DomainMappingsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListDomainMappingsParams;

    /**
     * Construct a DomainMappingsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listDomainMappings()
     * @param {Object} params - The parameters to be passed to listDomainMappings()
     * @constructor
     * @returns {DomainMappingsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListDomainMappingsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listDomainMappings().
     * @returns {Promise<CodeEngineV2.DomainMapping[]>}
     */
    public async getNext(): Promise<CodeEngineV2.DomainMapping[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listDomainMappings(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.domain_mappings;
    }

    /**
     * Returns all results by invoking listDomainMappings() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.DomainMapping[]>}
     */
    public async getAll(): Promise<CodeEngineV2.DomainMapping[]> {
      const results: DomainMapping[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = CodeEngineV2;
