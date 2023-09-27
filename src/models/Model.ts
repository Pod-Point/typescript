export default abstract class Model<Attributes> {
    public constructor(attributes: Attributes) {
        this.hydrate(attributes);
    }

    /**
     * Fills the models attributes.
     */
    public hydrate(attributes: Attributes): void {
        Object.assign(this, attributes);

        this.hydrateRelations(attributes);
    }

    /**
     * Returns serializable attributes.
     */
    public toSerializable(): Attributes {
        return JSON.parse(JSON.stringify(this));
    }

    /**
     * Fills the models relations.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected hydrateRelations(attributes: Attributes): void {
        //
    }
}
