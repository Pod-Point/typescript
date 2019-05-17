export default interface Factory<Model, Attributes> {
    /**
     * Sets the current states of this model.
     */
    states(states: string[]): this;

    /**
     * Returns the fake attributes for this model.
     */
    data(attributes: object): Attributes;

    /**
     * Returns the fake instance of this model.
     */
    model(attributes: object): Model;
}
