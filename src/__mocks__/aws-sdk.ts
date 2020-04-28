// tslint:disable max-classes-per-file

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
