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
     * Return serialized attributes.
     */
    public serialized(): Attributes {
        return JSON.parse(JSON.stringify(this));
    }

    /**
     * Fills the models relations.
     */
    protected hydrateRelations(attributes: Attributes): void {
        //
    }
}
