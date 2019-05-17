import * as faker from 'faker';
import PayloadFactory from '../../factories/PayloadFactory';
import ExampleModel from '../models/ExampleModel';
import ExampleModelAttributes from '../types/ExampleModelAttributes';

export default class ExampleModelFactory extends PayloadFactory<ExampleModel, ExampleModelAttributes> {
    /**
     * Returns the fake instance of this model.
     */
    public model(attributes: object = {}): ExampleModel {
        return new ExampleModel(this.data(attributes));
    }

    /**
     * Returns the fake payload for this model.
     */
    public payload(): ExampleModelAttributes {
        return {
            id: faker.random.number(),
        };
    }
}
