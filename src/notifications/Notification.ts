import {
    SNSClient,
    PublishCommand,
    PublishInput,
    SNSClientConfig,
    MessageAttributeValue,
    PublishResponse,
} from '@aws-sdk/client-sns';
import NotificationInterface from '../types/notifications/Notification';

export default class Notification implements NotificationInterface<PublishResponse> {
    public message: string;
    public topicARN: string;
    public config: SNSClientConfig = {};
    public id?: string;
    public messageAttributes?: Record<string, MessageAttributeValue> = {};

    public constructor(
        message: string,
        topicARN: string,
        config: SNSClientConfig,
        messageAttributes?: Record<string, MessageAttributeValue>,
    ) {
        this.message = message;
        this.topicARN = topicARN;
        this.config = config;
        this.messageAttributes = messageAttributes;
    }

    /**
     * Publishes the notification to AWS SNS.
     */
    public async dispatch(): Promise<PublishResponse> {
        const input: PublishInput = {
            TopicArn: this.topicARN,
            Message: this.message,
            MessageAttributes: this.messageAttributes,
        };
        const client: SNSClient = new SNSClient(this.config);
        const command: PublishCommand = new PublishCommand(input);
        const response: PublishResponse = await client.send(command);

        this.id = response.MessageId;

        return response;
    }
}
