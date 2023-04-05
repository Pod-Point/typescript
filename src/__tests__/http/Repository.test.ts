import Client from '../../http/Client';
import Collection from '../../models/Collection';
import NetworkError from '../../models/NetworkError';
import ExampleModelFactory from '../factories/ExampleModelFactory';
import ExampleModel from '../models/ExampleModel';
import { mockRequest, testClient } from '../setup';
import ExampleModelAttributes from '../types/ExampleModelAttributes';
import ExampleRepository from './ExampleRepository';

jest.mock('../../http/Client');

describe('repositories/Repository', () => {
    const client: Client = testClient();
    const repository: ExampleRepository = new ExampleRepository(client);
    const factory: ExampleModelFactory = new ExampleModelFactory();
    const endpoint: string = 'example';

    it('calls the api to get an array of the models', async () => {
        const fakePayload: ExampleModelAttributes = factory.payload();
        const fakeData: ExampleModelAttributes = factory.transform(fakePayload);
        const fakeModel: ExampleModel = factory.model(fakeData);
        const params: object = {};
        const meta: object = {
            total: 1,
        };

        // @ts-ignore
        client.get = mockRequest({
            meta,
            [endpoint]: [
                fakePayload,
            ],
        });

        const result: Collection<ExampleModel> = await repository.get(params);

        expect(client.get).toHaveBeenCalledWith(endpoint, params);
        expect(result).toContainEqual(fakeModel);
        expect(result.getMeta()).toEqual({
            meta,
        });
    });

    it('get can handle empty results and will retry', async () => {
        const fakePayload: ExampleModelAttributes = factory.payload();
        const fakeData: ExampleModelAttributes = factory.transform(fakePayload);
        const fakeModel: ExampleModel = factory.model(fakeData);
        const params: object = {};
        const meta: object = {
            total: 1,
        };

        // @ts-ignore
        client.get = jest.fn()
            .mockImplementationOnce(() => Promise.resolve({
                data: {
                    meta,
                    [endpoint]: null,
                },
            }))
            .mockImplementationOnce(() => Promise.resolve({
                data: {
                    meta,
                    [endpoint]: [
                        fakePayload,
                    ],
                },
            }));

        const result: Collection<ExampleModel> = await repository.get(params);

        expect(client.get).toHaveBeenCalledTimes(2);
        expect(result).toContainEqual(fakeModel);
        expect(result.getMeta()).toEqual({
            meta,
        });
    });

    it('Will retry to get 3 times before throwing an Network error exception', async () => {
        const params: object = {};
        const meta: object = {
            total: 0,
        };

        // @ts-ignore
        client.get = jest.fn()
            .mockImplementationOnce(() => Promise.resolve({
                data: {
                    meta,
                    [endpoint]: null,
                },
            }))
            .mockImplementationOnce(() => Promise.resolve({
                data: {
                    meta,
                    [endpoint]: null,
                },
            }))
            .mockImplementationOnce(() => Promise.resolve({
                data: {
                    meta,
                    [endpoint]: null,
                },
            }));

        expect.assertions(2);

        try {
            await repository.get(params);
        } catch (error) {
            expect(client.get).toHaveBeenCalledTimes(3);

            expect(error).toBeInstanceOf(NetworkError);
        }
    });

    it('calls the api to create a new instance of the model', async () => {
        const fakePayload: ExampleModelAttributes = factory.payload();
        const fakeData: ExampleModelAttributes = factory.transform(fakePayload);
        const fakeModel: ExampleModel = factory.model(fakeData);
        const params: ExampleModelAttributes = fakePayload;

        // @ts-ignore
        client.post = mockRequest({
            [endpoint]: fakePayload,
        });

        const result: ExampleModel = await repository.create(params);

        expect(client.post).toHaveBeenCalledWith(endpoint, params);
        expect(result).toEqual(fakeModel);
    });

    it('calls the api to find an instance of the model', async () => {
        const fakePayload: ExampleModelAttributes = factory.payload();
        const fakeData: ExampleModelAttributes = factory.transform(fakePayload);
        const fakeModel: ExampleModel = factory.model(fakeData);
        const params: object = {};

        // @ts-ignore
        client.get = mockRequest({
            [endpoint]: fakePayload,
        });

        const result: ExampleModel = await repository.find(fakeModel.id, params);

        expect(client.get).toHaveBeenCalledWith(`${endpoint}/${fakeModel.id}`, params);
        expect(result).toEqual(fakeModel);
    });

    it('calls the api to update an instance of the model', async () => {
        const fakePayload: ExampleModelAttributes = factory.payload();
        const fakeData: ExampleModelAttributes = factory.transform(fakePayload);
        const fakeModel: ExampleModel = factory.model(fakeData);
        const params: ExampleModelAttributes = fakePayload;

        // @ts-ignore
        client.patch = mockRequest({
            [endpoint]: fakePayload,
        });

        const result: ExampleModel = await repository.update(fakeModel.id, params);

        expect(client.patch).toHaveBeenCalledWith(`${endpoint}/${fakeModel.id}`, params);
        expect(result).toEqual(fakeModel);
    });

    it('calls the api to delete an instance of the model', async () => {
        const fakeModel: ExampleModel = factory.model();
        const params: object = {};

        // @ts-ignore
        client.delete = mockRequest();

        await repository.delete(fakeModel.id, params);

        expect(client.delete).toHaveBeenCalledWith(`${endpoint}/${fakeModel.id}`, params);
    });
});
