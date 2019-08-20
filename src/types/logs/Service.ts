import Log from './Log';

export default interface Service {
    /**
     * Creates a log.
     */
    create(message: string): Promise<Log>;
}
