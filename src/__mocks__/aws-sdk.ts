// tslint:disable max-classes-per-file

export class SNS {
    public publish: () => SNSRequest = jest.fn(() => new SNSRequest());
}

export class SNSRequest {
    public promise: () => Promise<SNSResponse> = jest.fn(() => Promise.resolve({
        MessageId: 'someMessageId',
    }));
}

export interface SNSResponse {
    MessageId: string;
}

export class Kinesis {
    public putRecord: () => KinesisRequest = jest.fn(() => new KinesisRequest());
}

export class KinesisRequest {
    public promise: () => Promise<KinesisResponse> = jest.fn(() => Promise.resolve({
        SequenceNumber: 'someSequenceNumber',
    }));
}

export interface KinesisResponse {
    SequenceNumber: string;
}
