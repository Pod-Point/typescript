import Repository from '../../http/Repository';
import ExampleModel from '../models/ExampleModel';
import ExampleModelAttributes from '../types/ExampleModelAttributes';

export default class ExampleRepository extends Repository<ExampleModel, ExampleModelAttributes> {
    protected endpoint: string = 'example';

    /**
     * Instantiates the model.
     */
    protected hydrateModel(attributes: ExampleModelAttributes): ExampleModel {
        return new ExampleModel(attributes);
    }
}
