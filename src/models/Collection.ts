import '../lib/polyfill';

export default class Collection<Item, Meta = object | null> extends Array<Item> {
    private meta: Meta = null;

    public constructor(...items: Item[]) {
        super(...items);

        // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
        Object.setPrototypeOf(this, Collection.prototype);
    }

    public setMeta(meta: Meta = null): void {
        this.meta = meta;
    }

    public getMeta(): Meta {
        return this.meta;
    }
}
