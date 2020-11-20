import RequestParams from './RequestParams';
import Response from './Response';

export default interface Client {
    get: (path: string, params: RequestParams) => Promise<Response>;
    post: (path: string, params: RequestParams) => Promise<Response>;
    patch: (path: string, params: RequestParams) => Promise<Response>;
    delete: (path: string, params: RequestParams) => Promise<Response>;
    put: (path: string, params: RequestParams) => Promise<Response>;
}
