import * as _ from 'lodash';
import PayloadTransformer from '../transformers/PayloadTransformer';
import Transformer from '../types/transformers/Transformer';
import Factory from './Factory';

export default abstract class PayloadFactory<Model, Attributes, Payload = Attributes> extends Factory<Model, Attributes> { // tslint:disable-line max-line-length
    protected readonly transformer: Transformer;

    /**
     * @param {Transformer} transformer
     */
    public constructor(transformer?: Transformer) {
        super();

        if (!transformer) {
            this.transformer = new PayloadTransformer();
        } else {
            this.transformer = transformer;
        }
    }

    /**
     * Transforms the given payload.
     */
    public transform(payload: Payload): Attributes {
        return this.transformer.transform(payload);
    }

    /**
     * Returns the fake payload for this model.
     */
    public payload(attributes: object = {}): Payload {
        const stateAttributes: any = this.getCurrentStateAttributes();

        return _.merge({}, stateAttributes, attributes);
    }

    /**
     * Returns the payload overrides for the different states this model.
     */
    protected statePayloads(): object {
        return {};
    }

    /**
     * Returns the fake attributes for this model.
     */
    protected attributes(): Attributes {
        return this.transformer.transform(this.payload());
    }

    /**
     * Returns the attribute overrides for the different states this model.
     */
    protected stateAttributes(): object {
        const statePayloads: object = this.statePayloads();

        return Object.keys(statePayloads).reduce(
            (accumulator: object, state: string) => {
                accumulator[state] = this.transformer.transform(statePayloads[state]);

                return accumulator;
            },
            {},
        );
    }
}
