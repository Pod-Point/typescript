import * as _ from 'lodash';
import Transformer from '../types/transformers/Transformer';

export default class PayloadTransformer implements Transformer {
    /**
     * Transforms all the keys within the given object to camel case.
     */
    public transform(object: object): any {
        if (object instanceof Array) {
            return object.map((value: any) => {
                if (this.isObject(value)) {
                    return this.transform(value);
                }

                return value;
            });
        }

        return Object.keys(object).reduce(
            (accumulator: object, key: string) => {
                let value: any = object[key];

                if (this.isObject(value)) {
                    value = this.transform(value);
                }

                const newKey: string = this.transformKey(key);

                accumulator[newKey] = value;

                return accumulator;
            },
            {},
        );
    }

    /**
     * Transforms a given key.
     */
    protected transformKey(key: any): string {
        return _.camelCase(key);
    }

    /**
     * Whether the given value is an object.
     */
    private isObject(value: any): boolean {
        return typeof value === 'object' && value !== null;
    }
}
