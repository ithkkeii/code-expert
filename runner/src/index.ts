import { expect } from 'chai';
import { readFile, writeFile } from 'fs/promises';
import { cwd } from 'process';
import { performance } from 'perf_hooks';

const data = {
  interpretId: 'random-string',
  lang: 'javascript',
  challengeId: 1,
  dataInputSanitizer: 'isArrayOfNum(%replace%)\nisNum(%replace%)',
  sanitizerReplacement: '%replace%',
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

const main = async () => {
  const startTime = performance.now();

  const {
    challengeId,
    dataInputSanitizer: dataInputSanitizerStr,
    interpretId,
    sanitizerReplacement,
  } = data;

  const funcName = await readFile(`${cwd()}/dist/mounts/data/func-name.txt`, {
    encoding: 'utf-8',
  });
  const rightSolution = await readFile(
    `${cwd()}/dist/mounts/data/right-solution.txt`,
    {
      encoding: 'utf-8',
    }
  );
  const typedCode = await readFile(`${cwd()}/dist/mounts/data/typed-code.txt`, {
    encoding: 'utf-8',
  });
  const dataInputStr = await readFile(
    `${cwd()}/dist/mounts/data/data-input.txt`,
    {
      encoding: 'utf-8',
    }
  );

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

  const resultFilePath = `${cwd()}/dist/mounts/report/result.txt`;

  const took = ((performance.now() - startTime) / 1000).toFixed(6);
  try {
    expect(userResult).equal(rightResult);
    await writeFile(
      resultFilePath,
      JSON.stringify({ isSuccess: true, value: String(userResult), took })
    );
  } catch (err) {
    await writeFile(
      resultFilePath,
      JSON.stringify({
        isSuccess: false,
        actual: String(userResult),
        expect: String(rightResult),
        took,
      })
    );
  }
};

main();
