import { Script } from 'vm';
import { readFile, writeFile } from 'fs/promises';
import { Worker } from 'worker_threads';
import { format } from './utils';

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

const prepareSolution_safe = async (): Promise<string | undefined> => {
  const path = `${__dirname}/data/solution.txt`;
  try {
    const solution = await readFile(path, 'utf-8');
    return solution;
  } catch (_) {
    return undefined;
  }
};

const prepareInputs_safe = async (): Promise<
  | {
      id: string;
      content: string;
    }[]
  | undefined
> => {
  const path = `${__dirname}/data/test-inputs.txt`;

  try {
    const data = await readFile(path, 'utf-8');

    const testInputs = data.split('\n').map((d) => {
      const [id, content] = d.split(' ');
      return { id, content };
    });

    return testInputs;
  } catch (_) {
    return undefined;
  }
};

const checkSyntax_safe = async (params: {
  solution: string;
  prepareCode: string;
}): Promise<{
  error: string | undefined;
}> => {
  const { solution, prepareCode } = params;

  const lineCount = prepareCode.split('\n').length;

  try {
    new Script(`${prepareCode}\n${solution}`, {
      filename: 'solution.js',
      columnOffset: -lineCount,
      lineOffset: -lineCount,
    });
  } catch (err) {
    if (err instanceof Error && err.stack) {
      return { error: err.stack };
    }
  }

  return { error: undefined };
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
  const solution = await prepareSolution_safe();
  if (!solution) {
    // TODO: handle errors
    throw new Error('handle me');
    return;
  }

  const inputs = await prepareInputs_safe();
  if (!inputs) {
    // TODO: handle errors
    throw new Error('handle me');
    return;
  }

  const prepareCode = `const _ = require('lodash');`;

  const { error } = await checkSyntax_safe({ solution, prepareCode });
  if (error) {
    // TODO: handle errors
    throw new Error('handle me');
    return;
  }

  inputs.forEach((input) => {
    const { id, content } = input;

    const execCode = `getResult(fibonacci(${content}))`;

    const code = `${prepareCode}\n${solution}\n${execCode}`;

    report({ testId: id, code });
  });

  return;
};

const start = process.hrtime();
main();
const stop = process.hrtime(start);
console.log(
  `Time Taken to execute: ${(stop[0] * 1e9 + stop[1]) / 1e9} seconds`,
);
