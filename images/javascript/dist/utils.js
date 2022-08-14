"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
const util_1 = require("util");
// we're trying to mimic console.log, so we avoid wrapping strings in quotes
const format = (input) => {
    const type = typeof input;
    const isSet = input instanceof Set;
    const isMap = input instanceof Map;
    if (type === 'string') {
        return input;
    }
    if (isSet) {
        return `Set(${input.size}) {${Array.from(input).join(', ')}}`;
    }
    if (isMap) {
        return `Map(${input.size}) {${Array.from(input.entries(), ([k, v]) => `${k} => ${v}`).join(', ')}})`;
    }
    if (typeof input === 'bigint') {
        return input.toString() + 'n';
    }
    if (typeof input === 'symbol') {
        return input.toString();
    }
    return (0, util_1.inspect)(input);
};
exports.format = format;
