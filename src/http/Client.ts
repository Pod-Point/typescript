import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as _ from 'lodash';
import { default as ClientInterface } from '../types/http/Client';
import Response from '../types/http/Response';

export default class Client implements ClientInterface {
    protected readonly client: AxiosInstance;

    public constructor(
        userAgent: string,
        domain: string,
        prefix: string = '/api/',
    ) {
        this.client = axios.create({
            baseURL: domain + prefix,
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'None',
                'Content-Type': 'application/json',
                'User-Agent': userAgent,
            },
        });
    }

    /**
     * Makes a GET request to the API.
     */
    public get(path: string, params: object = {}): Promise<Response> {
        const config: AxiosRequestConfig = {};
        const headers: object = _.get(params, 'headers');
        const query: object = _.omit(params, ['headers']);

        if (headers) {
            config.headers = headers;
        }

        if (query) {
            config.params = query;
        }

        return this.client.get(path, config);
    }

    /**
     * Makes a POST request to the API.
     */
    public post(path: string, params: object = {}): Promise<Response> {
        const config: AxiosRequestConfig = {};
        const headers: object = _.get(params, 'headers');
        const query: object = _.get(params, 'query');
        const data: object = _.omit(params, ['headers', 'query']);

        if (headers) {
            config.headers = headers;
        }

        if (query) {
            config.params = query;
        }

        return this.client.post(path, data, config);
    }

    /**
     * Makes a PATCH request to the API.
     */
    public patch(path: string, params: object = {}): Promise<Response> {
        const config: AxiosRequestConfig = {};
        const headers: object = _.get(params, 'headers');
        const query: object = _.get(params, 'query');
        const data: object = _.omit(params, ['headers', 'query']);

        if (headers) {
            config.headers = headers;
        }

        if (query) {
            config.params = query;
        }

        return this.client.patch(path, data, config);
    }

    /**
     * Makes a DELETE request to the API.
     */
    public delete(path: string, params: object = {}): Promise<Response> {
        const config: AxiosRequestConfig = {};
        const headers: object = _.get(params, 'headers');
        const query: object = _.omit(params, ['headers']);

        if (headers) {
            config.headers = headers;
        }

        if (query) {
            config.params = query;
        }

        return this.client.delete(path, config);
    }
}
