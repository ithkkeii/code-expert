import { getSolution } from './utils/get-solution';
import { getInputs } from './utils/get-inputs';
import { checkSyntax } from './utils/check-syntax';
import { getFuncName } from './utils/get-func-name';
import { createRunner } from './utils/create-runner';
import { runTask } from './utils/run-task';
import { makeAssertion } from './utils/make-assertion';

const main = async () => {
  const solution = await getSolution();
  const inputs = await getInputs();
  const funcName = await getFuncName();

  const prePreparedCode = `const _ = require('lodash');`;
  await checkSyntax(solution, prePreparedCode);

  let runner = createRunner();

  for (const [index, input] of inputs.entries()) {
    const { id, content, assertion } = input;
    const code = `${prePreparedCode}\n${solution}\ngetResult(${funcName}(${content}))`;
    const isLastTask = index === inputs.length - 1;

    const doneTask = await runTask({
      runner,
      code,
    });

    const response = makeAssertion({ id, doneTask, assertion });
    console.log(JSON.stringify(response), '\n');

    // Terminate runner & re-create when timeout occur cause runner will be hung
    if (doneTask.error && !isLastTask) {
      await runner.terminate();
      runner = createRunner();
    }

    if (isLastTask) {
      await runner.terminate();
    }
  }
};

// main();

const starts = Date.now();
const test = async () => {
  const start = process.hrtime();
  await main();
  const stop = process.hrtime(start);
  console.log('took: ', (stop[0] * 1e9 + stop[1]) / 1e9);
};

test();
