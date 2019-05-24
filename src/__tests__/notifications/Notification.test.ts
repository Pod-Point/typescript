import Notification from '../../notifications/Notification';

jest.mock('aws-sdk');

describe('notifications/Notification', () => {
    describe('dispatch', () => {
        it('publishes a notification to AWS SNS', async () => { // tslint:disable-line max-line-length
            const notification: Notification = new Notification('message', 'arn:aws:sns:region:id:topic');

            await notification.dispatch();

            expect(notification.id).toBe('someMessageId');
        });
    });
});
