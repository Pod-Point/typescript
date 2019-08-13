import { Kinesis } from 'aws-sdk';
import Log from '../types/logs/Log';
import LogService from '../types/logs/Service';

export default class Service implements LogService {
    public streamName: string;
    public partitionKey: string;
    public config: Kinesis.ClientConfiguration = {};

    public constructor(streamName: string, partitionKey: string, config?: Kinesis.ClientConfiguration) {
        this.streamName = streamName;
        this.partitionKey = partitionKey;
        this.config = config;
    }

    /**
     * Creates a log in AWS Kinesis.
     */
    public async create(message: string): Promise<Log> {
        return new Kinesis(this.config || {})
            .putRecord({
                Data: message,
                PartitionKey: this.partitionKey,
                StreamName: this.partitionKey,
            })
            .promise()
            .then((response: Kinesis.Types.PutRecordOutput) => {
                return {
                    id: response.SequenceNumber,
                    message,
                };
            });
    }
}
