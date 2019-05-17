export default interface Transformer<I = any, O = any> {
    /**
     * Transforms the given value.
     */
    transform(value: I): O;
}
