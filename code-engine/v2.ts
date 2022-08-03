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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.54.0-af6d2126-20220803-151219
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
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
   * configmap
   ************************/

  /**
   * List configmaps.
   *
   * List Configmaps.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.refreshToken - Refresh Token.
   * @param {string} params.projectGuid - Project GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2ConfigMapList>>}
   */
  public listConfigmapsV2(
    params: CodeEngineV2.ListConfigmapsV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2ConfigMapList>> {
    const _params = { ...params };
    const _requiredParams = ['refreshToken', 'projectGuid'];
    const _validParams = ['refreshToken', 'projectGuid', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_guid': _params.projectGuid,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listConfigmapsV2'
    );

    const parameters = {
      options: {
        url: '/projects/{project_guid}/configmaps',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Refresh-Token': _params.refreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a configmap.
   *
   * Create a Configmap.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.refreshToken - Refresh Token.
   * @param {string} params.projectGuid - Project GUID.
   * @param {string} [params.created] -
   * @param {JsonObject} [params.data] -
   * @param {string} [params.id] -
   * @param {boolean} [params.immutable] -
   * @param {string} [params.name] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2ConfigMap>>}
   */
  public createConfigmapV2(
    params: CodeEngineV2.CreateConfigmapV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2ConfigMap>> {
    const _params = { ...params };
    const _requiredParams = ['refreshToken', 'projectGuid'];
    const _validParams = ['refreshToken', 'projectGuid', 'created', 'data', 'id', 'immutable', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'created': _params.created,
      'data': _params.data,
      'id': _params.id,
      'immutable': _params.immutable,
      'name': _params.name,
    };

    const path = {
      'project_guid': _params.projectGuid,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createConfigmapV2'
    );

    const parameters = {
      options: {
        url: '/projects/{project_guid}/configmaps',
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
            'Refresh-Token': _params.refreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a configmap.
   *
   * Get a Configmap.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.refreshToken - Refresh Token.
   * @param {string} params.projectGuid - Project GUID.
   * @param {string} params.configmapName - ConfigMap name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2ConfigMap>>}
   */
  public getConfigmapV2(
    params: CodeEngineV2.GetConfigmapV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2ConfigMap>> {
    const _params = { ...params };
    const _requiredParams = ['refreshToken', 'projectGuid', 'configmapName'];
    const _validParams = ['refreshToken', 'projectGuid', 'configmapName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_guid': _params.projectGuid,
      'configmap_name': _params.configmapName,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getConfigmapV2'
    );

    const parameters = {
      options: {
        url: '/projects/{project_guid}/configmaps/{configmap_name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Refresh-Token': _params.refreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a configmap.
   *
   * Delete a Configmap.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.refreshToken - Refresh Token.
   * @param {string} params.projectGuid - Project GUID.
   * @param {string} params.configmapName - ConfigMap name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Empty>>}
   */
  public deleteConfigmapV2(
    params: CodeEngineV2.DeleteConfigmapV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['refreshToken', 'projectGuid', 'configmapName'];
    const _validParams = ['refreshToken', 'projectGuid', 'configmapName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_guid': _params.projectGuid,
      'configmap_name': _params.configmapName,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteConfigmapV2'
    );

    const parameters = {
      options: {
        url: '/projects/{project_guid}/configmaps/{configmap_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Refresh-Token': _params.refreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a configmap.
   *
   * Update a Configmap.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.refreshToken - Refresh Token.
   * @param {string} params.projectGuid - Project GUID.
   * @param {string} params.configmapName - Configmap name.
   * @param {string} [params.created] -
   * @param {JsonObject} [params.data] -
   * @param {string} [params.id] -
   * @param {boolean} [params.immutable] -
   * @param {string} [params.name] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2ConfigMap>>}
   */
  public updateConfigmapV2(
    params: CodeEngineV2.UpdateConfigmapV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2ConfigMap>> {
    const _params = { ...params };
    const _requiredParams = ['refreshToken', 'projectGuid', 'configmapName'];
    const _validParams = ['refreshToken', 'projectGuid', 'configmapName', 'created', 'data', 'id', 'immutable', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'created': _params.created,
      'data': _params.data,
      'id': _params.id,
      'immutable': _params.immutable,
      'name': _params.name,
    };

    const path = {
      'project_guid': _params.projectGuid,
      'configmap_name': _params.configmapName,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateConfigmapV2'
    );

    const parameters = {
      options: {
        url: '/projects/{project_guid}/configmaps/{configmap_name}',
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
            'Content-Type': 'application/json',
            'Refresh-Token': _params.refreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * project
   ************************/

  /**
   * List all projects.
   *
   * List projects.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2ProjectList>>}
   */
  public listProjectsV2(
    params?: CodeEngineV2.ListProjectsV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2ProjectList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listProjectsV2'
    );

    const parameters = {
      options: {
        url: '/projects',
        method: 'GET',
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
   * Create a Project.
   *
   * Create a project.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - Specify the project name.
   * @param {string} [params.region] - Specify the id of the regin (us-south, eu-de).
   * @param {string} [params.resourceGroupId] - Specify the resource group.
   * @param {string[]} [params.tags] - resource instance tags.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2Project>>}
   */
  public createProjectV2(
    params?: CodeEngineV2.CreateProjectV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2Project>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['name', 'region', 'resourceGroupId', 'tags', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'region': _params.region,
      'resource_group_id': _params.resourceGroupId,
      'tags': _params.tags,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createProjectV2'
    );

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
   * Retrieve the project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectGuid - Project GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2Project>>}
   */
  public getProjectV2(
    params: CodeEngineV2.GetProjectV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2Project>> {
    const _params = { ...params };
    const _requiredParams = ['projectGuid'];
    const _validParams = ['projectGuid', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_guid': _params.projectGuid,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getProjectV2'
    );

    const parameters = {
      options: {
        url: '/projects/{project_guid}',
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
   * Delete a Project.
   *
   * Delete a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectGuid - Project GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.Empty>>}
   */
  public deleteProjectV2(
    params: CodeEngineV2.DeleteProjectV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['projectGuid'];
    const _validParams = ['projectGuid', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_guid': _params.projectGuid,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteProjectV2'
    );

    const parameters = {
      options: {
        url: '/projects/{project_guid}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * reclamation
   ************************/

  /**
   * List all reclamations.
   *
   * List reclamations.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2ReclamationList>>}
   */
  public listReclamationsV2(
    params?: CodeEngineV2.ListReclamationsV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2ReclamationList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listReclamationsV2'
    );

    const parameters = {
      options: {
        url: '/reclamations',
        method: 'GET',
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
   * Get a reclamation.
   *
   * Get a reclamation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectGuid - Project GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2Reclamation>>}
   */
  public getReclamationV2(
    params: CodeEngineV2.GetReclamationV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2Reclamation>> {
    const _params = { ...params };
    const _requiredParams = ['projectGuid'];
    const _validParams = ['projectGuid', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_guid': _params.projectGuid,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getReclamationV2'
    );

    const parameters = {
      options: {
        url: '/reclamations/{project_guid}',
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
   * Reclaim a reclamation.
   *
   * Reclaim a reclaimation to hard delete a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectGuid - Project GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2Reclamation>>}
   */
  public reclaimReclamationV2(
    params: CodeEngineV2.ReclaimReclamationV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2Reclamation>> {
    const _params = { ...params };
    const _requiredParams = ['projectGuid'];
    const _validParams = ['projectGuid', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_guid': _params.projectGuid,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'reclaimReclamationV2'
    );

    const parameters = {
      options: {
        url: '/reclamations/{project_guid}/reclaim',
        method: 'POST',
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
   * Restore a reclamation.
   *
   * Restore a reclaimation which restores a soft-deleted project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectGuid - Project GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CodeEngineV2.Response<CodeEngineV2.V2Reclamation>>}
   */
  public restoreReclamationV2(
    params: CodeEngineV2.RestoreReclamationV2Params
  ): Promise<CodeEngineV2.Response<CodeEngineV2.V2Reclamation>> {
    const _params = { ...params };
    const _requiredParams = ['projectGuid'];
    const _validParams = ['projectGuid', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_guid': _params.projectGuid,
    };

    const sdkHeaders = getSdkHeaders(
      CodeEngineV2.DEFAULT_SERVICE_NAME,
      'v2',
      'restoreReclamationV2'
    );

    const parameters = {
      options: {
        url: '/reclamations/{project_guid}/restore',
        method: 'POST',
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
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listConfigmapsV2` operation. */
  export interface ListConfigmapsV2Params {
    /** Refresh Token. */
    refreshToken: string;
    /** Project GUID. */
    projectGuid: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createConfigmapV2` operation. */
  export interface CreateConfigmapV2Params {
    /** Refresh Token. */
    refreshToken: string;
    /** Project GUID. */
    projectGuid: string;
    created?: string;
    data?: JsonObject;
    id?: string;
    immutable?: boolean;
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfigmapV2` operation. */
  export interface GetConfigmapV2Params {
    /** Refresh Token. */
    refreshToken: string;
    /** Project GUID. */
    projectGuid: string;
    /** ConfigMap name. */
    configmapName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfigmapV2` operation. */
  export interface DeleteConfigmapV2Params {
    /** Refresh Token. */
    refreshToken: string;
    /** Project GUID. */
    projectGuid: string;
    /** ConfigMap name. */
    configmapName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateConfigmapV2` operation. */
  export interface UpdateConfigmapV2Params {
    /** Refresh Token. */
    refreshToken: string;
    /** Project GUID. */
    projectGuid: string;
    /** Configmap name. */
    configmapName: string;
    created?: string;
    data?: JsonObject;
    id?: string;
    immutable?: boolean;
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProjectsV2` operation. */
  export interface ListProjectsV2Params {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProjectV2` operation. */
  export interface CreateProjectV2Params {
    /** Specify the project name. */
    name?: string;
    /** Specify the id of the regin (us-south, eu-de). */
    region?: string;
    /** Specify the resource group. */
    resourceGroupId?: string;
    /** resource instance tags. */
    tags?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProjectV2` operation. */
  export interface GetProjectV2Params {
    /** Project GUID. */
    projectGuid: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProjectV2` operation. */
  export interface DeleteProjectV2Params {
    /** Project GUID. */
    projectGuid: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listReclamationsV2` operation. */
  export interface ListReclamationsV2Params {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReclamationV2` operation. */
  export interface GetReclamationV2Params {
    /** Project GUID. */
    projectGuid: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `reclaimReclamationV2` operation. */
  export interface ReclaimReclamationV2Params {
    /** Project GUID. */
    projectGuid: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `restoreReclamationV2` operation. */
  export interface RestoreReclamationV2Params {
    /** Project GUID. */
    projectGuid: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** PaginationListNextMetadata. */
  export interface PaginationListNextMetadata {
    href?: string;
    start?: string;
  }

  /** V2ConfigMap. */
  export interface V2ConfigMap {
    created?: string;
    data?: JsonObject;
    id?: string;
    immutable?: boolean;
    name?: string;
    type?: string;
  }

  /** V2ConfigMapList. */
  export interface V2ConfigMapList {
    configmaps?: V2ConfigMap[];
    limit?: number;
    next?: PaginationListNextMetadata;
  }

  /** V2Project. */
  export interface V2Project {
    account_id?: string;
    created?: string;
    crn?: string;
    details?: string;
    id?: string;
    name?: string;
    reason?: string;
    region?: string;
    resource_group_id?: string;
    status?: string;
    type?: string;
  }

  /** V2ProjectList. */
  export interface V2ProjectList {
    limit?: number;
    next?: PaginationListNextMetadata;
    projects?: V2Project[];
  }

  /** V2Reclamation. */
  export interface V2Reclamation {
    account_id?: string;
    details?: string;
    id?: string;
    project_id?: string;
    reason?: string;
    resource_group_id?: string;
    status?: string;
    target_time?: string;
    type?: string;
  }

  /** V2ReclamationList. */
  export interface V2ReclamationList {
    reclamations?: V2Reclamation[];
  }
}

export = CodeEngineV2;
