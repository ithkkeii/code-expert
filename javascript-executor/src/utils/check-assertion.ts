import { expect as chaiExpect } from 'chai';

interface AssertionResult {
  pass: boolean;
  result: string;
  expected: string;
}

export const checkAssertion = (
  result: string,
  assertion: string,
): AssertionResult => {
  try {
    const expect = chaiExpect;
    const assertFunc = new Function(
      'expect',
      `return ${assertion.replace('%result%', result)}`,
    );
    assertFunc(expect);

    return {
      pass: true,
      expected: result,
      result,
    };
  } catch (err: unknown) {
    const expected = (err as any)?.expected;

    return {
      pass: false,
      expected,
      result,
    };
  }
};
