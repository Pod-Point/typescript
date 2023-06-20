import {
    PublishCommand,
    PublishCommandInput,
    PublishCommandOutput,
    SNSClient,
    SNSClientConfig,
} from '@aws-sdk/client-sns';
import NotificationInterface from '../types/notifications/Notification';

export default class Notification implements NotificationInterface<PublishCommandOutput> {
    public message: string;
    public topicARN: string;
    public config: SNSClientConfig = {};
    public id?: string;

    public constructor(message: string, topicARN: string, config?: SNSClientConfig) {
        this.message = message;
        this.topicARN = topicARN;
        this.config = config;
    }

    /**
     * Publishes the notification to AWS SNS.
     */
    public async dispatch(): Promise<PublishCommandOutput> {
        const client: SNSClient = new SNSClient(this.config  || {});
        const input: PublishCommandInput = {
            Message: this.message,
            TopicArn: this.topicARN,
        };
        const command: PublishCommand = new PublishCommand(input);
        const response: PublishCommandOutput = await client.send(command);

        this.id = response.MessageId;

        return response;
    }
}
