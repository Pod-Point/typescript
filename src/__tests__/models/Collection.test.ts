import Collection from '../../models/Collection';
import ExampleModelFactory from '../factories/ExampleModelFactory';
import ExampleModelAttributes from '../types/ExampleModelAttributes';
import ExampleModel from './ExampleModel';

describe('models/Collection', () => {
    const factory: ExampleModelFactory = new ExampleModelFactory();

    it('is an array', async () => {
        const array: number[] = [1, 2, 3];
        const collection: Collection<number> = new Collection(...array);

        expect(collection).toEqual(expect.arrayContaining(array));
        expect(collection).toHaveLength(3);
        expect(collection).toContain(3);
        expect(collection.getMeta()).toEqual(null);
    });

    it('can store models and meta data', async () => {
        const fakePayload: ExampleModelAttributes = factory.payload();
        const fakeData: ExampleModelAttributes = factory.transform(fakePayload);
        const fakeModel1: ExampleModel = factory.model(fakeData);
        const fakeModel2: ExampleModel = factory.model(fakeData);
        const meta: object = {
            totals: {
                all: 11.5,
                average: 4.67,
            },
        };

        const array: ExampleModel[] = [fakeModel1, fakeModel2];
        const collection: Collection<ExampleModel, object> = new Collection(...array);
        collection.setMeta(meta);

        expect(collection.getMeta()).toMatchObject(meta);
        collection.forEach((model: ExampleModel, index: number) => {
            expect(model).toMatchObject(array[index]);
        });
    });
});
