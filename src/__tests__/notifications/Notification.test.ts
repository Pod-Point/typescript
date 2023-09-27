import Notification from '../../notifications/Notification';
import { PublishCommand, ServiceInputTypes, ServiceOutputTypes, SNSClient } from '@aws-sdk/client-sns';
import { AwsStub, mockClient } from 'aws-sdk-client-mock';

const snsMock: AwsStub<ServiceInputTypes, ServiceOutputTypes, any> = mockClient(SNSClient);

describe('notifications/Notification', () => {
    describe('dispatch', () => {
        it('publishes a notification to AWS SNS', async () => {
            // tslint:disable-line max-line-length
            snsMock.on(PublishCommand).resolves({ MessageId: 'someMessageId' });
            const notification: Notification = new Notification('message', 'arn:aws:sns:region:id:topic', {
                region: 'eu-west-1',
            });

            await notification.dispatch();

            expect(notification.id).toBe('someMessageId');
        });
    });
});
