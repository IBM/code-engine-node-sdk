/**
 * (C) Copyright IBM Corp. 2025.
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
 * IBM OpenAPI SDK Code Generator Version: 3.102.0-615ec964-20250307-203034
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  AbortSignal,
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
   * @param {string} [options.serviceUrl] - The base URL for the service
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

  /** The API version, in format `YYYY-MM-DD`. For the API behavior documented here, specify any date between
   *  `2021-03-31` and `2025-08-27`.
   */
  version?: string;

  /**
   * Construct a CodeEngineV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.version] - The API version, in format `YYYY-MM-DD`. For the API behavior documented here,
   * specify any date between `2021-03-31` and `2025-08-27`.
   * @param {string} [options.serviceUrl] - The base URL for the service
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
    this.version = options.version;
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
    const _validParams = ['limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['name', 'resourceGroupId', 'tags', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'resource_group_id': _params.resourceGroupId,
      'tags': _params.tags,
    };

    const query = {
      'version': this.version,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createProject');

    const parameters = {
      options: {
        url: '/projects',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['id', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteProject');

    const parameters = {
      options: {
        url: '/projects/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['id', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getProject');

    const parameters = {
      options: {
        url: '/projects/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List allowed outbound destinations.
   *
   * List all allowed outbound destinations in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of allowed outbound destinations per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.AllowedOutboundDestinationList>>}
   */
  public listAllowedOutboundDestination(
    params: CodeEngineV2.ListAllowedOutboundDestinationParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.AllowedOutboundDestinationList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'signal', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listAllowedOutboundDestination'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/allowed_outbound_destinations',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create an allowed outbound destination.
   *
   * Create an allowed outbound destination.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {AllowedOutboundDestinationPrototype} params.allowedOutboundDestination - AllowedOutboundDestination
   * prototype.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.AllowedOutboundDestination>>}
   */
  public createAllowedOutboundDestination(
    params: CodeEngineV2.CreateAllowedOutboundDestinationParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.AllowedOutboundDestination>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'allowedOutboundDestination'];
    const _validParams = ['projectId', 'allowedOutboundDestination', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.allowedOutboundDestination;
    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createAllowedOutboundDestination'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/allowed_outbound_destinations',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an allowed outbound destination.
   *
   * Delete an allowed outbound destination.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your allowed outbound destination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteAllowedOutboundDestination(
    params: CodeEngineV2.DeleteAllowedOutboundDestinationParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteAllowedOutboundDestination'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/allowed_outbound_destinations/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an allowed outbound destination.
   *
   * Display the details of an allowed outbound destination.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your allowed outbound destination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.AllowedOutboundDestination>>}
   */
  public getAllowedOutboundDestination(
    params: CodeEngineV2.GetAllowedOutboundDestinationParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.AllowedOutboundDestination>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getAllowedOutboundDestination'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/allowed_outbound_destinations/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an allowed outbound destination.
   *
   * Update an allowed outbound destination.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your allowed outbound destination.
   * @param {string} params.ifMatch - Version of the allowed outbound destination to be updated. Specify the version
   * that you retrieved as entity_tag (ETag header) when reading the allowed outbound destination. This value helps
   * identifying parallel usage of this API. Pass * to indicate to update any version available. This might result in
   * stale updates.
   * @param {AllowedOutboundDestinationPatch} params.allowedOutboundDestination - AllowedOutboundDestination patch.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.AllowedOutboundDestination>>}
   */
  public updateAllowedOutboundDestination(
    params: CodeEngineV2.UpdateAllowedOutboundDestinationParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.AllowedOutboundDestination>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'ifMatch', 'allowedOutboundDestination'];
    const _validParams = [
      'projectId',
      'name',
      'ifMatch',
      'allowedOutboundDestination',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.allowedOutboundDestination;
    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateAllowedOutboundDestination'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/allowed_outbound_destinations/{name}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {number} [params.runAsUser] - Optional user ID (UID) to run the app.
   * @param {string[]} [params.runCommands] - Optional commands for the app that are passed to start the container. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {boolean} [params.runComputeResourceTokenEnabled] - Optional flag to enable the use of a compute resource
   * token mounted to the container file system.
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
   * @param {number} [params.scaleDownDelay] - Optional amount of time in seconds that delays the scale-down behavior
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
      'runComputeResourceTokenEnabled',
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
      'signal',
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
      'run_compute_resource_token_enabled': _params.runComputeResourceTokenEnabled,
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

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {boolean} [params.keepServiceAccess] - Determines if connected service access secrets remain intact after
   * app deletion.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteApp(
    params: CodeEngineV2.DeleteAppParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'keepServiceAccess', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'keep_service_access': _params.keepServiceAccess,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteApp');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getApp');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {number} [params.runAsUser] - Optional user ID (UID) to run the app.
   * @param {string[]} [params.runCommands] - Optional commands for the app that are passed to start the container. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {boolean} [params.runComputeResourceTokenEnabled] - Optional flag to enable the use of a compute resource
   * token mounted to the container file system.
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
   * @param {number} [params.scaleDownDelay] - Optional amount of time in seconds that delays the scale-down behavior
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
      'runComputeResourceTokenEnabled',
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
      'signal',
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
      'run_compute_resource_token_enabled': _params.runComputeResourceTokenEnabled,
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

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'appName', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'appName', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'appName', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List application instances.
   *
   * List all instances of an application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.appName - The name of your application.
   * @param {number} [params.limit] - Optional maximum number of apps per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.AppInstanceList>>}
   */
  public listAppInstances(
    params: CodeEngineV2.ListAppInstancesParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.AppInstanceList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'appName'];
    const _validParams = ['projectId', 'appName', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'app_name': _params.appName,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listAppInstances');

    const parameters = {
      options: {
        url: '/projects/{project_id}/apps/{app_name}/instances',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {number} [params.runAsUser] - The user ID (UID) to run the job.
   * @param {string[]} [params.runCommands] - Set commands for the job that are passed to start job run containers. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {boolean} [params.runComputeResourceTokenEnabled] - Optional flag to enable the use of a compute resource
   * token mounted to the container file system.
   * @param {EnvVarPrototype[]} [params.runEnvVariables] - Optional references to config maps, secrets or literal
   * values.
   * @param {string} [params.runMode] - The mode for runs of the job. Valid values are `task` and `daemon`. In `task`
   * mode, the `max_execution_time` and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and
   * failed instances are restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
   * @param {string} [params.runServiceAccount] - The name of the service account. For built-in service accounts, you
   * can use the shortened names `manager`, `none`, `reader`, and `writer`. This property must not be set on a job run,
   * which references a job template.
   * @param {VolumeMountPrototype[]} [params.runVolumeMounts] - Optional mounts of config maps or a secrets.
   * @param {string} [params.scaleArraySpec] - Define a custom set of array indices as a comma-separated list containing
   * single values and hyphen-separated ranges, such as  5,12-14,23,27. Each instance gets its array index value from
   * the environment variable JOB_INDEX. The number of unique array indices that you specify with this parameter
   * determines the number of job instances to run.
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
      'runComputeResourceTokenEnabled',
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
      'signal',
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
      'run_compute_resource_token_enabled': _params.runComputeResourceTokenEnabled,
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

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {boolean} [params.keepServiceAccess] - Determines if connected service access secrets remain intact after
   * job deletion.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteJob(
    params: CodeEngineV2.DeleteJobParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'keepServiceAccess', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'keep_service_access': _params.keepServiceAccess,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteJob');

    const parameters = {
      options: {
        url: '/projects/{project_id}/jobs/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getJob');

    const parameters = {
      options: {
        url: '/projects/{project_id}/jobs/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {number} [params.runAsUser] - The user ID (UID) to run the job.
   * @param {string[]} [params.runCommands] - Set commands for the job that are passed to start job run containers. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {boolean} [params.runComputeResourceTokenEnabled] - Optional flag to enable the use of a compute resource
   * token mounted to the container file system.
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
   * @param {string} [params.scaleArraySpec] - Define a custom set of array indices as a comma-separated list containing
   * single values and hyphen-separated ranges, such as  5,12-14,23,27. Each instance gets its array index value from
   * the environment variable JOB_INDEX. The number of unique array indices that you specify with this parameter
   * determines the number of job instances to run.
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
      'runComputeResourceTokenEnabled',
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
      'signal',
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
      'run_compute_resource_token_enabled': _params.runComputeResourceTokenEnabled,
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

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {string} [params.jobName] - Optional name of the job that you want to use to filter.
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
    const _validParams = ['projectId', 'jobName', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {number} [params.runAsUser] - The user ID (UID) to run the job.
   * @param {string[]} [params.runCommands] - Set commands for the job that are passed to start job run containers. If
   * not specified an empty string array will be applied and the command specified by the container image, will be used
   * to start the container.
   * @param {boolean} [params.runComputeResourceTokenEnabled] - Optional flag to enable the use of a compute resource
   * token mounted to the container file system.
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
   * @param {string} [params.scaleArraySpec] - Define a custom set of array indices as a comma-separated list containing
   * single values and hyphen-separated ranges, such as  5,12-14,23,27. Each instance gets its array index value from
   * the environment variable JOB_INDEX. The number of unique array indices that you specify with this parameter
   * determines the number of job instances to run.
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
      'runComputeResourceTokenEnabled',
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
      'signal',
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
      'run_compute_resource_token_enabled': _params.runComputeResourceTokenEnabled,
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

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteJobRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/job_runs/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getJobRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/job_runs/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * functions
   ************************/

  /**
   * List the function runtimes.
   *
   * List all valid function runtimes.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.FunctionRuntimeList>>}
   */
  public listFunctionRuntimes(
    params?: CodeEngineV2.ListFunctionRuntimesParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.FunctionRuntimeList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listFunctionRuntimes'
    );

    const parameters = {
      options: {
        url: '/function_runtimes',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List functions.
   *
   * List all functions in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of functions per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the 'next_url' field of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.FunctionList>>}
   */
  public listFunctions(
    params: CodeEngineV2.ListFunctionsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.FunctionList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'listFunctions');

    const parameters = {
      options: {
        url: '/projects/{project_id}/functions',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a function.
   *
   * Create a function.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.codeReference - Specifies either a reference to a code bundle or the source code itself. To
   * specify the source code, use the data URL scheme and include the source code as base64 encoded. The data URL scheme
   * is defined in [RFC 2397](https://tools.ietf.org/html/rfc2397).
   * @param {string} params.name - The name of the function. Use a name that is unique within the project.
   * @param {string} params.runtime - The managed runtime used to execute the injected code.
   * @param {boolean} [params.codeBinary] - Specifies whether the code is binary or not. Defaults to false when
   * `code_reference` is set to a data URL. When `code_reference` is set to a code bundle URL, this field is always
   * true.
   * @param {string} [params.codeMain] - Specifies the name of the function that should be invoked.
   * @param {string} [params.codeSecret] - The name of the secret that is used to access the specified `code_reference`.
   * The secret is used to authenticate with a non-public endpoint that is specified as`code_reference`.
   * @param {string} [params.managedDomainMappings] - Optional value controlling which of the system managed domain
   * mappings will be setup for the function. Valid values are 'local_public', 'local_private' and 'local'. Visibility
   * can only be 'local_private' if the project supports function private visibility.
   * @param {boolean} [params.runComputeResourceTokenEnabled] - Optional flag to enable the use of a compute resource
   * token mounted to the container file system.
   * @param {EnvVarPrototype[]} [params.runEnvVariables] - Optional references to config maps, secrets or literal
   * values.
   * @param {number} [params.scaleConcurrency] - Number of parallel requests handled by a single instance, supported
   * only by Node.js, default is `1`.
   * @param {string} [params.scaleCpuLimit] - Optional amount of CPU set for the instance of the function. For valid
   * values see [Supported memory and CPU
   * combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
   * @param {number} [params.scaleDownDelay] - Optional amount of time in seconds that delays the scale down behavior
   * for a function.
   * @param {number} [params.scaleMaxExecutionTime] - Timeout in secs after which the function is terminated.
   * @param {string} [params.scaleMemoryLimit] - Optional amount of memory set for the instance of the function. For
   * valid values see [Supported memory and CPU
   * combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
   * memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
   * information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Function>>}
   */
  public createFunction(
    params: CodeEngineV2.CreateFunctionParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Function>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'codeReference', 'name', 'runtime'];
    const _validParams = [
      'projectId',
      'codeReference',
      'name',
      'runtime',
      'codeBinary',
      'codeMain',
      'codeSecret',
      'managedDomainMappings',
      'runComputeResourceTokenEnabled',
      'runEnvVariables',
      'scaleConcurrency',
      'scaleCpuLimit',
      'scaleDownDelay',
      'scaleMaxExecutionTime',
      'scaleMemoryLimit',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'code_reference': _params.codeReference,
      'name': _params.name,
      'runtime': _params.runtime,
      'code_binary': _params.codeBinary,
      'code_main': _params.codeMain,
      'code_secret': _params.codeSecret,
      'managed_domain_mappings': _params.managedDomainMappings,
      'run_compute_resource_token_enabled': _params.runComputeResourceTokenEnabled,
      'run_env_variables': _params.runEnvVariables,
      'scale_concurrency': _params.scaleConcurrency,
      'scale_cpu_limit': _params.scaleCpuLimit,
      'scale_down_delay': _params.scaleDownDelay,
      'scale_max_execution_time': _params.scaleMaxExecutionTime,
      'scale_memory_limit': _params.scaleMemoryLimit,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'createFunction');

    const parameters = {
      options: {
        url: '/projects/{project_id}/functions',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a function.
   *
   * Delete a function.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your function.
   * @param {boolean} [params.keepServiceAccess] - Determines if connected service access secrets remain intact after
   * function deletion.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deleteFunction(
    params: CodeEngineV2.DeleteFunctionParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'keepServiceAccess', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'keep_service_access': _params.keepServiceAccess,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteFunction');

    const parameters = {
      options: {
        url: '/projects/{project_id}/functions/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a function.
   *
   * Display the details of a function.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your function.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Function>>}
   */
  public getFunction(
    params: CodeEngineV2.GetFunctionParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Function>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getFunction');

    const parameters = {
      options: {
        url: '/projects/{project_id}/functions/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a function.
   *
   * Update the given function.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your function.
   * @param {string} params.ifMatch - Version of the function settings to be updated. Specify the version that you
   * retrieved as entity_tag (ETag header) when reading the function. This value helps identifying parallel usage of
   * this API. Pass * to indicate to update any version available. This might result in stale updates.
   * @param {boolean} [params.codeBinary] - Specifies whether the code is binary or not. Defaults to false when
   * `code_reference` is set to a data URL. When `code_reference` is set to a code bundle URL, this field is always
   * true.
   * @param {string} [params.codeMain] - Specifies the name of the function that should be invoked.
   * @param {string} [params.codeReference] - Specifies either a reference to a code bundle or the source code itself.
   * To specify the source code, use the data URL scheme and include the source code as base64 encoded. The data URL
   * scheme is defined in [RFC 2397](https://tools.ietf.org/html/rfc2397).
   * @param {string} [params.codeSecret] - The name of the secret that is used to access the specified `code_reference`.
   * The secret is used to authenticate with a non-public endpoint that is specified as`code_reference`.
   * @param {string} [params.managedDomainMappings] - Optional value controlling which of the system managed domain
   * mappings will be setup for the function. Valid values are 'local_public', 'local_private' and 'local'. Visibility
   * can only be 'local_private' if the project supports function private visibility.
   * @param {boolean} [params.runComputeResourceTokenEnabled] - Optional flag to enable the use of a compute resource
   * token mounted to the container file system.
   * @param {EnvVarPrototype[]} [params.runEnvVariables] - Optional references to config maps, secrets or literal
   * values.
   * @param {string} [params.runtime] - The managed runtime used to execute the injected code.
   * @param {number} [params.scaleConcurrency] - Number of parallel requests handled by a single instance, supported
   * only by Node.js, default is `1`.
   * @param {string} [params.scaleCpuLimit] - Optional amount of CPU set for the instance of the function. For valid
   * values see [Supported memory and CPU
   * combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
   * @param {number} [params.scaleDownDelay] - Optional amount of time in seconds that delays the scale down behavior
   * for a function.
   * @param {number} [params.scaleMaxExecutionTime] - Timeout in secs after which the function is terminated.
   * @param {string} [params.scaleMemoryLimit] - Optional amount of memory set for the instance of the function. For
   * valid values see [Supported memory and CPU
   * combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
   * memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
   * information see [Units of
   * measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Function>>}
   */
  public updateFunction(
    params: CodeEngineV2.UpdateFunctionParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Function>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'ifMatch'];
    const _validParams = [
      'projectId',
      'name',
      'ifMatch',
      'codeBinary',
      'codeMain',
      'codeReference',
      'codeSecret',
      'managedDomainMappings',
      'runComputeResourceTokenEnabled',
      'runEnvVariables',
      'runtime',
      'scaleConcurrency',
      'scaleCpuLimit',
      'scaleDownDelay',
      'scaleMaxExecutionTime',
      'scaleMemoryLimit',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'code_binary': _params.codeBinary,
      'code_main': _params.codeMain,
      'code_reference': _params.codeReference,
      'code_secret': _params.codeSecret,
      'managed_domain_mappings': _params.managedDomainMappings,
      'run_compute_resource_token_enabled': _params.runComputeResourceTokenEnabled,
      'run_env_variables': _params.runEnvVariables,
      'runtime': _params.runtime,
      'scale_concurrency': _params.scaleConcurrency,
      'scale_cpu_limit': _params.scaleCpuLimit,
      'scale_down_delay': _params.scaleDownDelay,
      'scale_max_execution_time': _params.scaleMaxExecutionTime,
      'scale_memory_limit': _params.scaleMemoryLimit,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'updateFunction');

    const parameters = {
      options: {
        url: '/projects/{project_id}/functions/{name}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {string} params.secretName - The service access secret that is bound to a component.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Binding>>}
   */
  public createBinding(
    params: CodeEngineV2.CreateBindingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Binding>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'component', 'prefix', 'secretName'];
    const _validParams = ['projectId', 'component', 'prefix', 'secretName', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'component': _params.component,
      'prefix': _params.prefix,
      'secret_name': _params.secretName,
    };

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'id', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteBinding');

    const parameters = {
      options: {
        url: '/projects/{project_id}/bindings/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'id', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getBinding');

    const parameters = {
      options: {
        url: '/projects/{project_id}/bindings/{id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * imageBuilds
   ************************/

  /**
   * List builds.
   *
   * List all builds in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of builds per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.BuildList>>}
   */
  public listBuilds(
    params: CodeEngineV2.ListBuildsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.BuildList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {BuildParamPrototype[]} [params.runBuildParams] - Optional references to config maps and secret keys, or
   * literal values that are exposed as build arguments within the Docker file.
   * @param {string} [params.sourceContextDir] - Optional directory in the repository that contains the buildpacks file
   * or the Dockerfile.
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
      'runBuildParams',
      'sourceContextDir',
      'sourceRevision',
      'sourceSecret',
      'sourceType',
      'sourceUrl',
      'strategySize',
      'strategySpecFile',
      'timeout',
      'signal',
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
      'run_build_params': _params.runBuildParams,
      'source_context_dir': _params.sourceContextDir,
      'source_revision': _params.sourceRevision,
      'source_secret': _params.sourceSecret,
      'source_type': _params.sourceType,
      'source_url': _params.sourceUrl,
      'strategy_size': _params.strategySize,
      'strategy_spec_file': _params.strategySpecFile,
      'timeout': _params.timeout,
    };

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteBuild');

    const parameters = {
      options: {
        url: '/projects/{project_id}/builds/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getBuild');

    const parameters = {
      options: {
        url: '/projects/{project_id}/builds/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {BuildParamPrototype[]} [params.runBuildParams] - Optional references to config maps and secret keys, or
   * literal values that are exposed as build arguments within the Docker file.
   * @param {string} [params.sourceContextDir] - Optional directory in the repository that contains the buildpacks file
   * or the Dockerfile.
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
      'runBuildParams',
      'sourceContextDir',
      'sourceRevision',
      'sourceSecret',
      'sourceType',
      'sourceUrl',
      'strategySize',
      'strategySpecFile',
      'strategyType',
      'timeout',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'output_image': _params.outputImage,
      'output_secret': _params.outputSecret,
      'run_build_params': _params.runBuildParams,
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

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'buildName', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {BuildParamPrototype[]} [params.runBuildParams] - Optional references to config maps and secret keys, or
   * literal values that are exposed as build arguments within the Docker file.
   * @param {string} [params.serviceAccount] - Optional service account, which is used for resource control.” or
   * “Optional service account that is used for resource control.
   * @param {string} [params.sourceContextDir] - Optional directory in the repository that contains the buildpacks file
   * or the Dockerfile.
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
      'runBuildParams',
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
      'signal',
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
      'run_build_params': _params.runBuildParams,
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

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteBuildRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/build_runs/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getBuildRun');

    const parameters = {
      options: {
        url: '/projects/{project_id}/build_runs/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.DomainMappingList>>}
   */
  public listDomainMappings(
    params: CodeEngineV2.ListDomainMappingsParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.DomainMappingList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {string} params.tlsSecret - The name of the TLS secret that includes the certificate and private key of this
   * domain mapping.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>>}
   */
  public createDomainMapping(
    params: CodeEngineV2.CreateDomainMappingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'component', 'name', 'tlsSecret'];
    const _validParams = ['projectId', 'component', 'name', 'tlsSecret', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'component': _params.component,
      'name': _params.name,
      'tls_secret': _params.tlsSecret,
    };

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getDomainMapping');

    const parameters = {
      options: {
        url: '/projects/{project_id}/domain_mappings/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {string} [params.tlsSecret] - The name of the TLS secret that includes the certificate and private key of
   * this domain mapping.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>>}
   */
  public updateDomainMapping(
    params: CodeEngineV2.UpdateDomainMappingParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.DomainMapping>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'ifMatch'];
    const _validParams = [
      'projectId',
      'name',
      'ifMatch',
      'component',
      'tlsSecret',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'component': _params.component,
      'tls_secret': _params.tlsSecret,
    };

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * secretsAndConfigmaps
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
    const _validParams = ['projectId', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'data', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'data': _params.data,
    };

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteConfigMap');

    const parameters = {
      options: {
        url: '/projects/{project_id}/config_maps/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getConfigMap');

    const parameters = {
      options: {
        url: '/projects/{project_id}/config_maps/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'ifMatch', 'data', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'data': _params.data,
    };

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {string} [params.format] - Secret format to filter results by.
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
    const _validParams = ['projectId', 'format', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'format': _params.format,
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
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
   * @param {ServiceAccessSecretPrototypeProps} [params.serviceAccess] - Properties for Service Access Secrets.
   * @param {OperatorSecretPrototypeProps} [params.serviceOperator] - Properties for the IBM Cloud Operator Secrets.
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
      'signal',
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

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSecret');

    const parameters = {
      options: {
        url: '/projects/{project_id}/secrets/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(CodeEngineV2.DEFAULT_SERVICE_NAME, 'v2', 'getSecret');

    const parameters = {
      options: {
        url: '/projects/{project_id}/secrets/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
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
    const _validParams = ['projectId', 'name', 'ifMatch', 'format', 'data', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'format': _params.format,
      'data': _params.data,
    };

    const query = {
      'version': this.version,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * persistentDataStores
   ************************/

  /**
   * List persistent data stores.
   *
   * List all persistent data stores in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {number} [params.limit] - Optional maximum number of persistent data stores per page.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'start' query
   * parameter in the `next` object of the operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.PersistentDataStoreList>>}
   */
  public listPersistentDataStore(
    params: CodeEngineV2.ListPersistentDataStoreParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.PersistentDataStoreList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listPersistentDataStore'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/persistent_data_stores',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a persistent data store.
   *
   * Create a persistent data store.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of the persistent data store.
   * @param {string} params.storageType - Specify the storage type of the persistent data store.
   * @param {StorageData} [params.data] - Data container that allows to specify config parameters and their values as a
   * key-value map. Each key field must consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max
   * length of 253 characters. Each value field can consists of any character and must not exceed a max length of
   * 1048576 characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.PersistentDataStore>>}
   */
  public createPersistentDataStore(
    params: CodeEngineV2.CreatePersistentDataStoreParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.PersistentDataStore>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'storageType'];
    const _validParams = ['projectId', 'name', 'storageType', 'data', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'storage_type': _params.storageType,
      'data': _params.data,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createPersistentDataStore'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/persistent_data_stores',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a persistent data store.
   *
   * Delete a persistent data store.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your persistent data store.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>>}
   */
  public deletePersistentDataStore(
    params: CodeEngineV2.DeletePersistentDataStoreParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deletePersistentDataStore'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/persistent_data_stores/{name}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a persistent data store.
   *
   * Get a persistent data store.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project.
   * @param {string} params.name - The name of your persistent data store.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.PersistentDataStore>>}
   */
  public getPersistentDataStore(
    params: CodeEngineV2.GetPersistentDataStoreParams
  ): Promise<CodeEngineV2.Response<CodeEngineV2.PersistentDataStore>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getPersistentDataStore'
    );

    const parameters = {
      options: {
        url: '/projects/{project_id}/persistent_data_stores/{name}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace CodeEngineV2 {
  /** Options for the `CodeEngineV2` constructor. */
  export interface Options extends UserOptions {
    /** The API version, in format `YYYY-MM-DD`. For the API behavior documented here, specify any date between
     *  `2021-03-31` and `2025-08-27`.
     */
    version?: string;
  }

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

  interface DefaultParams {
    headers?: OutgoingHttpHeaders;
    signal?: AbortSignal;
  }

  /** Parameters for the `listProjects` operation. */
  export interface ListProjectsParams extends DefaultParams {
    /** Optional maximum number of projects per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. Any additional query
     *  parameters are ignored if a page token is present. If omitted, the first page of results is returned. This value
     *  is obtained from the 'start' query parameter in the `next` object of the operation response.
     */
    start?: string;
  }

  /** Parameters for the `createProject` operation. */
  export interface CreateProjectParams extends DefaultParams {
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
  }

  /** Parameters for the `deleteProject` operation. */
  export interface DeleteProjectParams extends DefaultParams {
    /** The ID of the project. */
    id: string;
  }

  /** Parameters for the `getProject` operation. */
  export interface GetProjectParams extends DefaultParams {
    /** The ID of the project. */
    id: string;
  }

  /** Parameters for the `listAllowedOutboundDestination` operation. */
  export interface ListAllowedOutboundDestinationParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of allowed outbound destinations per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Parameters for the `createAllowedOutboundDestination` operation. */
  export interface CreateAllowedOutboundDestinationParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** AllowedOutboundDestination prototype. */
    allowedOutboundDestination: AllowedOutboundDestinationPrototype;
  }

  /** Parameters for the `deleteAllowedOutboundDestination` operation. */
  export interface DeleteAllowedOutboundDestinationParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your allowed outbound destination. */
    name: string;
  }

  /** Parameters for the `getAllowedOutboundDestination` operation. */
  export interface GetAllowedOutboundDestinationParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your allowed outbound destination. */
    name: string;
  }

  /** Parameters for the `updateAllowedOutboundDestination` operation. */
  export interface UpdateAllowedOutboundDestinationParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your allowed outbound destination. */
    name: string;
    /** Version of the allowed outbound destination to be updated. Specify the version that you retrieved as
     *  entity_tag (ETag header) when reading the allowed outbound destination. This value helps identifying parallel
     *  usage of this API. Pass * to indicate to update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** AllowedOutboundDestination patch. */
    allowedOutboundDestination: AllowedOutboundDestinationPatch;
  }

  /** Parameters for the `getProjectEgressIps` operation. */
  export interface GetProjectEgressIpsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
  }

  /** Parameters for the `getProjectStatusDetails` operation. */
  export interface GetProjectStatusDetailsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
  }

  /** Parameters for the `listApps` operation. */
  export interface ListAppsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of apps per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Parameters for the `createApp` operation. */
  export interface CreateAppParams extends DefaultParams {
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
    /** Optional user ID (UID) to run the app. */
    runAsUser?: number;
    /** Optional commands for the app that are passed to start the container. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    runComputeResourceTokenEnabled?: boolean;
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
    /** Optional amount of time in seconds that delays the scale-down behavior for an app instance. */
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

  /** Parameters for the `deleteApp` operation. */
  export interface DeleteAppParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    name: string;
    /** Determines if connected service access secrets remain intact after app deletion. */
    keepServiceAccess?: boolean;
  }

  /** Parameters for the `getApp` operation. */
  export interface GetAppParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    name: string;
  }

  /** Parameters for the `updateApp` operation. */
  export interface UpdateAppParams extends DefaultParams {
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
    /** Optional user ID (UID) to run the app. */
    runAsUser?: number;
    /** Optional commands for the app that are passed to start the container. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    runComputeResourceTokenEnabled?: boolean;
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
    /** Optional amount of time in seconds that delays the scale-down behavior for an app instance. */
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
  export interface ListAppRevisionsParams extends DefaultParams {
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
  }

  /** Parameters for the `deleteAppRevision` operation. */
  export interface DeleteAppRevisionParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    appName: string;
    /** The name of your application revision. */
    name: string;
  }

  /** Parameters for the `getAppRevision` operation. */
  export interface GetAppRevisionParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your application. */
    appName: string;
    /** The name of your application revision. */
    name: string;
  }

  /** Parameters for the `listAppInstances` operation. */
  export interface ListAppInstancesParams extends DefaultParams {
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
  }

  /** Parameters for the `listJobs` operation. */
  export interface ListJobsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of jobs per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Parameters for the `createJob` operation. */
  export interface CreateJobParams extends DefaultParams {
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
    /** The user ID (UID) to run the job. */
    runAsUser?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    runComputeResourceTokenEnabled?: boolean;
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
    /** Define a custom set of array indices as a comma-separated list containing single values and hyphen-separated
     *  ranges, such as  5,12-14,23,27. Each instance gets its array index value from the environment variable
     *  JOB_INDEX. The number of unique array indices that you specify with this parameter determines the number of job
     *  instances to run.
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

  /** Parameters for the `deleteJob` operation. */
  export interface DeleteJobParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your job. */
    name: string;
    /** Determines if connected service access secrets remain intact after job deletion. */
    keepServiceAccess?: boolean;
  }

  /** Parameters for the `getJob` operation. */
  export interface GetJobParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your job. */
    name: string;
  }

  /** Parameters for the `updateJob` operation. */
  export interface UpdateJobParams extends DefaultParams {
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
    /** The user ID (UID) to run the job. */
    runAsUser?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    runComputeResourceTokenEnabled?: boolean;
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
    /** Define a custom set of array indices as a comma-separated list containing single values and hyphen-separated
     *  ranges, such as  5,12-14,23,27. Each instance gets its array index value from the environment variable
     *  JOB_INDEX. The number of unique array indices that you specify with this parameter determines the number of job
     *  instances to run.
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
  export interface ListJobRunsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional name of the job that you want to use to filter. */
    jobName?: string;
    /** Optional maximum number of job runs per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Parameters for the `createJobRun` operation. */
  export interface CreateJobRunParams extends DefaultParams {
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
    /** The user ID (UID) to run the job. */
    runAsUser?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    runCommands?: string[];
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    runComputeResourceTokenEnabled?: boolean;
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
    /** Define a custom set of array indices as a comma-separated list containing single values and hyphen-separated
     *  ranges, such as  5,12-14,23,27. Each instance gets its array index value from the environment variable
     *  JOB_INDEX. The number of unique array indices that you specify with this parameter determines the number of job
     *  instances to run.
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

  /** Parameters for the `deleteJobRun` operation. */
  export interface DeleteJobRunParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your job run. */
    name: string;
  }

  /** Parameters for the `getJobRun` operation. */
  export interface GetJobRunParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your job run. */
    name: string;
  }

  /** Parameters for the `listFunctionRuntimes` operation. */
  export interface ListFunctionRuntimesParams extends DefaultParams {}

  /** Parameters for the `listFunctions` operation. */
  export interface ListFunctionsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of functions per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the 'next_url' field of
     *  the operation response.
     */
    start?: string;
  }

  /** Parameters for the `createFunction` operation. */
  export interface CreateFunctionParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Specifies either a reference to a code bundle or the source code itself. To specify the source code, use the
     *  data URL scheme and include the source code as base64 encoded. The data URL scheme is defined in [RFC
     *  2397](https://tools.ietf.org/html/rfc2397).
     */
    codeReference: string;
    /** The name of the function. Use a name that is unique within the project. */
    name: string;
    /** The managed runtime used to execute the injected code. */
    runtime: string;
    /** Specifies whether the code is binary or not. Defaults to false when `code_reference` is set to a data URL.
     *  When `code_reference` is set to a code bundle URL, this field is always true.
     */
    codeBinary?: boolean;
    /** Specifies the name of the function that should be invoked. */
    codeMain?: string;
    /** The name of the secret that is used to access the specified `code_reference`. The secret is used to
     *  authenticate with a non-public endpoint that is specified as`code_reference`.
     */
    codeSecret?: string;
    /** Optional value controlling which of the system managed domain mappings will be setup for the function. Valid
     *  values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the project
     *  supports function private visibility.
     */
    managedDomainMappings?: CreateFunctionConstants.ManagedDomainMappings | string;
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    runComputeResourceTokenEnabled?: boolean;
    /** Optional references to config maps, secrets or literal values. */
    runEnvVariables?: EnvVarPrototype[];
    /** Number of parallel requests handled by a single instance, supported only by Node.js, default is `1`. */
    scaleConcurrency?: number;
    /** Optional amount of CPU set for the instance of the function. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scaleCpuLimit?: string;
    /** Optional amount of time in seconds that delays the scale down behavior for a function. */
    scaleDownDelay?: number;
    /** Timeout in secs after which the function is terminated. */
    scaleMaxExecutionTime?: number;
    /** Optional amount of memory set for the instance of the function. For valid values see [Supported memory and
     *  CPU combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for
     *  specifying memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB.
     *  For more information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleMemoryLimit?: string;
  }

  /** Constants for the `createFunction` operation. */
  export namespace CreateFunctionConstants {
    /** Optional value controlling which of the system managed domain mappings will be setup for the function. Valid values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the project supports function private visibility. */
    export enum ManagedDomainMappings {
      LOCAL = 'local',
      LOCAL_PRIVATE = 'local_private',
      LOCAL_PUBLIC = 'local_public',
    }
  }

  /** Parameters for the `deleteFunction` operation. */
  export interface DeleteFunctionParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your function. */
    name: string;
    /** Determines if connected service access secrets remain intact after function deletion. */
    keepServiceAccess?: boolean;
  }

  /** Parameters for the `getFunction` operation. */
  export interface GetFunctionParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your function. */
    name: string;
  }

  /** Parameters for the `updateFunction` operation. */
  export interface UpdateFunctionParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your function. */
    name: string;
    /** Version of the function settings to be updated. Specify the version that you retrieved as entity_tag (ETag
     *  header) when reading the function. This value helps identifying parallel usage of this API. Pass * to indicate
     *  to update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** Specifies whether the code is binary or not. Defaults to false when `code_reference` is set to a data URL.
     *  When `code_reference` is set to a code bundle URL, this field is always true.
     */
    codeBinary?: boolean;
    /** Specifies the name of the function that should be invoked. */
    codeMain?: string;
    /** Specifies either a reference to a code bundle or the source code itself. To specify the source code, use the
     *  data URL scheme and include the source code as base64 encoded. The data URL scheme is defined in [RFC
     *  2397](https://tools.ietf.org/html/rfc2397).
     */
    codeReference?: string;
    /** The name of the secret that is used to access the specified `code_reference`. The secret is used to
     *  authenticate with a non-public endpoint that is specified as`code_reference`.
     */
    codeSecret?: string;
    /** Optional value controlling which of the system managed domain mappings will be setup for the function. Valid
     *  values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the project
     *  supports function private visibility.
     */
    managedDomainMappings?: UpdateFunctionConstants.ManagedDomainMappings | string;
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    runComputeResourceTokenEnabled?: boolean;
    /** Optional references to config maps, secrets or literal values. */
    runEnvVariables?: EnvVarPrototype[];
    /** The managed runtime used to execute the injected code. */
    runtime?: string;
    /** Number of parallel requests handled by a single instance, supported only by Node.js, default is `1`. */
    scaleConcurrency?: number;
    /** Optional amount of CPU set for the instance of the function. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scaleCpuLimit?: string;
    /** Optional amount of time in seconds that delays the scale down behavior for a function. */
    scaleDownDelay?: number;
    /** Timeout in secs after which the function is terminated. */
    scaleMaxExecutionTime?: number;
    /** Optional amount of memory set for the instance of the function. For valid values see [Supported memory and
     *  CPU combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for
     *  specifying memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB.
     *  For more information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scaleMemoryLimit?: string;
  }

  /** Constants for the `updateFunction` operation. */
  export namespace UpdateFunctionConstants {
    /** Optional value controlling which of the system managed domain mappings will be setup for the function. Valid values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the project supports function private visibility. */
    export enum ManagedDomainMappings {
      LOCAL = 'local',
      LOCAL_PRIVATE = 'local_private',
      LOCAL_PUBLIC = 'local_public',
    }
  }

  /** Parameters for the `listBindings` operation. */
  export interface ListBindingsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of bindings per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Parameters for the `createBinding` operation. */
  export interface CreateBindingParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** A reference to another component. */
    component: ComponentRef;
    /** Optional value that is set as prefix in the component that is bound. Will be generated if not provided. */
    prefix: string;
    /** The service access secret that is bound to a component. */
    secretName: string;
  }

  /** Parameters for the `deleteBinding` operation. */
  export interface DeleteBindingParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The id of your binding. */
    id: string;
  }

  /** Parameters for the `getBinding` operation. */
  export interface GetBindingParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The id of your binding. */
    id: string;
  }

  /** Parameters for the `listBuilds` operation. */
  export interface ListBuildsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of builds per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Parameters for the `createBuild` operation. */
  export interface CreateBuildParams extends DefaultParams {
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
    strategyType: CreateBuildConstants.StrategyType | string;
    /** Optional references to config maps and secret keys, or literal values that are exposed as build arguments
     *  within the Docker file.
     */
    runBuildParams?: BuildParamPrototype[];
    /** Optional directory in the repository that contains the buildpacks file or the Dockerfile. */
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
    strategySize?: CreateBuildConstants.StrategySize | string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategySpecFile?: string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
  }

  /** Constants for the `createBuild` operation. */
  export namespace CreateBuildConstants {
    /** The strategy to use for building the image. */
    export enum StrategyType {
      DOCKERFILE = 'dockerfile',
      BUILDPACKS = 'buildpacks',
    }
    /** Specifies the type of source to determine if your build source is in a repository or based on local source code. * local - For builds from local source code. * git - For builds from git version controlled source code. */
    export enum SourceType {
      LOCAL = 'local',
      GIT = 'git',
    }
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`, `medium`, `large`, `xlarge`, `xxlarge`. */
    export enum StrategySize {
      SMALL = 'small',
      MEDIUM = 'medium',
      LARGE = 'large',
      XLARGE = 'xlarge',
      XXLARGE = 'xxlarge',
    }
  }

  /** Parameters for the `deleteBuild` operation. */
  export interface DeleteBuildParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your build. */
    name: string;
  }

  /** Parameters for the `getBuild` operation. */
  export interface GetBuildParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your build. */
    name: string;
  }

  /** Parameters for the `updateBuild` operation. */
  export interface UpdateBuildParams extends DefaultParams {
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
    /** Optional references to config maps and secret keys, or literal values that are exposed as build arguments
     *  within the Docker file.
     */
    runBuildParams?: BuildParamPrototype[];
    /** Optional directory in the repository that contains the buildpacks file or the Dockerfile. */
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
    strategySize?: UpdateBuildConstants.StrategySize | string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategySpecFile?: string;
    /** The strategy to use for building the image. */
    strategyType?: UpdateBuildConstants.StrategyType | string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
  }

  /** Constants for the `updateBuild` operation. */
  export namespace UpdateBuildConstants {
    /** Specifies the type of source to determine if your build source is in a repository or based on local source code. * local - For builds from local source code. * git - For builds from git version controlled source code. */
    export enum SourceType {
      LOCAL = 'local',
      GIT = 'git',
    }
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`, `medium`, `large`, `xlarge`, `xxlarge`. */
    export enum StrategySize {
      SMALL = 'small',
      MEDIUM = 'medium',
      LARGE = 'large',
      XLARGE = 'xlarge',
      XXLARGE = 'xxlarge',
    }
    /** The strategy to use for building the image. */
    export enum StrategyType {
      DOCKERFILE = 'dockerfile',
      BUILDPACKS = 'buildpacks',
    }
  }

  /** Parameters for the `listBuildRuns` operation. */
  export interface ListBuildRunsParams extends DefaultParams {
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
  }

  /** Parameters for the `createBuildRun` operation. */
  export interface CreateBuildRunParams extends DefaultParams {
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
    /** Optional references to config maps and secret keys, or literal values that are exposed as build arguments
     *  within the Docker file.
     */
    runBuildParams?: BuildParamPrototype[];
    /** Optional service account, which is used for resource control.” or “Optional service account that is used for
     *  resource control.
     */
    serviceAccount?: CreateBuildRunConstants.ServiceAccount | string;
    /** Optional directory in the repository that contains the buildpacks file or the Dockerfile. */
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
    strategySize?: CreateBuildRunConstants.StrategySize | string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategySpecFile?: string;
    /** The strategy to use for building the image. */
    strategyType?: CreateBuildRunConstants.StrategyType | string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
  }

  /** Constants for the `createBuildRun` operation. */
  export namespace CreateBuildRunConstants {
    /** Optional service account, which is used for resource control.” or “Optional service account that is used for resource control. */
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
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`, `medium`, `large`, `xlarge`, `xxlarge`. */
    export enum StrategySize {
      SMALL = 'small',
      MEDIUM = 'medium',
      LARGE = 'large',
      XLARGE = 'xlarge',
      XXLARGE = 'xxlarge',
    }
    /** The strategy to use for building the image. */
    export enum StrategyType {
      DOCKERFILE = 'dockerfile',
      BUILDPACKS = 'buildpacks',
    }
  }

  /** Parameters for the `deleteBuildRun` operation. */
  export interface DeleteBuildRunParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your build run. */
    name: string;
  }

  /** Parameters for the `getBuildRun` operation. */
  export interface GetBuildRunParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your build run. */
    name: string;
  }

  /** Parameters for the `listDomainMappings` operation. */
  export interface ListDomainMappingsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of domain mappings per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Parameters for the `createDomainMapping` operation. */
  export interface CreateDomainMappingParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** A reference to another component. */
    component: ComponentRef;
    /** The name of the domain mapping. */
    name: string;
    /** The name of the TLS secret that includes the certificate and private key of this domain mapping. */
    tlsSecret: string;
  }

  /** Parameters for the `deleteDomainMapping` operation. */
  export interface DeleteDomainMappingParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your domain mapping. */
    name: string;
  }

  /** Parameters for the `getDomainMapping` operation. */
  export interface GetDomainMappingParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your domain mapping. */
    name: string;
  }

  /** Parameters for the `updateDomainMapping` operation. */
  export interface UpdateDomainMappingParams extends DefaultParams {
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
    /** The name of the TLS secret that includes the certificate and private key of this domain mapping. */
    tlsSecret?: string;
  }

  /** Parameters for the `listConfigMaps` operation. */
  export interface ListConfigMapsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of config maps per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Parameters for the `createConfigMap` operation. */
  export interface CreateConfigMapParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of the configmap. Use a name that is unique within the project. */
    name: string;
    /** The key-value pair for the config map. Values must be specified in `KEY=VALUE` format. Each `KEY` field must
     *  consist of alphanumeric characters, `-`, `_` or `.` and must not be exceed a max length of 253 characters. Each
     *  `VALUE` field can consists of any character and must not be exceed a max length of 1048576 characters.
     */
    data?: JsonObject;
  }

  /** Parameters for the `deleteConfigMap` operation. */
  export interface DeleteConfigMapParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your configmap. */
    name: string;
  }

  /** Parameters for the `getConfigMap` operation. */
  export interface GetConfigMapParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your configmap. */
    name: string;
  }

  /** Parameters for the `replaceConfigMap` operation. */
  export interface ReplaceConfigMapParams extends DefaultParams {
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
  }

  /** Parameters for the `listSecrets` operation. */
  export interface ListSecretsParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Secret format to filter results by. */
    format?: ListSecretsConstants.Format | string;
    /** Optional maximum number of secrets per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Constants for the `listSecrets` operation. */
  export namespace ListSecretsConstants {
    /** Secret format to filter results by. */
    export enum Format {
      GENERIC = 'generic',
      SSH_AUTH = 'ssh_auth',
      REGISTRY = 'registry',
      BASIC_AUTH = 'basic_auth',
      HMAC_AUTH = 'hmac_auth',
      TLS = 'tls',
      SERVICE_ACCESS = 'service_access',
      SERVICE_OPERATOR = 'service_operator',
    }
  }

  /** Parameters for the `createSecret` operation. */
  export interface CreateSecretParams extends DefaultParams {
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
    /** Properties for Service Access Secrets. */
    serviceAccess?: ServiceAccessSecretPrototypeProps;
    /** Properties for the IBM Cloud Operator Secrets. */
    serviceOperator?: OperatorSecretPrototypeProps;
  }

  /** Constants for the `createSecret` operation. */
  export namespace CreateSecretConstants {
    /** Specify the format of the secret. The format of the secret will determine how the secret is used. */
    export enum Format {
      GENERIC = 'generic',
      SSH_AUTH = 'ssh_auth',
      BASIC_AUTH = 'basic_auth',
      HMAC_AUTH = 'hmac_auth',
      TLS = 'tls',
      SERVICE_ACCESS = 'service_access',
      REGISTRY = 'registry',
      SERVICE_OPERATOR = 'service_operator',
      OTHER = 'other',
    }
  }

  /** Parameters for the `deleteSecret` operation. */
  export interface DeleteSecretParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your secret. */
    name: string;
  }

  /** Parameters for the `getSecret` operation. */
  export interface GetSecretParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your secret. */
    name: string;
  }

  /** Parameters for the `replaceSecret` operation. */
  export interface ReplaceSecretParams extends DefaultParams {
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
  }

  /** Constants for the `replaceSecret` operation. */
  export namespace ReplaceSecretConstants {
    /** Specify the format of the secret. The format of the secret will determine how the secret is used. */
    export enum Format {
      GENERIC = 'generic',
      SSH_AUTH = 'ssh_auth',
      BASIC_AUTH = 'basic_auth',
      HMAC_AUTH = 'hmac_auth',
      TLS = 'tls',
      SERVICE_ACCESS = 'service_access',
      REGISTRY = 'registry',
      SERVICE_OPERATOR = 'service_operator',
      OTHER = 'other',
    }
  }

  /** Parameters for the `listPersistentDataStore` operation. */
  export interface ListPersistentDataStoreParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** Optional maximum number of persistent data stores per page. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'start' query parameter in the `next` object of the
     *  operation response.
     */
    start?: string;
  }

  /** Parameters for the `createPersistentDataStore` operation. */
  export interface CreatePersistentDataStoreParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of the persistent data store. */
    name: string;
    /** Specify the storage type of the persistent data store. */
    storageType: CreatePersistentDataStoreConstants.StorageType | string;
    /** Data container that allows to specify config parameters and their values as a key-value map. Each key field
     *  must consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max length of 253 characters.
     *  Each value field can consists of any character and must not exceed a max length of 1048576 characters.
     */
    data?: StorageData;
  }

  /** Constants for the `createPersistentDataStore` operation. */
  export namespace CreatePersistentDataStoreConstants {
    /** Specify the storage type of the persistent data store. */
    export enum StorageType {
      OBJECT_STORAGE = 'object_storage',
    }
  }

  /** Parameters for the `deletePersistentDataStore` operation. */
  export interface DeletePersistentDataStoreParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your persistent data store. */
    name: string;
  }

  /** Parameters for the `getPersistentDataStore` operation. */
  export interface GetPersistentDataStoreParams extends DefaultParams {
    /** The ID of the project. */
    projectId: string;
    /** The name of your persistent data store. */
    name: string;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * AllowedOutboundDestination Describes the model of an allowed outbound destination.
   */
  export interface AllowedOutboundDestination {
    /** The version of the allowed outbound destination, which is used to achieve optimistic locking. */
    entity_tag: string;
    /** Specify the type of the allowed outbound destination. Allowed types are: 'cidr_block'. */
    type: AllowedOutboundDestination.Constants.Type | string;
  }
  export namespace AllowedOutboundDestination {
    export namespace Constants {
      /** Specify the type of the allowed outbound destination. Allowed types are: 'cidr_block'. */
      export enum Type {
        CIDR_BLOCK = 'cidr_block',
      }
    }
  }

  /**
   * Contains a list of allowed outbound destinations and pagination information.
   */
  export interface AllowedOutboundDestinationList {
    /** List of all allowed outbound destinations. */
    allowed_outbound_destinations: AllowedOutboundDestination[];
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /**
   * AllowedOutboundDestinationPatch is the request model for allowed outbound destination update operations.
   */
  export interface AllowedOutboundDestinationPatch {
    /** Specify the type of the allowed outbound destination. Allowed types are: 'cidr_block'. */
    type?: AllowedOutboundDestinationPatch.Constants.Type | string;
  }
  export namespace AllowedOutboundDestinationPatch {
    export namespace Constants {
      /** Specify the type of the allowed outbound destination. Allowed types are: 'cidr_block'. */
      export enum Type {
        CIDR_BLOCK = 'cidr_block',
      }
    }
  }

  /**
   * AllowedOutboundDestinationPrototype is the request model for allowed outbound destination create operations.
   */
  export interface AllowedOutboundDestinationPrototype {
    /** Specify the type of the allowed outbound destination. Allowed types are: 'cidr_block'. */
    type: AllowedOutboundDestinationPrototype.Constants.Type | string;
  }
  export namespace AllowedOutboundDestinationPrototype {
    export namespace Constants {
      /** Specify the type of the allowed outbound destination. Allowed types are: 'cidr_block'. */
      export enum Type {
        CIDR_BLOCK = 'cidr_block',
      }
    }
  }

  /**
   * App is the response model for app resources.
   */
  export interface App {
    /** Reference to a build that is associated with the application. */
    build?: string;
    /** Reference to a build run that is associated with the application. */
    build_run?: string;
    /** References to config maps, secrets or literal values, which are defined and set by Code Engine and are
     *  exposed as environment variables in the application.
     */
    computed_env_variables?: EnvVar[];
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** Optional URL to invoke the app. Depending on visibility,  this is accessible publicly or in the private
     *  network only. Empty in case 'managed_domain_mappings' is set to 'local'.
     */
    endpoint?: string;
    /** The URL to the app that is only visible within the project. */
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
    managed_domain_mappings: App.Constants.ManagedDomainMappings | string;
    /** The name of the app. */
    name: string;
    /** Response model for probes. */
    probe_liveness?: Probe;
    /** Response model for probes. */
    probe_readiness?: Probe;
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the app. */
    resource_type?: App.Constants.ResourceType | string;
    /** Optional arguments for the app that are passed to start the container. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    run_arguments: string[];
    /** Optional user ID (UID) to run the app. */
    run_as_user?: number;
    /** Optional commands for the app that are passed to start the container. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    run_commands: string[];
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    run_compute_resource_token_enabled?: boolean;
    /** References to config maps, secrets or literal values, which are defined by the app owner and are exposed as
     *  environment variables in the application.
     */
    run_env_variables: EnvVar[];
    /** Optional name of the service account. For built-in service accounts, you can use the shortened names
     *  `manager` , `none`, `reader`, and `writer`.
     */
    run_service_account?: App.Constants.RunServiceAccount | string;
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
    /** Optional amount of time in seconds that delays the scale-down behavior for an app instance. */
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
    status?: App.Constants.Status | string;
    /** The detailed status of the application. */
    status_details?: AppStatus;
  }
  export namespace App {
    export namespace Constants {
      /** Optional value controlling which of the system managed domain mappings will be setup for the application. Valid values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the project supports application private visibility. */
      export enum ManagedDomainMappings {
        LOCAL = 'local',
        LOCAL_PRIVATE = 'local_private',
        LOCAL_PUBLIC = 'local_public',
      }
      /** The type of the app. */
      export enum ResourceType {
        APP_V2 = 'app_v2',
      }
      /** Optional name of the service account. For built-in service accounts, you can use the shortened names `manager` , `none`, `reader`, and `writer`. */
      export enum RunServiceAccount {
        DEFAULT = 'default',
        MANAGER = 'manager',
        READER = 'reader',
        WRITER = 'writer',
        NONE = 'none',
      }
      /** The current status of the app. */
      export enum Status {
        READY = 'ready',
        DEPLOYING = 'deploying',
        FAILED = 'failed',
        WARNING = 'warning',
      }
    }
  }

  /**
   * AppInstance is the response model for app instance resources.
   */
  export interface AppInstance {
    /** The name of the application that is associated with this instance. */
    app_name: string;
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** When you provision a new app instance, a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the app instance. */
    name?: string;
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the app instance. */
    resource_type?: AppInstance.Constants.ResourceType | string;
    /** The name of the revision that is associated with this instance. */
    revision_name: string;
    /** The number of CPU set for the instance. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scale_cpu_limit: string;
    /** The amount of ephemeral storage set for the instance. The amount specified as ephemeral storage, must not
     *  exceed the amount of `scale_memory_limit`. The units for specifying ephemeral storage are Megabyte (M) or
     *  Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_ephemeral_storage_limit: string;
    /** The amount of memory set for the instance. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for specifying
     *  memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB. For more
     *  information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_memory_limit: string;
    /** The current status of the instance. */
    status?: AppInstance.Constants.Status | string;
    /** The status of the pod and it's containers. */
    status_details?: AppInstanceStatusDetails;
  }
  export namespace AppInstance {
    export namespace Constants {
      /** The type of the app instance. */
      export enum ResourceType {
        APP_INSTANCE_V2 = 'app_instance_v2',
      }
      /** The current status of the instance. */
      export enum Status {
        PENDING = 'pending',
        RUNNING = 'running',
        SUCCEEDED = 'succeeded',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Contains a list of app instances and pagination information.
   */
  export interface AppInstanceList {
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** List of all app instances. */
    instances: AppInstance[];
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /**
   * The status of the pod and it's containers.
   */
  export interface AppInstanceStatusDetails {
    /** The number of restarts of the app instance. */
    restarts?: number;
    /** The status of a container. */
    system_container?: ContainerStatus;
    /** The status of a container. */
    user_container?: ContainerStatus;
  }

  /**
   * Contains a list of apps and pagination information.
   */
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

  /**
   * AppRevision is the response model for app revision resources.
   */
  export interface AppRevision {
    /** Name of the associated app. */
    app_name?: string;
    /** References to config maps, secrets or literal values, which are defined and set by Code Engine and are
     *  exposed as environment variables in the application.
     */
    computed_env_variables?: EnvVar[];
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
    /** The name of the app revision. */
    name?: string;
    /** Response model for probes. */
    probe_liveness?: Probe;
    /** Response model for probes. */
    probe_readiness?: Probe;
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the app revision. */
    resource_type?: AppRevision.Constants.ResourceType | string;
    /** Optional arguments for the app that are passed to start the container. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    run_arguments: string[];
    /** Optional user ID (UID) to run the app. */
    run_as_user?: number;
    /** Optional commands for the app that are passed to start the container. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    run_commands: string[];
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    run_compute_resource_token_enabled?: boolean;
    /** References to config maps, secrets or literal values, which are defined by the app owner and are exposed as
     *  environment variables in the application.
     */
    run_env_variables: EnvVar[];
    /** Optional name of the service account. For built-in service accounts, you can use the shortened names
     *  `manager` , `none`, `reader`, and `writer`.
     */
    run_service_account?: AppRevision.Constants.RunServiceAccount | string;
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
    /** Optional amount of time in seconds that delays the scale-down behavior for an app instance. */
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
    status?: AppRevision.Constants.Status | string;
    /** The detailed status of the application revision. */
    status_details?: AppRevisionStatus;
  }
  export namespace AppRevision {
    export namespace Constants {
      /** The type of the app revision. */
      export enum ResourceType {
        APP_REVISION_V2 = 'app_revision_v2',
      }
      /** Optional name of the service account. For built-in service accounts, you can use the shortened names `manager` , `none`, `reader`, and `writer`. */
      export enum RunServiceAccount {
        DEFAULT = 'default',
        MANAGER = 'manager',
        READER = 'reader',
        WRITER = 'writer',
        NONE = 'none',
      }
      /** The current status of the app revision. */
      export enum Status {
        READY = 'ready',
        LOADING = 'loading',
        WARNING = 'warning',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Contains a list of app revisions and pagination information.
   */
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

  /**
   * The detailed status of the application revision.
   */
  export interface AppRevisionStatus {
    /** The number of running instances of the revision. */
    actual_instances?: number;
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: AppRevisionStatus.Constants.Reason | string;
  }
  export namespace AppRevisionStatus {
    export namespace Constants {
      /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
      export enum Reason {
        READY = 'ready',
        WAITING = 'waiting',
        DEPLOYING = 'deploying',
        DEPLOYING_WAITING_FOR_RESOURCES = 'deploying_waiting_for_resources',
        INITIAL_SCALE_NEVER_ACHIEVED = 'initial_scale_never_achieved',
        FETCH_IMAGE_FAILED_UNKNOWN_MANIFEST = 'fetch_image_failed_unknown_manifest',
        FETCH_IMAGE_FAILED_UNKNOWN_REPOSITORY = 'fetch_image_failed_unknown_repository',
        FETCH_IMAGE_FAILED_REGISTRY_NOT_FOUND = 'fetch_image_failed_registry_not_found',
        FETCH_IMAGE_FAILED_MISSING_PULL_SECRET = 'fetch_image_failed_missing_pull_secret',
        FETCH_IMAGE_FAILED_WRONG_PULL_CREDENTIALS = 'fetch_image_failed_wrong_pull_credentials',
        FETCH_IMAGE_FAILED_MISSING_PULL_CREDENTIALS = 'fetch_image_failed_missing_pull_credentials',
        CONTAINER_FAILED_EXIT_CODE_0 = 'container_failed_exit_code_0',
        CONTAINER_FAILED_EXIT_CODE_1 = 'container_failed_exit_code_1',
        CONTAINER_FAILED_EXIT_CODE_139 = 'container_failed_exit_code_139',
        CONTAINER_FAILED_EXIT_CODE_24 = 'container_failed_exit_code_24',
        IMAGE_PULL_BACK_OFF = 'image_pull_back_off',
        INVALID_TAR_HEADER_IMAGE_PULL_ERR = 'invalid_tar_header_image_pull_err',
      }
    }
  }

  /**
   * The detailed status of the application.
   */
  export interface AppStatus {
    /** Latest app revision that has been created. */
    latest_created_revision?: string;
    /** Latest app revision that reached a ready state. */
    latest_ready_revision?: string;
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: AppStatus.Constants.Reason | string;
  }
  export namespace AppStatus {
    export namespace Constants {
      /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
      export enum Reason {
        READY = 'ready',
        DEPLOYING = 'deploying',
        WAITING_FOR_RESOURCES = 'waiting_for_resources',
        NO_REVISION_READY = 'no_revision_ready',
        READY_BUT_LATEST_REVISION_FAILED = 'ready_but_latest_revision_failed',
      }
    }
  }

  /**
   * Describes the model of a binding.
   */
  export interface Binding {
    /** A reference to another component. */
    component: ComponentRef;
    /** When you provision a new binding,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The ID of the binding. */
    id?: string;
    /** The value that is set as a prefix in the component that is bound. */
    prefix: string;
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The type of the binding. */
    resource_type?: Binding.Constants.ResourceType | string;
    /** The service access secret that is bound to a component. */
    secret_name: string;
    /** The current status of the binding. */
    status?: string;
  }
  export namespace Binding {
    export namespace Constants {
      /** The type of the binding. */
      export enum ResourceType {
        BINDING_V2 = 'binding_v2',
      }
    }
  }

  /**
   * Contains a list of bindings and pagination information.
   */
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

  /**
   * Response model for build definitions.
   */
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
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the build. */
    resource_type?: Build.Constants.ResourceType | string;
    /** References to config maps and secret keys, or literal values, which are defined by the build owner and are
     *  exposed as build arguments in Docker files.
     */
    run_build_params?: BuildParam[];
    /** Optional directory in the repository that contains the buildpacks file or the Dockerfile. */
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
    source_type: Build.Constants.SourceType | string;
    /** The URL of the code repository. This field is required if the `source_type` is `git`. If the `source_type`
     *  value is `local`, this field must be omitted. If the repository is publicly available you can provide a 'https'
     *  URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication, you need to provide a
     *  'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points to a secret of
     *  format `ssh_auth`.
     */
    source_url?: string;
    /** The current status of the build. */
    status?: Build.Constants.Status | string;
    /** The detailed status of the build. */
    status_details?: BuildStatus;
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`,
     *  `medium`, `large`, `xlarge`, `xxlarge`.
     */
    strategy_size: Build.Constants.StrategySize | string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategy_spec_file?: string;
    /** The strategy to use for building the image. */
    strategy_type: Build.Constants.StrategyType | string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
  }
  export namespace Build {
    export namespace Constants {
      /** The type of the build. */
      export enum ResourceType {
        BUILD_V2 = 'build_v2',
      }
      /** Specifies the type of source to determine if your build source is in a repository or based on local source code. * local - For builds from local source code. * git - For builds from git version controlled source code. */
      export enum SourceType {
        LOCAL = 'local',
        GIT = 'git',
      }
      /** The current status of the build. */
      export enum Status {
        READY = 'ready',
        FAILED = 'failed',
      }
      /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`, `medium`, `large`, `xlarge`, `xxlarge`. */
      export enum StrategySize {
        SMALL = 'small',
        MEDIUM = 'medium',
        LARGE = 'large',
        XLARGE = 'xlarge',
        XXLARGE = 'xxlarge',
      }
      /** The strategy to use for building the image. */
      export enum StrategyType {
        DOCKERFILE = 'dockerfile',
        BUILDPACKS = 'buildpacks',
      }
    }
  }

  /**
   * Contains a list of builds and pagination information.
   */
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

  /**
   * Response model for build params.
   */
  export interface BuildParam {
    /** The key to reference as build param. */
    key?: string;
    /** The name of the build param. */
    name?: string;
    /** The name of the secret or config map. */
    reference?: string;
    /** Specify the type of the build param. */
    type: BuildParam.Constants.Type | string;
    /** The literal value of the build param. */
    value?: string;
  }
  export namespace BuildParam {
    export namespace Constants {
      /** Specify the type of the build param. */
      export enum Type {
        LITERAL = 'literal',
        CONFIG_MAP_KEY_REFERENCE = 'config_map_key_reference',
        SECRET_KEY_REFERENCE = 'secret_key_reference',
      }
    }
  }

  /**
   * Prototype model for build params.
   */
  export interface BuildParamPrototype {
    /** The key to reference as build param. */
    key?: string;
    /** The name of the build param. */
    name?: string;
    /** The name of the secret or config map. */
    reference?: string;
    /** Specify the type of the build param. */
    type: BuildParamPrototype.Constants.Type | string;
    /** The literal value of the build param. */
    value?: string;
  }
  export namespace BuildParamPrototype {
    export namespace Constants {
      /** Specify the type of the build param. */
      export enum Type {
        LITERAL = 'literal',
        CONFIG_MAP_KEY_REFERENCE = 'config_map_key_reference',
        SECRET_KEY_REFERENCE = 'secret_key_reference',
      }
    }
  }

  /**
   * Response model for build run objects.
   */
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
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the build run. */
    resource_type?: BuildRun.Constants.ResourceType | string;
    /** References to config maps and secret keys, or literal values, which are defined by the build owner and are
     *  exposed as build arguments in Docker files.
     */
    run_build_params?: BuildParam[];
    /** Optional service account, which is used for resource control.” or “Optional service account that is used for
     *  resource control.
     */
    service_account?: BuildRun.Constants.ServiceAccount | string;
    /** Optional directory in the repository that contains the buildpacks file or the Dockerfile. */
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
    source_type?: BuildRun.Constants.SourceType | string;
    /** The URL of the code repository. This field is required if the `source_type` is `git`. If the `source_type`
     *  value is `local`, this field must be omitted. If the repository is publicly available you can provide a 'https'
     *  URL like `https://github.com/IBM/CodeEngine`. If the repository requires authentication, you need to provide a
     *  'ssh' URL like `git@github.com:IBM/CodeEngine.git` along with a `source_secret` that points to a secret of
     *  format `ssh_auth`.
     */
    source_url?: string;
    /** The current status of the build run. */
    status?: BuildRun.Constants.Status | string;
    /** Current status condition of a build run. */
    status_details?: BuildRunStatus;
    /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`,
     *  `medium`, `large`, `xlarge`, `xxlarge`.
     */
    strategy_size?: BuildRun.Constants.StrategySize | string;
    /** Optional path to the specification file that is used for build strategies for building an image. */
    strategy_spec_file?: string;
    /** The strategy to use for building the image. */
    strategy_type?: BuildRun.Constants.StrategyType | string;
    /** The maximum amount of time, in seconds, that can pass before the build must succeed or fail. */
    timeout?: number;
  }
  export namespace BuildRun {
    export namespace Constants {
      /** The type of the build run. */
      export enum ResourceType {
        BUILD_RUN_V2 = 'build_run_v2',
      }
      /** Optional service account, which is used for resource control.” or “Optional service account that is used for resource control. */
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
      /** The current status of the build run. */
      export enum Status {
        SUCCEEDED = 'succeeded',
        RUNNING = 'running',
        PENDING = 'pending',
        FAILED = 'failed',
      }
      /** Optional size for the build, which determines the amount of resources used. Build sizes are `small`, `medium`, `large`, `xlarge`, `xxlarge`. */
      export enum StrategySize {
        SMALL = 'small',
        MEDIUM = 'medium',
        LARGE = 'large',
        XLARGE = 'xlarge',
        XXLARGE = 'xxlarge',
      }
      /** The strategy to use for building the image. */
      export enum StrategyType {
        DOCKERFILE = 'dockerfile',
        BUILDPACKS = 'buildpacks',
      }
    }
  }

  /**
   * Contains a list of build runs and pagination information.
   */
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

  /**
   * Current status condition of a build run.
   */
  export interface BuildRunStatus {
    /** Time the build run completed. */
    completion_time?: string;
    /** The default branch name of the git source. */
    git_branch_name?: string;
    /** The commit author of a git source. */
    git_commit_author?: string;
    /** The commit sha of the git source. */
    git_commit_sha?: string;
    /** Describes the time the build run completed. */
    output_digest?: string;
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: BuildRunStatus.Constants.Reason | string;
    /** The timestamp of the source. */
    source_timestamp?: string;
    /** Time the build run started. */
    start_time?: string;
  }
  export namespace BuildRunStatus {
    export namespace Constants {
      /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
      export enum Reason {
        SUCCEEDED = 'succeeded',
        RUNNING = 'running',
        PENDING = 'pending',
        FAILED_TO_EXECUTE_BUILD_RUN = 'failed_to_execute_build_run',
        EXCEEDED_EPHEMERAL_STORAGE = 'exceeded_ephemeral_storage',
        MISSING_REGISTRY_ACCESS = 'missing_registry_access',
        MISSING_CODE_REPO_ACCESS = 'missing_code_repo_access',
        MISSING_SECRETS = 'missing_secrets',
        UNKNOWN_STRATEGY = 'unknown_strategy',
        INVALID_BUILD_CONFIGURATION = 'invalid_build_configuration',
        POD_EVICTED_BECAUSE_OF_STORAGE_QUOTA_EXCEEDS = 'pod_evicted_because_of_storage_quota_exceeds',
        POD_EVICTED = 'pod_evicted',
        MISSING_TASK_RUN = 'missing_task_run',
        TASK_RUN_GENERATION_FAILED = 'task_run_generation_failed',
        BUILD_NOT_FOUND = 'build_not_found',
        TIMEOUT = 'timeout',
        FAILED = 'failed',
      }
    }
  }

  /**
   * The detailed status of the build.
   */
  export interface BuildStatus {
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: BuildStatus.Constants.Reason | string;
  }
  export namespace BuildStatus {
    export namespace Constants {
      /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
      export enum Reason {
        REGISTERED = 'registered',
        STRATEGY_NOT_FOUND = 'strategy_not_found',
        CLUSTER_BUILD_STRATEGY_NOT_FOUND = 'cluster_build_strategy_not_found',
        SET_OWNER_REFERENCE_FAILED = 'set_owner_reference_failed',
        SPEC_SOURCE_SECRET_NOT_FOUND = 'spec_source_secret_not_found',
        SPEC_OUTPUT_SECRET_REF_NOT_FOUND = 'spec_output_secret_ref_not_found',
        SPEC_RUNTIME_SECRET_REF_NOT_FOUND = 'spec_runtime_secret_ref_not_found',
        MULTIPLE_SECRET_REF_NOT_FOUND = 'multiple_secret_ref_not_found',
        RUNTIME_PATHS_CAN_NOT_BE_EMPTY = 'runtime_paths_can_not_be_empty',
        REMOTE_REPOSITORY_UNREACHABLE = 'remote_repository_unreachable',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Describes the model of a CBR status of a project.
   */
  export interface CbrStatus {
    /** Describes the model of the enforcement status of a CBR status. */
    data_plane: EnforcementStatus;
  }

  /**
   * A reference to another component.
   */
  export interface ComponentRef {
    /** The name of the referenced component. */
    name: string;
    /** The type of the referenced resource. */
    resource_type: string;
  }

  /**
   * Describes the model of a configmap.
   */
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
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the config map. */
    resource_type?: ConfigMap.Constants.ResourceType | string;
  }
  export namespace ConfigMap {
    export namespace Constants {
      /** The type of the config map. */
      export enum ResourceType {
        CONFIG_MAP_V2 = 'config_map_v2',
      }
    }
  }

  /**
   * Contains a list of config maps and pagination information.
   */
  export interface ConfigMapList {
    /** List of all config maps. */
    config_maps: ConfigMap[];
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /**
   * The status of a container.
   */
  export interface ContainerStatus {
    /** Details of the observed container status. */
    current_state?: ContainerStatusDetails;
    /** Details of the observed container status. */
    last_observed_state?: ContainerStatusDetails;
  }

  /**
   * Details of the observed container status.
   */
  export interface ContainerStatusDetails {
    /** The time the container terminated. Only populated in an observed failure state. */
    completed_at?: string;
    /** The status of the container. */
    container_status?: ContainerStatusDetails.Constants.ContainerStatus | string;
    /** The exit code of the last termination of the container. Only populated in an observed failure state. */
    exit_code?: number;
    /** The reason the container is not yet running or has failed. Only populated in non-running states. */
    reason?: string;
    /** The time the container started. */
    started_at?: string;
  }
  export namespace ContainerStatusDetails {
    export namespace Constants {
      /** The status of the container. */
      export enum ContainerStatus {
        RUNNING = 'running',
        PENDING = 'pending',
        TERMINATED = 'terminated',
      }
    }
  }

  /**
   * Response model for domain mapping definitions.
   */
  export interface DomainMapping {
    /** The value of the CNAME record that must be configured in the DNS settings of the domain, to route traffic
     *  properly to the target Code Engine region.
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
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the Code Engine resource. */
    resource_type?: DomainMapping.Constants.ResourceType | string;
    /** The current status of the domain mapping. */
    status?: DomainMapping.Constants.Status | string;
    /** The detailed status of the domain mapping. */
    status_details?: DomainMappingStatus;
    /** The name of the TLS secret that includes the certificate and private key of this domain mapping. */
    tls_secret: string;
    /** Specifies whether the domain mapping is managed by the user or by Code Engine. */
    user_managed?: boolean;
    /** Specifies whether the domain mapping is reachable through the public internet, or private IBM network, or
     *  only through other components within the same Code Engine project.
     */
    visibility?: DomainMapping.Constants.Visibility | string;
  }
  export namespace DomainMapping {
    export namespace Constants {
      /** The type of the Code Engine resource. */
      export enum ResourceType {
        DOMAIN_MAPPING_V2 = 'domain_mapping_v2',
      }
      /** The current status of the domain mapping. */
      export enum Status {
        READY = 'ready',
        FAILED = 'failed',
        DEPLOYING = 'deploying',
      }
      /** Specifies whether the domain mapping is reachable through the public internet, or private IBM network, or only through other components within the same Code Engine project. */
      export enum Visibility {
        CUSTOM = 'custom',
        PRIVATE = 'private',
        PROJECT = 'project',
        PUBLIC = 'public',
      }
    }
  }

  /**
   * Contains a list of domain mappings and pagination information.
   */
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

  /**
   * The detailed status of the domain mapping.
   */
  export interface DomainMappingStatus {
    /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
    reason?: DomainMappingStatus.Constants.Reason | string;
  }
  export namespace DomainMappingStatus {
    export namespace Constants {
      /** Optional information to provide more context in case of a 'failed' or 'warning' status. */
      export enum Reason {
        READY = 'ready',
        DOMAIN_ALREADY_CLAIMED = 'domain_already_claimed',
        APP_REF_FAILED = 'app_ref_failed',
        FAILED_RECONCILE_INGRESS = 'failed_reconcile_ingress',
        DEPLOYING = 'deploying',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Describes the model of the enforcement status of a CBR status.
   */
  export interface EnforcementStatus {
    enforcement: EnforcementStatus.Constants.Enforcement | string;
    last_synced_at?: string;
  }
  export namespace EnforcementStatus {
    export namespace Constants {
      /** Enforcement */
      export enum Enforcement {
        APPLIED = 'applied',
        OUT_OF_SYNC = 'out_of_sync',
        NONE = 'none',
        UNKNOWN = 'unknown',
      }
    }
  }

  /**
   * Response model for environment variables.
   */
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
    type: EnvVar.Constants.Type | string;
    /** The literal value of the environment variable. */
    value?: string;
  }
  export namespace EnvVar {
    export namespace Constants {
      /** Specify the type of the environment variable. */
      export enum Type {
        LITERAL = 'literal',
        CONFIG_MAP_FULL_REFERENCE = 'config_map_full_reference',
        SECRET_FULL_REFERENCE = 'secret_full_reference',
        CONFIG_MAP_KEY_REFERENCE = 'config_map_key_reference',
        SECRET_KEY_REFERENCE = 'secret_key_reference',
      }
    }
  }

  /**
   * Prototype model for environment variables.
   */
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
    type?: EnvVarPrototype.Constants.Type | string;
    /** The literal value of the environment variable. */
    value?: string;
  }
  export namespace EnvVarPrototype {
    export namespace Constants {
      /** Specify the type of the environment variable. */
      export enum Type {
        LITERAL = 'literal',
        CONFIG_MAP_FULL_REFERENCE = 'config_map_full_reference',
        SECRET_FULL_REFERENCE = 'secret_full_reference',
        CONFIG_MAP_KEY_REFERENCE = 'config_map_key_reference',
        SECRET_KEY_REFERENCE = 'secret_key_reference',
      }
    }
  }

  /**
   * Function is the response model for function resources.
   */
  export interface Function {
    /** Specifies whether the code is binary or not. Defaults to false when `code_reference` is set to a data URL.
     *  When `code_reference` is set to a code bundle URL, this field is always true.
     */
    code_binary: boolean;
    /** Specifies the name of the function that should be invoked. */
    code_main?: string;
    /** Specifies either a reference to a code bundle or the source code itself. To specify the source code, use the
     *  data URL scheme and include the source code as base64 encoded. The data URL scheme is defined in [RFC
     *  2397](https://tools.ietf.org/html/rfc2397).
     */
    code_reference: string;
    /** The name of the secret that is used to access the specified `code_reference`. The secret is used to
     *  authenticate with a non-public endpoint that is specified as`code_reference`.
     */
    code_secret?: string;
    /** References to config maps, secrets or literal values, which are defined and set by Code Engine and are
     *  exposed as environment variables in the function.
     */
    computed_env_variables?: EnvVar[];
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** URL to invoke the function. */
    endpoint?: string;
    /** URL to function that is only visible within the project. */
    endpoint_internal?: string;
    /** The version of the function instance, which is used to achieve optimistic locking. */
    entity_tag: string;
    /** When you provision a new function, a relative URL path is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** Optional value controlling which of the system managed domain mappings will be setup for the function. Valid
     *  values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the project
     *  supports function private visibility.
     */
    managed_domain_mappings: Function.Constants.ManagedDomainMappings | string;
    /** The name of the function. */
    name: string;
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the function. */
    resource_type?: Function.Constants.ResourceType | string;
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    run_compute_resource_token_enabled?: boolean;
    /** References to config maps, secrets or literal values, which are defined by the function owner and are
     *  exposed as environment variables in the function.
     */
    run_env_variables: EnvVar[];
    /** The managed runtime used to execute the injected code. */
    runtime: string;
    /** Number of parallel requests handled by a single instance, supported only by Node.js, default is `1`. */
    scale_concurrency: number;
    /** Optional amount of CPU set for the instance of the function. For valid values see [Supported memory and CPU
     *  combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo).
     */
    scale_cpu_limit: string;
    /** Optional amount of time in seconds that delays the scale down behavior for a function. */
    scale_down_delay: number;
    /** Timeout in secs after which the function is terminated. */
    scale_max_execution_time: number;
    /** Optional amount of memory set for the instance of the function. For valid values see [Supported memory and
     *  CPU combinations](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo). The units for
     *  specifying memory are Megabyte (M) or Gigabyte (G), whereas G and M are the shorthand expressions for GB and MB.
     *  For more information see [Units of
     *  measurement](https://cloud.ibm.com/docs/codeengine?topic=codeengine-mem-cpu-combo#unit-measurements).
     */
    scale_memory_limit: string;
    /** The current status of the function. */
    status?: Function.Constants.Status | string;
    /** The detailed status of the function. */
    status_details: FunctionStatus;
  }
  export namespace Function {
    export namespace Constants {
      /** Optional value controlling which of the system managed domain mappings will be setup for the function. Valid values are 'local_public', 'local_private' and 'local'. Visibility can only be 'local_private' if the project supports function private visibility. */
      export enum ManagedDomainMappings {
        LOCAL = 'local',
        LOCAL_PRIVATE = 'local_private',
        LOCAL_PUBLIC = 'local_public',
      }
      /** The type of the function. */
      export enum ResourceType {
        FUNCTION_V2 = 'function_v2',
      }
      /** The current status of the function. */
      export enum Status {
        OFFLINE = 'offline',
        DEPLOYING = 'deploying',
        READY = 'ready',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Contains a list of functions and pagination information.
   */
  export interface FunctionList {
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** List of all functions. */
    functions: Function[];
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
  }

  /**
   * Response model for Function runtime objects.
   */
  export interface FunctionRuntime {
    /** Whether the function runtime is the default for the code bundle family. */
    default?: boolean;
    /** Whether the function runtime is deprecated. */
    deprecated?: boolean;
    /** The code bundle family of the function runtime. */
    family?: string;
    /** The ID of the function runtime. */
    id?: string;
    /** The name of the function runtime. */
    name?: string;
    /** Whether the function runtime is optimized. */
    optimized?: boolean;
  }

  /**
   * Contains a list of Function runtimes.
   */
  export interface FunctionRuntimeList {
    /** List of all Function runtimes. */
    function_runtimes?: FunctionRuntime[];
  }

  /**
   * The detailed status of the function.
   */
  export interface FunctionStatus {
    /** Provides additional information about the status of the function. */
    reason?: FunctionStatus.Constants.Reason | string;
  }
  export namespace FunctionStatus {
    export namespace Constants {
      /** Provides additional information about the status of the function. */
      export enum Reason {
        OFFLINE = 'offline',
        DEPLOYING_CONFIGURING_ROUTES = 'deploying_configuring_routes',
        READY_UPDATE_IN_PROGRESS = 'ready_update_in_progress',
        DEPLOYING = 'deploying',
        READY_LAST_UPDATE_FAILED = 'ready_last_update_failed',
        READY = 'ready',
        UNKNOWN_REASON = 'unknown_reason',
        NO_CODE_BUNDLE = 'no_code_bundle',
      }
    }
  }

  /**
   * IndexDetails.
   */
  export interface IndexDetails {
    /** The timestamp when the job run index finished processing. */
    finished_at?: string;
    /** Reason why latest retry of the job run index failed. Possible values include but are not limited to
     *  `OOMKilled`, `ContainerExitedCode1` or `ExceededEphemeralStorage`.
     */
    last_failure_reason?: string;
    /** Number of retries of this job run index. */
    retries?: number;
    /** The timestamp when the job run index started processing. */
    started_at?: string;
    /** Current status of the job run index. */
    status?: IndexDetails.Constants.Status | string;
  }
  export namespace IndexDetails {
    export namespace Constants {
      /** Current status of the job run index. */
      export enum Status {
        PENDING = 'pending',
        RUNNING = 'running',
        SUCCEEDED = 'succeeded',
        FAILED = 'failed',
        UNKNOWN = 'unknown',
      }
    }
  }

  /**
   * Job is the response model for job resources.
   */
  export interface Job {
    /** Reference to a build that is associated with the job. */
    build?: string;
    /** Reference to a build run that is associated with the job. */
    build_run?: string;
    /** References to config maps, secrets or literal values, which are defined and set by Code Engine and are
     *  exposed as environment variables in the job run.
     */
    computed_env_variables?: EnvVar[];
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
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the job. */
    resource_type?: Job.Constants.ResourceType | string;
    /** Set arguments for the job that are passed to start job run containers. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    run_arguments: string[];
    /** The user ID (UID) to run the job. */
    run_as_user?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    run_commands: string[];
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    run_compute_resource_token_enabled?: boolean;
    /** References to config maps, secrets or literal values, which are defined by the function owner and are
     *  exposed as environment variables in the job run.
     */
    run_env_variables: EnvVar[];
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time`
     *  and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are
     *  restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
     */
    run_mode: Job.Constants.RunMode | string;
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`,
     *  `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template.
     */
    run_service_account?: Job.Constants.RunServiceAccount | string;
    /** Optional mounts of config maps or secrets. */
    run_volume_mounts: VolumeMount[];
    /** Define a custom set of array indices as a comma-separated list containing single values and hyphen-separated
     *  ranges, such as  5,12-14,23,27. Each instance gets its array index value from the environment variable
     *  JOB_INDEX. The number of unique array indices that you specify with this parameter determines the number of job
     *  instances to run.
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
  export namespace Job {
    export namespace Constants {
      /** The type of the job. */
      export enum ResourceType {
        JOB_V2 = 'job_v2',
      }
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
  }

  /**
   * Contains a list of jobs and pagination information.
   */
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

  /**
   * Response model for job run resources.
   */
  export interface JobRun {
    /** References to config maps, secrets or literal values, which are defined and set by Code Engine and are
     *  exposed as environment variables in the job run.
     */
    computed_env_variables?: EnvVar[];
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
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the job run. */
    resource_type?: JobRun.Constants.ResourceType | string;
    /** Set arguments for the job that are passed to start job run containers. If not specified an empty string
     *  array will be applied and the arguments specified by the container image, will be used to start the container.
     */
    run_arguments: string[];
    /** The user ID (UID) to run the job. */
    run_as_user?: number;
    /** Set commands for the job that are passed to start job run containers. If not specified an empty string array
     *  will be applied and the command specified by the container image, will be used to start the container.
     */
    run_commands: string[];
    /** Optional flag to enable the use of a compute resource token mounted to the container file system. */
    run_compute_resource_token_enabled?: boolean;
    /** References to config maps, secrets or literal values, which are defined by the function owner and are
     *  exposed as environment variables in the job run.
     */
    run_env_variables: EnvVar[];
    /** The mode for runs of the job. Valid values are `task` and `daemon`. In `task` mode, the `max_execution_time`
     *  and `retry_limit` properties apply. In `daemon` mode, since there is no timeout and failed instances are
     *  restarted indefinitely, the `max_execution_time` and `retry_limit` properties are not allowed.
     */
    run_mode?: JobRun.Constants.RunMode | string;
    /** The name of the service account. For built-in service accounts, you can use the shortened names `manager`,
     *  `none`, `reader`, and `writer`. This property must not be set on a job run, which references a job template.
     */
    run_service_account?: JobRun.Constants.RunServiceAccount | string;
    /** Optional mounts of config maps or secrets. */
    run_volume_mounts: VolumeMount[];
    /** Optional value to override the JOB_ARRAY_SIZE environment variable for a job run. */
    scale_array_size_variable_override?: number;
    /** Define a custom set of array indices as a comma-separated list containing single values and hyphen-separated
     *  ranges, such as  5,12-14,23,27. Each instance gets its array index value from the environment variable
     *  JOB_INDEX. The number of unique array indices that you specify with this parameter determines the number of job
     *  instances to run.
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
    status?: JobRun.Constants.Status | string;
    /** The detailed status of the job run. */
    status_details?: JobRunStatus;
  }
  export namespace JobRun {
    export namespace Constants {
      /** The type of the job run. */
      export enum ResourceType {
        JOB_RUN_V2 = 'job_run_v2',
      }
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
      /** The current status of the job run. */
      export enum Status {
        FAILED = 'failed',
        COMPLETED = 'completed',
        RUNNING = 'running',
        PENDING = 'pending',
      }
    }
  }

  /**
   * Contains a list of job runs and pagination information.
   */
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

  /**
   * The detailed status of the job run.
   */
  export interface JobRunStatus {
    /** Time the job run completed. */
    completion_time?: string;
    /** Number of failed job run instances. */
    failed?: number;
    /** List of job run indices that failed. */
    failed_indices?: string;
    /** Detailed process information per index. */
    indices_details?: JsonObject;
    /** Number of pending job run instances. */
    pending?: number;
    /** List of job run indices that are pending. */
    pending_indices?: string;
    /** Number of requested job run instances. */
    requested?: number;
    /** Number of running job run instances. */
    running?: number;
    /** List of job run indices that are running. */
    running_indices?: string;
    /** Time the job run started. */
    start_time?: string;
    /** Number of succeeded job run instances. */
    succeeded?: number;
    /** List of job run indices that succeeded. */
    succeeded_indices?: string;
    /** Number of job run instances with unknown state. */
    unknown?: number;
  }

  /**
   * Describes properties needed to retrieve the first page of a result list.
   */
  export interface ListFirstMetadata {
    /** Href that points to the first page. */
    href?: string;
  }

  /**
   * Describes properties needed to retrieve the next page of a result list.
   */
  export interface ListNextMetadata {
    /** Href that points to the next page. */
    href?: string;
    /** Token. */
    start?: string;
  }

  /**
   * Properties for the IBM Cloud Operator Secret.
   */
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

  /**
   * Properties for the IBM Cloud Operator Secrets.
   */
  export interface OperatorSecretPrototypeProps {
    /** The list of resource groups (by ID) that the operator secret can bind services in. */
    resource_group_ids?: string[];
    /** A reference to the Service ID. */
    serviceid?: ServiceIDRefPrototype;
  }

  /**
   * Describes the model of a persistent data store.
   */
  export interface PersistentDataStore {
    /** The timestamp when the resource was created. */
    created_at?: string;
    /** Data container that allows to specify config parameters and their values as a key-value map. Each key field
     *  must consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max length of 253 characters.
     *  Each value field can consists of any character and must not exceed a max length of 1048576 characters.
     */
    data: StorageData;
    /** The version of the persistent data store, which is used to achieve optimistic locking. */
    entity_tag: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the persistent data store. */
    name: string;
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** Specify the storage type of the persistent data store. */
    storage_type: PersistentDataStore.Constants.StorageType | string;
  }
  export namespace PersistentDataStore {
    export namespace Constants {
      /** Specify the storage type of the persistent data store. */
      export enum StorageType {
        OBJECT_STORAGE = 'object_storage',
      }
    }
  }

  /**
   * List of all persistent data stores.
   */
  export interface PersistentDataStoreList {
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
    /** List of persistent data stores. */
    persistent_data_stores: PersistentDataStore[];
  }

  /**
   * Response model for probes.
   */
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
    type?: Probe.Constants.Type | string;
  }
  export namespace Probe {
    export namespace Constants {
      /** Specifies whether to use HTTP or TCP for the probe checks. The default is TCP. */
      export enum Type {
        TCP = 'tcp',
        HTTP = 'http',
      }
    }
  }

  /**
   * Request model for probes.
   */
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
    type?: ProbePrototype.Constants.Type | string;
  }
  export namespace ProbePrototype {
    export namespace Constants {
      /** Specifies whether to use HTTP or TCP for the probe checks. The default is TCP. */
      export enum Type {
        TCP = 'tcp',
        HTTP = 'http',
      }
    }
  }

  /**
   * Describes the model of a project.
   */
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
    resource_type?: Project.Constants.ResourceType | string;
    /** The current state of the project. For example, when the project is created and is ready for use, the status
     *  of the project is active.
     */
    status?: Project.Constants.Status | string;
  }
  export namespace Project {
    export namespace Constants {
      /** The type of the project. */
      export enum ResourceType {
        PROJECT_V2 = 'project_v2',
      }
      /** The current state of the project. For example, when the project is created and is ready for use, the status of the project is active. */
      export enum Status {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
        PENDING_REMOVAL = 'pending_removal',
        HARD_DELETING = 'hard_deleting',
        HARD_DELETION_FAILED = 'hard_deletion_failed',
        HARD_DELETED = 'hard_deleted',
        DELETING = 'deleting',
        DELETION_FAILED = 'deletion_failed',
        SOFT_DELETED = 'soft_deleted',
        PREPARING = 'preparing',
        CREATING = 'creating',
        CREATION_FAILED = 'creation_failed',
      }
    }
  }

  /**
   * Describes the model of egress IP addresses.
   */
  export interface ProjectEgressIPAddresses {
    /** List of IBM private network IP addresses. */
    private?: string[];
    /** List of public IP addresses. */
    public?: string[];
  }

  /**
   * Contains a list of projects and pagination information.
   */
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

  /**
   * Describes the model of a project status details.
   */
  export interface ProjectStatusDetails {
    /** Status of the Context-based-restriction configuration applicable for this project. */
    cbr: CbrStatus;
    /** Status of the domain created for the project. */
    domain: ProjectStatusDetails.Constants.Domain | string;
    /** Defines whether a project is enabled for management and consumption. */
    project: ProjectStatusDetails.Constants.Project | string;
    /** Status of the Virtual Private Endpoint that exposes the project on the IBM Cloud private network. */
    vpe: ProjectStatusDetails.Constants.Vpe | string;
    /** Return true when project is not VPE enabled. */
    vpe_not_enabled?: boolean;
  }
  export namespace ProjectStatusDetails {
    export namespace Constants {
      /** Status of the domain created for the project. */
      export enum Domain {
        UNKNOWN = 'unknown',
        READY = 'ready',
      }
      /** Defines whether a project is enabled for management and consumption. */
      export enum Project {
        ENABLED = 'enabled',
        DISABLED = 'disabled',
      }
      /** Status of the Virtual Private Endpoint that exposes the project on the IBM Cloud private network. */
      export enum Vpe {
        READY = 'ready',
        UNKNOWN = 'unknown',
      }
    }
  }

  /**
   * The service credential associated with the secret.
   */
  export interface ResourceKeyRef {
    /** ID of the service credential associated with the secret. */
    id?: string;
    /** Name of the service credential associated with the secret. */
    name?: string;
  }

  /**
   * The service credential associated with the secret.
   */
  export interface ResourceKeyRefPrototype {
    /** ID of the service credential associated with the secret. */
    id?: string;
  }

  /**
   * A reference to the Role and Role CRN for service binding.
   */
  export interface RoleRef {
    /** CRN of the IAM Role for this service access secret. */
    crn?: string;
    /** Role of the service credential. */
    name?: string;
  }

  /**
   * A reference to the Role and Role CRN for service binding.
   */
  export interface RoleRefPrototype {
    /** CRN of the IAM Role for this service access secret. */
    crn?: string;
  }

  /**
   * Describes the model of a secret.
   */
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
    format?: Secret.Constants.Format | string;
    /** Specifies whether the secret is user generated. */
    generated_by?: Secret.Constants.GeneratedBy | string;
    /** When you provision a new secret,  a URL is created identifying the location of the instance. */
    href?: string;
    /** The identifier of the resource. */
    id?: string;
    /** The name of the secret. */
    name: string;
    /** The ID of the project in which the resource is located. */
    project_id?: string;
    /** The region of the project the resource is located in. Possible values: 'au-syd', 'br-sao', 'ca-tor',
     *  'eu-de', 'eu-gb', 'jp-osa', 'jp-tok', 'us-east', 'us-south'.
     */
    region?: string;
    /** The type of the secret. */
    resource_type?: Secret.Constants.ResourceType | string;
    /** Properties for Service Access Secrets. */
    service_access?: ServiceAccessSecretProps;
    /** Properties for the IBM Cloud Operator Secret. */
    service_operator?: OperatorSecretProps;
  }
  export namespace Secret {
    export namespace Constants {
      /** Specify the format of the secret. */
      export enum Format {
        GENERIC = 'generic',
        SSH_AUTH = 'ssh_auth',
        BASIC_AUTH = 'basic_auth',
        HMAC_AUTH = 'hmac_auth',
        TLS = 'tls',
        SERVICE_ACCESS = 'service_access',
        REGISTRY = 'registry',
        SERVICE_OPERATOR = 'service_operator',
        OTHER = 'other',
      }
      /** Specifies whether the secret is user generated. */
      export enum GeneratedBy {
        USER = 'user',
        SYSTEM = 'system',
      }
      /** The type of the secret. */
      export enum ResourceType {
        SECRET_V2 = 'secret_v2',
        SECRET_AUTH_SSH_V2 = 'secret_auth_ssh_v2',
        SECRET_BASIC_AUTH_V2 = 'secret_basic_auth_v2',
        SECRET_GENERIC_V2 = 'secret_generic_v2',
        SECRET_OPERATOR_V2 = 'secret_operator_v2',
        SECRET_OTHER_V2 = 'secret_other_v2',
        SECRET_REGISTRY_V2 = 'secret_registry_v2',
        SECRET_SERVICE_ACCESS_V2 = 'secret_service_access_v2',
        SECRET_TLS_V2 = 'secret_tls_v2',
        SECRET_HMAC_AUTH_V2 = 'secret_hmac_auth_v2',
      }
    }
  }

  /**
   * Data container that allows to specify config parameters and their values as a key-value map. Each key field must
   * consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max length of 253 characters. Each value
   * field can consists of any character and must not exceed a max length of 1048576 characters.
   *
   * This type supports additional properties of type string.
   */
  export interface SecretData {
    /**
     * SecretData accepts additional properties of type string.
     */
    [propName: string]: any;
  }

  /**
   * List of secret resources.
   */
  export interface SecretList {
    /** Describes properties needed to retrieve the first page of a result list. */
    first?: ListFirstMetadata;
    /** Maximum number of resources per page. */
    limit: number;
    /** Describes properties needed to retrieve the next page of a result list. */
    next?: ListNextMetadata;
    /** List of secrets. */
    secrets: Secret[];
  }

  /**
   * Properties for Service Access Secrets.
   */
  export interface ServiceAccessSecretProps {
    /** The service credential associated with the secret. */
    resource_key?: ResourceKeyRef;
    /** A reference to the Role and Role CRN for service binding. */
    role?: RoleRef;
    /** The IBM Cloud service instance associated with the secret. */
    service_instance: ServiceInstanceRef;
    /** A reference to a Service ID. */
    serviceid?: ServiceIDRef;
  }

  /**
   * Properties for Service Access Secrets.
   */
  export interface ServiceAccessSecretPrototypeProps {
    /** The service credential associated with the secret. */
    resource_key?: ResourceKeyRefPrototype;
    /** A reference to the Role and Role CRN for service binding. */
    role?: RoleRefPrototype;
    /** The IBM Cloud service instance associated with the secret. */
    service_instance: ServiceInstanceRefPrototype;
    /** A reference to a Service ID. */
    serviceid?: ServiceIDRef;
  }

  /**
   * A reference to a Service ID.
   */
  export interface ServiceIDRef {
    /** CRN value of a Service ID. */
    crn?: string;
    /** The ID of the Service ID. */
    id?: string;
  }

  /**
   * A reference to the Service ID.
   */
  export interface ServiceIDRefPrototype {
    /** The ID of the Service ID. */
    id?: string;
  }

  /**
   * The IBM Cloud service instance associated with the secret.
   */
  export interface ServiceInstanceRef {
    /** ID of the IBM Cloud service instance associated with the secret. */
    id?: string;
    /** Type of IBM Cloud service associated with the secret. */
    type?: string;
  }

  /**
   * The IBM Cloud service instance associated with the secret.
   */
  export interface ServiceInstanceRefPrototype {
    /** ID of the IBM Cloud service instance associated with the secret. */
    id?: string;
  }

  /**
   * Data container that allows to specify config parameters and their values as a key-value map. Each key field must
   * consist of alphanumeric characters, `-`, `_` or `.` and must not exceed a max length of 253 characters. Each value
   * field can consists of any character and must not exceed a max length of 1048576 characters.
   *
   * This type supports additional properties of type string.
   */
  export interface StorageData {
    /**
     * StorageData accepts additional properties of type string.
     */
    [propName: string]: any;
  }

  /**
   * Response model of a volume mount.
   */
  export interface VolumeMount {
    /** The path that should be mounted. */
    mount_path: string;
    /** The name of the mount. */
    name?: string;
    /** Optional flag to specify if the volume mount is read only. */
    read_only?: boolean;
    /** The name of the referenced secret, config map, or persistent data store. */
    reference: string;
    /** The path mounted at the mount path. */
    sub_path?: string;
    /** Specify the type of the volume mount. Allowed types are: 'config_map', 'persistent_data_store', 'secret'. */
    type: VolumeMount.Constants.Type | string;
  }
  export namespace VolumeMount {
    export namespace Constants {
      /** Specify the type of the volume mount. Allowed types are: 'config_map', 'persistent_data_store', 'secret'. */
      export enum Type {
        CONFIG_MAP = 'config_map',
        PERSISTENT_DATA_STORE = 'persistent_data_store',
        SECRET = 'secret',
      }
    }
  }

  /**
   * Prototype model of a volume mount.
   */
  export interface VolumeMountPrototype {
    /** The path that should be mounted. */
    mount_path: string;
    /** Optional name of the mount. If not set, it will be generated based on the `ref` and a random ID. In case the
     *  `ref` is longer than 58 characters, it will be cut off.
     */
    name?: string;
    /** Optional flag to specify if the volume mount is read only. */
    read_only?: boolean;
    /** The name of the referenced secret, config map, or persistent data store. */
    reference: string;
    /** The path mounted at the mount path. */
    sub_path?: string;
    /** Specify the type of the volume mount. Allowed types are: 'config_map', 'persistent_data_store', 'secret'. */
    type: VolumeMountPrototype.Constants.Type | string;
  }
  export namespace VolumeMountPrototype {
    export namespace Constants {
      /** Specify the type of the volume mount. Allowed types are: 'config_map', 'persistent_data_store', 'secret'. */
      export enum Type {
        CONFIG_MAP = 'config_map',
        PERSISTENT_DATA_STORE = 'persistent_data_store',
        SECRET = 'secret',
      }
    }
  }

  /**
   * Update an allowed outbound destination by using a CIDR block.
   */
  export interface AllowedOutboundDestinationPatchCidrBlockDataPatch
    extends AllowedOutboundDestinationPatch {
    /** The IPv4 address range. */
    cidr_block?: string;
  }
  export namespace AllowedOutboundDestinationPatchCidrBlockDataPatch {
    export namespace Constants {
      /** Specify the type of the allowed outbound destination. Allowed types are: 'cidr_block'. */
      export enum Type {
        CIDR_BLOCK = 'cidr_block',
      }
    }
  }

  /**
   * Create an allowed outbound destination by using a CIDR block.
   */
  export interface AllowedOutboundDestinationPrototypeCidrBlockDataPrototype
    extends AllowedOutboundDestinationPrototype {
    /** The IPv4 address range. */
    cidr_block: string;
    /** The name of the CIDR block. */
    name: string;
  }
  export namespace AllowedOutboundDestinationPrototypeCidrBlockDataPrototype {
    export namespace Constants {
      /** Specify the type of the allowed outbound destination. Allowed types are: 'cidr_block'. */
      export enum Type {
        CIDR_BLOCK = 'cidr_block',
      }
    }
  }

  /**
   * Allowed outbound destination CIDR block.
   */
  export interface AllowedOutboundDestinationCidrBlockData extends AllowedOutboundDestination {
    /** The IPv4 address range. */
    cidr_block: string;
    /** The name of the CIDR block. */
    name: string;
  }
  export namespace AllowedOutboundDestinationCidrBlockData {
    export namespace Constants {
      /** Specify the type of the allowed outbound destination. Allowed types are: 'cidr_block'. */
      export enum Type {
        CIDR_BLOCK = 'cidr_block',
      }
    }
  }

  /**
   * SecretDataBasicAuthSecretData.
   *
   * This type supports additional properties of type string.
   */
  export interface SecretDataBasicAuthSecretData extends SecretData {
    /** Basic auth username. */
    username: string;
    /** Basic auth password. */
    password: string;

    /**
     * SecretDataBasicAuthSecretData accepts additional properties of type string.
     */
    [propName: string]: any;
  }

  /**
   * Data container that allows to specify config parameters and their values as a key-value map. Each key field must
   * consist of alphanumeric characters, `-`, `_` or `.` and must not be exceed a max length of 253 characters. Each
   * value field can consists of any character and must not be exceed a max length of 1048576 characters.
   *
   * This type supports additional properties of type string.
   */
  export interface SecretDataGenericSecretData extends SecretData {
    /**
     * SecretDataGenericSecretData accepts additional properties of type string.
     */
    [propName: string]: any;
  }

  /**
   * Secret Data field used by HMAC secrets.
   *
   * This type supports additional properties of type string.
   */
  export interface SecretDataHMACAuthSecretData extends SecretData {
    /** HMAC access key id. */
    access_key_id: string;
    /** HMAC secret access key. */
    secret_access_key: string;

    /**
     * SecretDataHMACAuthSecretData accepts additional properties of type string.
     */
    [propName: string]: any;
  }

  /**
   * SecretDataRegistrySecretData.
   *
   * This type supports additional properties of type string.
   */
  export interface SecretDataRegistrySecretData extends SecretData {
    /** Registry username. */
    username: string;
    /** Registry password. */
    password: string;
    /** Registry server. */
    server: string;
    /** Registry email address. */
    email?: string;

    /**
     * SecretDataRegistrySecretData accepts additional properties of type string.
     */
    [propName: string]: any;
  }

  /**
   * Secret Data field used by SSH secrets.
   *
   * This type supports additional properties of type string.
   */
  export interface SecretDataSSHSecretData extends SecretData {
    /** SSH key. */
    ssh_key: string;
    /** Known hosts. */
    known_hosts?: string;

    /**
     * SecretDataSSHSecretData accepts additional properties of type string.
     */
    [propName: string]: any;
  }

  /**
   * SecretDataTLSSecretData.
   *
   * This type supports additional properties of type string.
   */
  export interface SecretDataTLSSecretData extends SecretData {
    /** The TLS certificate used in a TLS secret. */
    tls_cert: string;
    /** The TLS key used in a TLS secret. */
    tls_key: string;

    /**
     * SecretDataTLSSecretData accepts additional properties of type string.
     */
    [propName: string]: any;
  }

  /**
   * StorageDataObjectStorageData.
   *
   * This type supports additional properties of type string.
   */
  export interface StorageDataObjectStorageData extends StorageData {
    /** Specify the location of the bucket. */
    bucket_location: string;
    /** Specify the name of the bucket. */
    bucket_name: string;
    /** Specify the name of the HMAC secret. */
    secret_name: string;

    /**
     * StorageDataObjectStorageData accepts additional properties of type string.
     */
    [propName: string]: any;
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
   * AllowedOutboundDestinationPager can be used to simplify the use of listAllowedOutboundDestination().
   */
  export class AllowedOutboundDestinationPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListAllowedOutboundDestinationParams;

    /**
     * Construct a AllowedOutboundDestinationPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listAllowedOutboundDestination()
     * @param {Object} params - The parameters to be passed to listAllowedOutboundDestination()
     * @constructor
     * @returns {AllowedOutboundDestinationPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListAllowedOutboundDestinationParams) {
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
     * Returns the next page of results by invoking listAllowedOutboundDestination().
     * @returns {Promise<CodeEngineV2.AllowedOutboundDestination[]>}
     */
    public async getNext(): Promise<CodeEngineV2.AllowedOutboundDestination[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listAllowedOutboundDestination(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.allowed_outbound_destinations;
    }

    /**
     * Returns all results by invoking listAllowedOutboundDestination() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.AllowedOutboundDestination[]>}
     */
    public async getAll(): Promise<CodeEngineV2.AllowedOutboundDestination[]> {
      const results: AllowedOutboundDestination[] = [];
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
   * AppInstancesPager can be used to simplify the use of listAppInstances().
   */
  export class AppInstancesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListAppInstancesParams;

    /**
     * Construct a AppInstancesPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listAppInstances()
     * @param {Object} params - The parameters to be passed to listAppInstances()
     * @constructor
     * @returns {AppInstancesPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListAppInstancesParams) {
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
     * Returns the next page of results by invoking listAppInstances().
     * @returns {Promise<CodeEngineV2.AppInstance[]>}
     */
    public async getNext(): Promise<CodeEngineV2.AppInstance[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listAppInstances(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.instances;
    }

    /**
     * Returns all results by invoking listAppInstances() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.AppInstance[]>}
     */
    public async getAll(): Promise<CodeEngineV2.AppInstance[]> {
      const results: AppInstance[] = [];
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
   * FunctionsPager can be used to simplify the use of listFunctions().
   */
  export class FunctionsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListFunctionsParams;

    /**
     * Construct a FunctionsPager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listFunctions()
     * @param {Object} params - The parameters to be passed to listFunctions()
     * @constructor
     * @returns {FunctionsPager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListFunctionsParams) {
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
     * Returns the next page of results by invoking listFunctions().
     * @returns {Promise<CodeEngineV2.Function[]>}
     */
    public async getNext(): Promise<CodeEngineV2.Function[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listFunctions(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.functions;
    }

    /**
     * Returns all results by invoking listFunctions() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.Function[]>}
     */
    public async getAll(): Promise<CodeEngineV2.Function[]> {
      const results: Function[] = [];
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
   * PersistentDataStorePager can be used to simplify the use of listPersistentDataStore().
   */
  export class PersistentDataStorePager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CodeEngineV2;

    protected params: CodeEngineV2.ListPersistentDataStoreParams;

    /**
     * Construct a PersistentDataStorePager object.
     *
     * @param {CodeEngineV2}  client - The service client instance used to invoke listPersistentDataStore()
     * @param {Object} params - The parameters to be passed to listPersistentDataStore()
     * @constructor
     * @returns {PersistentDataStorePager}
     */
    constructor(client: CodeEngineV2, params: CodeEngineV2.ListPersistentDataStoreParams) {
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
     * Returns the next page of results by invoking listPersistentDataStore().
     * @returns {Promise<CodeEngineV2.PersistentDataStore[]>}
     */
    public async getNext(): Promise<CodeEngineV2.PersistentDataStore[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listPersistentDataStore(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.persistent_data_stores;
    }

    /**
     * Returns all results by invoking listPersistentDataStore() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CodeEngineV2.PersistentDataStore[]>}
     */
    public async getAll(): Promise<CodeEngineV2.PersistentDataStore[]> {
      const results: PersistentDataStore[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = CodeEngineV2;
