import axios, { AxiosStatic } from 'axios';
import * as faker from 'faker';
import Client from '../../http/Client';
import RequestParams from '../../types/http/RequestParams';

jest.mock('axios');
const mockAxios: AxiosStatic = axios as AxiosStatic;

describe('Client', () => {
    axios.create = jest.fn(() => mockAxios);

    const fakeUserAgent: string = 'Some User Agent';
    const fakeDomain: string = `${faker.internet.url()}/`;
    const fakePrefix: string = `${faker.random.word()}/`;
    const fakePath: string = faker.random.word();
    const client: Client = new Client(fakeUserAgent, fakeDomain, fakePrefix);

    it('should create a new axios instance', () => {
        new Client(fakeUserAgent, fakeDomain, fakePrefix); // tslint:disable-line no-unused-expression

        expect(axios.create).toBeCalledWith({
            baseURL: fakeDomain + fakePrefix,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': fakeUserAgent,
            },
        });
    });

    it('should make a get request', () => {
        const params: object = {};

        client.get(fakePath);

        expect(mockAxios.get).toBeCalledWith(fakePath, {
            params,
        });
    });

    it('should make a post request', () => {
        const params: object = {
            y: 'z',
        };

        client.post(fakePath, params);

        expect(mockAxios.post).toBeCalledWith(fakePath, params, {});
    });

    it('should make a patch request', () => {
        const params: object = {
            y: 'z',
        };

        client.patch(fakePath, params);

        expect(mockAxios.patch).toBeCalledWith(fakePath, params, {});
    });

    it('should make a delete request', () => {
        const params: object = {};

        client.delete(fakePath);

        expect(mockAxios.delete).toBeCalledWith(fakePath, {
            params,
        });
    });

    it('should be able to make requests with headers and them be omitted from the query params', () => {
        const headers: object = {
            Authorization: 'Bearer token',
        };
        const query: object = {
            x: 'y',
        };
        const params: object = {
            ...query,
            headers,
        };

        client.get(fakePath, params);

        expect(mockAxios.get).toBeCalledWith(fakePath, {
            headers,
            params: query,
        });
    });

    it('should be able to make post/patch requests with query params and them be omitted from the payload data', () => {
        const query: object = {
            x: 'y',
        };
        const payload: object = {
            y: 'z',
        };
        const params: object = {
            ...payload,
            query,
        };

        client.post(fakePath, params);

        expect(mockAxios.post).toBeCalledWith(fakePath, payload, {
            params: query,
        });
    });

    describe('PUT request', () => {
        it('should be able to make a put request with provided array payload', () => {
            const data: any[] = [
                { uid: 'xxx'},
            ];

            const params: RequestParams = {
                data,
            };

            client.put(fakePath, params);

            expect(mockAxios.put).toBeCalledWith(fakePath, data, {});
        });

        it('should be able to make a put request with provided object payload', () => {
            const params: RequestParams = {
                headers: 'some extra header',
                uid: 'xxx',
            };

            client.put(fakePath, params);

            expect(mockAxios.put).toBeCalledWith(fakePath, { uid: 'xxx' }, { headers: 'some extra header' });
        });
    });
});
