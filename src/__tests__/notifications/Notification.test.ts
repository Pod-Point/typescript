import Notification from '../../notifications/Notification';

import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { mockClient } from 'aws-sdk-client-mock';

// tslint:disable-next-line:typedef
const snsMock = mockClient(SNSClient);

describe('notifications/Notification', () => {
    beforeEach(() => {
        snsMock.reset();
    });

    describe('dispatch', () => {
        it('publishes a notification to AWS SNS', async () => {
            snsMock.on(PublishCommand).resolves({
                MessageId: 'someMessageId',
            });

            const notification: Notification = new Notification('message', 'arn:aws:sns:region:id:topic');

            await notification.dispatch();

            expect(notification.id).toBe('someMessageId');
        });
    });
});
