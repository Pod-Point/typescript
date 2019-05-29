export class SNS {
    public publish: () => Request = jest.fn(() => new Request());
}

export class Request { // tslint:disable-line max-classes-per-file
    public promise: () => Promise<Response> = jest.fn(() => Promise.resolve({
        MessageId: 'someMessageId',
    }));
}

export interface Response {
    MessageId: string;
}
