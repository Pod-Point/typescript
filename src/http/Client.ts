import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { default as ClientInterface } from '../types/http/Client';
import RequestParams from '../types/http/RequestParams';
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
    public get(path: string, params: RequestParams = {}): Promise<Response> {
        const config: AxiosRequestConfig = {};

        const { headers, ...query }: RequestParams = params;

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
    public post(path: string, params: RequestParams = {}): Promise<Response> {
        const { data, ...config }: AxiosRequestConfig = this.parseParamsToConfig(params);

        return this.client.post(path, data, config);
    }

    /**
     * Makes a PATCH request to the API.
     */
    public patch(path: string, params: RequestParams = {}): Promise<Response> {
        const { data, ...config }: AxiosRequestConfig = this.parseParamsToConfig(params);

        return this.client.patch(path, data, config);
    }

    /**
     * Makes a PUT request to the API.
     */
    public put(path: string, params: RequestParams = {}): Promise<Response> {
        const { data, ...config }: AxiosRequestConfig = this.parseParamsToConfig(params);

        return this.client.put(path, data, config);
    }

    /**
     * Makes a DELETE request to the API.
     */
    public delete(path: string, params: RequestParams = {}): Promise<Response> {
        const config: AxiosRequestConfig = {};

        const { headers, ...query }: RequestParams = params;

        if (headers) {
            config.headers = headers;
        }

        if (query) {
            config.params = query;
        }

        return this.client.delete(path, config);
    }

    /**
     * Parse request params into axios request config.
     */
    private parseParamsToConfig(params: RequestParams): AxiosRequestConfig {
        const config: AxiosRequestConfig = {};
        const { headers, query, data, ...rest }: RequestParams = params;

        if (headers) {
            config.headers = headers;
        }

        if (query) {
            config.params = query;
        }

        if (data || Object.keys(rest).length) {
            config.data = data ?? rest;
        }

        return config;
    }
}
