import {
    KinesisClient,
    KinesisClientConfig,
    PutRecordCommand,
    PutRecordCommandOutput,
    PutRecordInput,
} from '@aws-sdk/client-kinesis';
import Log from '../types/logs/Log';
import LogService from '../types/logs/Service';

export default class Service implements LogService {
    public streamName: string;
    public partitionKey: string;
    public config: KinesisClientConfig = {};

    public constructor(streamName: string, partitionKey: string, config: KinesisClientConfig) {
        this.streamName = streamName;
        this.partitionKey = partitionKey;
        this.config = config;
    }

    /**
     * Creates a log in AWS Kinesis.
     */
    public async create(message: string): Promise<Log> {
        const input: PutRecordInput = {
            Data: new TextEncoder().encode(message),
            PartitionKey: this.partitionKey,
            StreamName: this.streamName,
        };
        const command: PutRecordCommand = new PutRecordCommand(input);
        const client: KinesisClient = new KinesisClient(this.config);
        const response: PutRecordCommandOutput = await client.send(command);

        return {
            id: response.SequenceNumber,
            message,
        };
    }
}
