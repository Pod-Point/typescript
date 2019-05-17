function polyfill(obj: any, proto: any): any {
    obj.__proto__ = proto;

    return obj;
}

/**
 * Adding custom setPrototypeOf function if not exists to fix the issue with android.
 */
Object.setPrototypeOf = Object.setPrototypeOf || polyfill;
