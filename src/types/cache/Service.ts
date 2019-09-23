export default interface Service {
    /**
     * Retrieves the keys value from the cache.
     */
    get(key: string): Promise<string>;

    /**
     * Persists the key/value pair in the cache.
     */
    put(key: string, value: any): Promise<void>;

    /**
     * Removes the key/value pair from the cache.
     */
    remove(key: string): Promise<void>;
}
