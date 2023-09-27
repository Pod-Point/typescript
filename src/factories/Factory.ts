import merge from 'lodash/merge';
import FactoryInterface from '../types/factories/Factory';

export default abstract class Factory<Model, Attributes> implements FactoryInterface<Model, Attributes> {
    protected currentStates: string[] = [];

    /**
     * Sets the current states of this model.
     */
    public states(states: string[]): this {
        this.currentStates = states;

        return this;
    }

    /**
     * Returns the fake attributes for this model.
     */
    public data(attributes: object = {}): Attributes {
        const defaultAttributes: Attributes = this.attributes();
        const stateAttributes: object = this.getCurrentStateAttributes();

        return merge({}, defaultAttributes, stateAttributes, attributes);
    }

    /**
     * Returns the fake instance of this model.
     */
    public abstract model(attributes: object): Model;

    /**
     * Returns the fake attributes for this model.
     */
    protected abstract attributes(): Attributes;

    /**
     * Returns the attribute overrides for the different states this model.
     */
    protected stateAttributes(): object {
        return {};
    }

    /**
     * Returns the standard format date time.
     */
    protected formatDateTime(date: Date): string {
        function addLeadingZeros(value: number): string {
            return `0${value}`.slice(-2);
        }

        const year: number = date.getUTCFullYear();
        const month: string = addLeadingZeros(date.getUTCMonth() + 1);
        const day: string = addLeadingZeros(date.getUTCDate());
        const hour: string = addLeadingZeros(date.getUTCHours());
        const minute: string = addLeadingZeros(date.getUTCMinutes());
        const second: string = addLeadingZeros(date.getUTCSeconds());

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    /**
     * Gets the attribute overrides for the current states.
     */
    protected getCurrentStateAttributes(): object {
        const stateAttributes: object = this.stateAttributes();
        const attributes: object = {};

        if (this.currentStates.length) {
            this.currentStates.map((state: string) => {
                merge(attributes, stateAttributes[state]);
            });

            this.currentStates = [];
        }

        return attributes;
    }
}
