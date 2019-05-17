import PayloadTransformer from '../../transformers/PayloadTransformer';

describe('transformers/PayloadTransformer', () => {
    const transformer: PayloadTransformer = new PayloadTransformer();

    it('correctly transforms a snake case property to camel case', () => {
        const result: any = transformer.transform({
            example_key: 'example value',
        });

        expect(result).toEqual({
            exampleKey: 'example value',
        });
    });

    it('correctly transforms an array of snake cased properties to camel case', () => {
        const result: any = transformer.transform([
            {
                example_key: 'example value',
            },
            {
                another_example_key: 'example value',
            },
        ]);

        expect(result).toEqual([
            {
                exampleKey: 'example value',
            },
            {
                anotherExampleKey: 'example value',
            },
        ]);
    });

    it('correctly transforms a nested object of snake cased properties to camel case', () => {
        const result: any = transformer.transform({
            example_key: {
                another_example_key: 'example value',
            },
        });

        expect(result).toEqual({
            exampleKey: {
                anotherExampleKey: 'example value',
            },
        });
    });

    it('correctly transforms an array', () => {
        const result: any = transformer.transform([1, 23, 45]);

        expect(result).toEqual([1, 23, 45]);
    });
});
