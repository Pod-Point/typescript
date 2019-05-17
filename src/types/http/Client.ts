import Response from './Response';

export default interface Client {
    get: (path: string, params: object) => Promise<Response>;
    post: (path: string, params: object) => Promise<Response>;
    patch: (path: string, params: object) => Promise<Response>;
    delete: (path: string, params: object) => Promise<Response>;
}
