import Service from '../../logs/Service';
import Log from '../../types/logs/Log';
import { AwsStub, mockClient } from 'aws-sdk-client-mock';
import { KinesisClient, PutRecordCommand } from '@aws-sdk/client-kinesis';
import { ServiceInputTypes, ServiceOutputTypes } from '@aws-sdk/client-sns';

const kinesisMock: AwsStub<ServiceInputTypes, ServiceOutputTypes, unknown> = mockClient(KinesisClient);

describe('logs/Service', () => {
    describe('create', () => {
        kinesisMock.on(PutRecordCommand).resolves({ SequenceNumber: 'someSequenceNumber' });
        it('creates a log in AWS Kinesis', async () => {
            const service: Service = new Service('someStreamName', 'somePartitionKey', { region: 'eu-west-1' });

            const log: Log = await service.create('someMessage');

            expect(log.id).toBe('someSequenceNumber');
        });
    });
});
