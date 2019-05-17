import Client from '../types/http/Client';
import Response from '../types/http/Response';

export default abstract class Service {
    protected readonly client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    /**
     * Returns the client.
     */
    public getClient(): Client {
        return this.client;
    }

    /**
     * Returns the main data from the payload.
     */
    public getPayload(response: Response, namespace?: string): any {
        return !namespace ? response.data : response.data[namespace];
    }
}
