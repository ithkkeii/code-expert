import { writeFile } from 'fs/promises';
import { getSolution } from './utils/get-solution';
import { getInputs } from './utils/get-inputs';
import { checkSyntax } from './utils/check-syntax';
import { getFuncName } from './utils/get-func-name';
import { createRunner } from './utils/create-runner';
import { runTask } from './utils/run-task';
import { makeAssertion } from './utils/make-assertion';
import { cwd } from 'process';

const main = async () => {
  const solution = await getSolution();
  const inputs = await getInputs();
  const funcName = await getFuncName();

  const prePreparedCode = `const _ = require('lodash');`;
  await checkSyntax(solution, prePreparedCode);

  let runner = createRunner();
  let result = '';
  for (const [index, input] of inputs.entries()) {
    const { id, content, assertion } = input;
    const code = `${prePreparedCode}\n${solution}\ngetResult(${funcName}(${content}))`;
    const isLastTask = index === inputs.length - 1;

    const doneTask = await runTask({
      runner,
      code,
    });

    // const response = makeAssertion({ id, doneTask, assertion });
    await writeFile(
      `${cwd()}/dist/data/result-${id}.txt`,
      JSON.stringify({ id, ...doneTask }),
    );

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

main();
