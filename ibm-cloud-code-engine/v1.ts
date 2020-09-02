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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.12.0-64fe8d3f-20200820-144050
 */
 

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The purpose is to provide an API to get Kubeconfig for IBM Cloud Code Engine Project
 */

class IbmCloudCodeEngineV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://ibm-cloud-code-engine.cloud.ibm.com/api/v1';
  static DEFAULT_SERVICE_NAME: string = 'ibm_cloud_code_engine';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of IbmCloudCodeEngineV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {IbmCloudCodeEngineV1}
   */

  public static newInstance(options: UserOptions): IbmCloudCodeEngineV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new IbmCloudCodeEngineV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /**
   * Construct a IbmCloudCodeEngineV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/api/v1'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {IbmCloudCodeEngineV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(IbmCloudCodeEngineV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * getKubeconfig
   ************************/

  /**
   * Retrieve KUBECONFIG for a specified project.
   *
   * Returns the KUBECONFIG, similar to the output of `kubectl config view --minify=true`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.refreshToken - The IAM Refresh token associated with the IBM Cloud account.
   * @param {string} params.id - The id of the IBM Cloud Code Engine project.
   * @param {string} [params.accept] - The type of the response: application/json or text/html. A character encoding can
   * be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudCodeEngineV1.Response<IbmCloudCodeEngineV1.Empty>>}
   */
  public listKubeconfig(params: IbmCloudCodeEngineV1.ListKubeconfigParams): Promise<IbmCloudCodeEngineV1.Response<IbmCloudCodeEngineV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['refreshToken', 'id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(IbmCloudCodeEngineV1.DEFAULT_SERVICE_NAME, 'v1', 'listKubeconfig');

      const parameters = {
        options: {
          url: '/namespaces/{id}/config',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Refresh-Token': _params.refreshToken,
            'Accept': _params.accept
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

}

/*************************
 * interfaces
 ************************/

namespace IbmCloudCodeEngineV1 {

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listKubeconfig` operation. */
  export interface ListKubeconfigParams {
    /** The IAM Refresh token associated with the IBM Cloud account. */
    refreshToken: string;
    /** The id of the IBM Cloud Code Engine project. */
    id: string;
    /** The type of the response: application/json or text/html. A character encoding can be specified by including
     *  a `charset` parameter. For example, 'text/html;charset=utf-8'.
     */
    accept?: ListKubeconfigConstants.Accept | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listKubeconfig` operation. */
  export namespace ListKubeconfigConstants {
    /** The type of the response: application/json or text/html. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'. */
    export enum Accept {
      APPLICATION_JSON = 'application/json',
      TEXT_HTML = 'text/html',
    }
  }

  /*************************
   * model interfaces
   ************************/

}

export = IbmCloudCodeEngineV1;
