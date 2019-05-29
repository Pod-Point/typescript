import { SNS } from 'aws-sdk';
import NotificationInterface from '../types/notifications/Notification';

export default class Notification implements NotificationInterface<SNS.Types.PublishResponse> {
    public message: string;
    public topicARN: string;
    public config: SNS.ClientConfiguration = {};
    public id?: string;

    public constructor(message: string, topicARN: string, config?: SNS.ClientConfiguration) {
        this.message = message;
        this.topicARN = topicARN;
        this.config = config;
    }

    /**
     * Publishes the notification to AWS SNS.
     */
    public async dispatch(): Promise<SNS.Types.PublishResponse> {
        const message: SNS.Types.PublishInput = {
            Message: this.message,
            TopicArn: this.topicARN,
        };

        const response: SNS.Types.PublishResponse = await new SNS(this.config || {})
            .publish(message)
            .promise();

        this.id = response.MessageId;

        return Promise.resolve(response);
    }
}
