import Service from '../../logs/Service';
import Log from '../../types/logs/Log';

import { KinesisClient, PutRecordCommand } from '@aws-sdk/client-kinesis';
import { mockClient } from 'aws-sdk-client-mock';

// tslint:disable-next-line:typedef
const kinesisMock = mockClient(KinesisClient);

describe('logs/Service', () => {
    beforeEach(() => {
        kinesisMock.reset();
    });

    describe('create', () => {
        it('creates a log in AWS Kinesis', async () => {
            kinesisMock.on(PutRecordCommand).resolves({
                SequenceNumber: 'someSequenceNumber',
            });

            const service: Service = new Service('someStreamName', 'somePartitionKey');

            const log: Log = await service.create('someMessage');

            expect(log.id).toBe('someSequenceNumber');
        });
    });
});
