import Client from '../http/Client';

/**
 * Returns a test client instance.
 */
export function testClient(): Client {
    return new Client('Test Client', 'http://localhost');
}

/**
 * Returns a jest function which will return a promise of the response data.
 */
export function mockRequest(responseData: object = {}) {
    return jest.fn().mockResolvedValue({
        data: responseData,
    });
}
