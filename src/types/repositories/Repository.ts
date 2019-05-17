import * as _ from 'lodash';
import Collection from '../../models/Collection';

export default interface Repository<Model> {
    /**
     * Returns a collection of the model.
     */
    get(params: object): Promise<Collection<Model>>;

    /**
     * Returns an instance of the model.
     */
    find(id: number | string, params: object): Promise<Model>;

    /**
     * Creates and returns an instance of the model.
     */
    create(params: object): Promise<Model | any>;

    /**
     * Updates and returns an instance of the model.
     */
    update(id: number | string, params: object): Promise<Model | any>;

    /**
     * Deletes an instance of the model.
     */
    delete(id: number | string, params: object): Promise<void>;
}
