import { writeFile } from 'fs/promises';
import { Worker } from 'worker_threads';
import { getSolution } from './utils/get-solution';
import { getInputs } from './utils/get-inputs';
import { checkSyntax } from './utils/check-syntax';
import { getFuncName } from './utils/get-func-name';

const createRunner = (code: string) => {
  const path = `${__dirname}/runner.js`;

  return new Promise<{ result: string; logs: string[] }>((resolve, reject) => {
    // new Worker can be fail, it will send error through error-event
    const worker = new Worker(path, { workerData: { code } });
    let timeout: NodeJS.Timeout | undefined = undefined;

    worker.on('online', () => {
      worker.postMessage('ping');
    });

    worker.on('message', async (msg) => {
      // runner is ready!
      if (msg === 'pong') {
        timeout = setTimeout(
          () => reject({ message: 'too slow bitch!' }),
          1000,
        );
        return;
      }

      // msg type second time runner comm is {result: string, logs: string[]}
      resolve(msg);
      clearTimeout(timeout);
    });

    worker.on('error', (err: unknown) => {
      // handle any error throw from runner
      console.log(err);
      clearTimeout(timeout);
      reject({ message: 'runner.js fail to execute' });
    });

    worker.on('exit', () => {});
  });
};

const writeResult_safe = async (params: { data: string; path: string }) => {
  const { data, path } = params;

  try {
    await writeFile(path, data);
  } catch (err) {
    // Do nothing
  }
};

const report = async (params: { testId: string; code: string }) => {
  const { testId, code } = params;
  const path = `${__dirname}/report/${testId}-result.txt`;

  try {
    const { result, logs } = await createRunner(code);

    process.stdout.write(
      JSON.stringify({ id: testId, result, logs, error: '' }),
    );
    // await writeResult_safe({
    //   path,
    //   data: JSON.stringify({ result, logs, error: '' }),
    // });
  } catch (err: any) {
    process.stdout.write(
      JSON.stringify({
        id: testId,
        result: null,
        logs: [],
        error: err.message,
      }),
    );
    // await writeResult_safe({
    //   path,
    //   data: JSON.stringify({ result: null, logs: [], error: err.message }),
    // });
  }

  process.stdout.write('\n');
};

const main = async () => {
  const solution = await getSolution();
  const inputs = await getInputs();
  const funcName = await getFuncName();

  const prePreparedCode = `const _ = require('lodash');`;
  const { error: checkSyntaxErr } = await checkSyntax(
    solution,
    prePreparedCode,
  );
  if (checkSyntaxErr !== null) {
    throw new Error(checkSyntaxErr);
  }

  inputs.forEach((input) => {
    const { id, content } = input;

    const execCode = `getResult(${funcName}(${content}))`;

    const code = `${prePreparedCode}\n${solution}\n${execCode}`;

    report({ testId: id, code });
  });
};

const start = process.hrtime();
main();
const stop = process.hrtime(start);
console.log(
  `Time Taken to execute: ${(stop[0] * 1e9 + stop[1]) / 1e9} seconds`,
);
