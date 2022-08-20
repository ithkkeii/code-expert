import { getSolution } from './utils/get-solution';
import { getInputs } from './utils/get-inputs';
import { checkSyntax } from './utils/check-syntax';
import { getFuncName } from './utils/get-func-name';
import { makeAssertion } from './utils/make-assertion';

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

  inputs.forEach(async (input) => {
    const { id, content, assertion } = input;

    const code = `${prePreparedCode}\n${solution}\ngetResult(${funcName}(${content}))`;

    const result = await makeAssertion({ id, code, assertion });

    // Comm with executor
    console.log(JSON.stringify(result));
    console.log('---');
  });
};

main();
