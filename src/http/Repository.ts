import * as _ from 'lodash';
import Collection from '../models/Collection';
import PayloadTransformer from '../transformers/PayloadTransformer';
import Client from '../types/http/Client';
import Response from '../types/http/Response';
import RepositoryInterface from '../types/repositories/Repository';
import Transformer from '../types/transformers/Transformer';
import Service from './Service';

export default abstract class Repository<Model, ModelPayload, CreateResponse = Model, UpdateResponse = Model> extends Service implements RepositoryInterface<Model> { // tslint:disable-line max-line-length
    protected endpoint: string;
    protected namespace?: string;
    protected metaKeys: string[] = ['meta', 'links'];
    protected readonly transformer: Transformer = new PayloadTransformer();

    /**
     * Returns the endpoint.
     */
    public getEndpoint(): string {
        return this.endpoint;
    }

    /**
     * Returns the namespace.
     */
    public getNamespace(): string {
        return this.namespace === undefined ? this.endpoint : this.namespace;
    }

    /**
     * Returns the main data from the payload.
     */
    public getPayload(response: Response): any {
        return super.getPayload(response, this.getNamespace());
    }

    /**
     * Returns the meta data from the payload.
     */
    public getPayloadMeta(response: Response): object {
        const meta: object = {};

        this.metaKeys.forEach((key: string) => {
            meta[key] = _.get(response.data, key);
        });

        return meta;
    }

    /**
     * Returns a collection of the model.
     */
    public async get(params: object = {}): Promise<Collection<Model>> {
        const client: Client = this.getClient();
        const endpoint: string = this.getEndpoint();
        let response: Response = await client.get(endpoint, params);
        let payload: ModelPayload[] = this.getPayload(response);

        while (! Array.isArray(payload)) {
            response = await client.get(endpoint, params);
            payload = this.getPayload(response);
        }

        const meta: object = this.getPayloadMeta(response);
        const items: Model[] = payload.map((attributes: ModelPayload) => this.hydrateModel(attributes));

        const collection: Collection<Model> = new Collection(...items);
        collection.setMeta(meta);

        return collection;
    }

    /**
     * Returns an instance of the model.
     */
    public async find(id: number | string, params: object = {}): Promise<Model> {
        const client: Client = this.getClient();
        const endpoint: string = this.getEndpoint();
        const response: Response = await client.get(`${endpoint}/${id}`, params);
        const payload: ModelPayload = this.getPayload(response);

        return this.hydrateModel(payload);
    }

    /**
     * Creates and returns an instance of the model.
     */
    public async create(params: object = {}): Promise<Model | CreateResponse> {
        const client: Client = this.getClient();
        const endpoint: string = this.getEndpoint();
        const response: Response = await client.post(`${endpoint}`, params);
        const payload: ModelPayload = this.getPayload(response);

        return this.hydrateModel(payload);
    }

    /**
     * Updates and returns an instance of the model.
     */
    public async update(id: number | string, params: object = {}): Promise<Model | UpdateResponse> {
        const client: Client = this.getClient();
        const endpoint: string = this.getEndpoint();
        const response: Response = await client.patch(`${endpoint}/${id}`, params);
        const payload: ModelPayload = this.getPayload(response);

        return this.hydrateModel(payload);
    }

    /**
     * Deletes an instance of the model.
     */
    public async delete(id: number | string, params: object = {}): Promise<void> {
        const client: Client = this.getClient();
        const endpoint: string = this.getEndpoint();
        await client.delete(`${endpoint}/${id}`, params);
    }

    /**
     * Instantiates the model.
     */
    protected abstract hydrateModel(payload: ModelPayload): Model;
}
