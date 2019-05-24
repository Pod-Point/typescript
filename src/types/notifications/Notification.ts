export default interface Notification<T = any> {
    id?: string | number;
    message: string;

    /**
     * Dispatches the notification.
     */
    dispatch(): Promise<T>;
}
