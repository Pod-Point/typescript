import { SNS } from 'aws-sdk';
import NotificationInterface from '../types/notifications/Notification';

export default class Notification implements NotificationInterface<SNS.Types.PublishResponse> {
    public message: string;
    public topicARN: string;
    public config: SNS.ClientConfiguration = {};
    public id?: string;
    public messageAttributes: SNS.MessageAttributeMap = {};

    public constructor(
        message: string,
        topicARN: string,
        config?: SNS.ClientConfiguration,
        messageAttributes?: SNS.MessageAttributeMap,
    ) {
        this.message = message;
        this.topicARN = topicARN;
        this.config = config;
        this.messageAttributes = messageAttributes;
    }

    /**
     * Publishes the notification to AWS SNS.
     */
    public async dispatch(): Promise<SNS.Types.PublishResponse> {
        const message: SNS.Types.PublishInput = {
            Message: this.message,
            MessageAttributes: this.messageAttributes,
            TopicArn: this.topicARN,
        };

        return new SNS(this.config || {})
            .publish(message)
            .promise()
            .then((response: SNS.Types.PublishResponse) => {
                this.id = response.MessageId;

                return response;
            });
    }
}
