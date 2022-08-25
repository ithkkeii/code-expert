import { inspect } from 'util';

// we're trying to mimic console.log, so we avoid wrapping strings in quotes
export const format = (input: unknown) => {
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
    return `Map(${input.size}) {${Array.from(
      input.entries(),
      ([k, v]) => `${k} => ${v}`,
    ).join(', ')}})`;
  }

  if (typeof input === 'bigint') {
    return input.toString() + 'n';
  }

  if (typeof input === 'symbol') {
    return input.toString();
  }

  return inspect(input);
};
