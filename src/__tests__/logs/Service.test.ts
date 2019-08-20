import Service from '../../logs/Service';
import Log from '../../types/logs/Log';

jest.mock('aws-sdk');

describe('logs/Service', () => {
    describe('create', () => {
        it('creates a log in AWS Kinesis', async () => { // tslint:disable-line max-line-length
            const service: Service = new Service('someStreamName', 'somePartitionKey');

            const log: Log = await service.create('someMessage');

            expect(log.id).toBe('someSequenceNumber');
        });
    });
});
