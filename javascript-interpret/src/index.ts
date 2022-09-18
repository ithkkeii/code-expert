import { expect } from 'chai';

const data = {
  interpretId: 'random-string',
  lang: 'javascript',
  challengeId: 1,
  dataInput: '[1,2]\n9',
  dataInputSanitizer: 'isArrayOfNum(%replace%)\nisNum(%replace%)',
  sanitizerReplacement: '%replace%',
  typedCode: 'const twoSum = (nums, target) => 2',
  rightSolution: 'const twoSum = (nums, target) => 1',
  funcName: 'twoSum',
};

const isNum = (value: unknown): boolean => typeof value === 'number';
const isArrayOfNum = (values: unknown): boolean => {
  if (!Array.isArray(values)) {
    return false;
  }

  for (const value of values) {
    if (!isNum(value)) return false;
  }

  return true;
};

const main = () => {
  const {
    challengeId,
    dataInput: dataInputStr,
    dataInputSanitizer: dataInputSanitizerStr,
    interpretId,
    rightSolution,
    typedCode,
    sanitizerReplacement,
    funcName,
  } = data;

  const dataInput = dataInputStr.split('\n');
  const dataInputSanitizer = dataInputSanitizerStr.split('\n');

  for (const [index, sanitizer] of dataInputSanitizer.entries()) {
    const isValid = sanitizer.replace(sanitizerReplacement, dataInput[index]);
    if (!isValid) {
      throw new Error('Invalid data input');
    }
  }

  let rightResult: any;
  eval(
    `${rightSolution}; rightResult = ${funcName}(${dataInputStr.replace(
      '\n',
      ','
    )})`
  );

  let userResult: any;
  eval(
    `${typedCode}; userResult = ${funcName}(${dataInputStr.replace('\n', ',')})`
  );

  try {
    expect(userResult).equal(rightResult);
  } catch (err) {
    const res = {
      actual: userResult,
      expect: rightResult,
    };
    console.log(res);
  }
};

main();
