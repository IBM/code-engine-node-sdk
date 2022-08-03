/**
 * (C) Copyright IBM Corp. 2021.
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
 * IBM OpenAPI SDK Code Generator Version: 3.15.0-45841b53-20201019-214802
 */


import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The purpose is to provide an API to get Kubeconfig file for IBM Cloud Code Engine Project
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
   * Deprecated soon: Retrieve KUBECONFIG for a specified project.
   *
   * **Deprecated soon**: This API will be deprecated soon. Use the [GET /project/{id}/config](#get-kubeconfig) API
   * instead. Returns the KUBECONFIG file, similar to the output of `kubectl config view --minify=true`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.refreshToken - The IAM Refresh token associated with the IBM Cloud account. To retrieve your
   * IAM token, run `ibmcloud iam oauth-tokens`.
   * @param {string} params.id - The id of the IBM Cloud Code Engine project. To retrieve your project ID, run `ibmcloud
   * ce project get -n <PROJECT_NAME>`.
   * @param {string} [params.accept] - The type of the response: text/plain or application/json. A character encoding
   * can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudCodeEngineV1.Response<string>>}
   */
  public listKubeconfig(params: IbmCloudCodeEngineV1.ListKubeconfigParams): Promise<IbmCloudCodeEngineV1.Response<string>> {
    const _params = { ...params };
    const requiredParams = ['refreshToken', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
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

    return this.createRequest(parameters);
  };

  /**
   * Retrieve KUBECONFIG for a specified project.
   *
   * Returns the KUBECONFIG, similar to the output of `kubectl config view --minify=true`. There are 2 tokens in the
   * Request Header and a query parameter that you must provide.
   *  These values can be generated as follows: 1. Auth Header Pass the generated IAM Token as the Authorization header
   * from the CLI as `token=cat $HOME/.bluemix/config.json | jq .IAMToken -r`. Generate the token with the [Create an
   * IAM access token for a user or service ID using an API
   * key](https://cloud.ibm.com/apidocs/iam-identity-token-api#gettoken-apikey) API.
   *
   * 2. X-Delegated-Refresh-Token Header Generate an IAM Delegated Refresh Token for Code Engine with the [Create an IAM
   * access token and delegated refresh token for a user or service
   * ID](https://cloud.ibm.com/apidocs/iam-identity-token-api#gettoken-apikey-delegatedrefreshtoken) API. Specify the
   * `receiver_client_ids` value to be `ce` and the `delegated_refresh_token_expiry` value to be `3600`.
   *
   * 3. Project ID In order to retrieve the Kubeconfig file for a specific Code Engine project, use the CLI to extract
   * the ID
   * `id=ibmcloud ce project get -n ${CE_PROJECT_NAME} -o jsonpath={.guid}` You must be logged into the account where
   * the project was created to retrieve the ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xDelegatedRefreshToken - This IAM Delegated Refresh Token is specifically valid for Code
   * Engine. Generate this token with the [Create an IAM access token and delegated refresh token for a user or service
   * ID](https://cloud.ibm.com/apidocs/iam-identity-token-api#gettoken-apikey-delegatedrefreshtoken) API. Specify the
   * `receiver_client_ids` value to be `ce` and the `delegated_refresh_token_expiry` value to be `3600`.
   * @param {string} params.id - The id of the IBM Cloud Code Engine project.
   * @param {string} [params.accept] - The type of the response: text/plain or application/json. A character encoding
   * can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudCodeEngineV1.Response<string>>}
   */
  public getKubeconfig(params: IbmCloudCodeEngineV1.GetKubeconfigParams): Promise<IbmCloudCodeEngineV1.Response<string>> {
    const _params = { ...params };
    const requiredParams = ['xDelegatedRefreshToken', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudCodeEngineV1.DEFAULT_SERVICE_NAME, 'v1', 'getKubeconfig');

    const parameters = {
      options: {
        url: '/project/{id}/config',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'X-Delegated-Refresh-Token': _params.xDelegatedRefreshToken,
          'Accept': _params.accept
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace IbmCloudCodeEngineV1 {

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
    /** The IAM Refresh token associated with the IBM Cloud account. To retrieve your IAM token, run `ibmcloud iam
     *  oauth-tokens`.
     */
    refreshToken: string;
    /** The id of the IBM Cloud Code Engine project. To retrieve your project ID, run `ibmcloud ce project get -n
     *  <PROJECT_NAME>`.
     */
    id: string;
    /** The type of the response: text/plain or application/json. A character encoding can be specified by including
     *  a `charset` parameter. For example, 'text/plain;charset=utf-8'.
     */
    accept?: ListKubeconfigConstants.Accept | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listKubeconfig` operation. */
  export namespace ListKubeconfigConstants {
    /** The type of the response: text/plain or application/json. A character encoding can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'. */
    export enum Accept {
      TEXT_PLAIN = 'text/plain',
      APPLICATION_JSON = 'application/json',
    }
  }

  /** Parameters for the `getKubeconfig` operation. */
  export interface GetKubeconfigParams {
    /** This IAM Delegated Refresh Token is specifically valid for Code Engine. Generate this token with the [Create
     *  an IAM access token and delegated refresh token for a user or service
     *  ID](https://cloud.ibm.com/apidocs/iam-identity-token-api#gettoken-apikey-delegatedrefreshtoken) API. Specify the
     *  `receiver_client_ids` value to be `ce` and the `delegated_refresh_token_expiry` value to be `3600`.
     */
    xDelegatedRefreshToken: string;
    /** The id of the IBM Cloud Code Engine project. */
    id: string;
    /** The type of the response: text/plain or application/json. A character encoding can be specified by including
     *  a `charset` parameter. For example, 'text/plain;charset=utf-8'.
     */
    accept?: GetKubeconfigConstants.Accept | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getKubeconfig` operation. */
  export namespace GetKubeconfigConstants {
    /** The type of the response: text/plain or application/json. A character encoding can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'. */
    export enum Accept {
      TEXT_PLAIN = 'text/plain',
      APPLICATION_JSON = 'application/json',
    }
  }

  /*************************
   * model interfaces
   ************************/

}

export = IbmCloudCodeEngineV1;
