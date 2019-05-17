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
     * Fills the models relations.
     */
    protected hydrateRelations(attributes: Attributes): void {
        //
    }
}
