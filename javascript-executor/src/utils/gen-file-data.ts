import { cwd } from 'process';
import { mkdir, writeFile } from 'fs/promises';
import type { Data, Input } from '../interface';

const inputsTxt = 'test-inputs.txt';
const solutionTxt = 'solution.txt';
const funcNameTxt = 'func-name.txt';

// const fakeSolution = `function sum(a, b) {return a + b}`;
// const fakeFuncName = 'sum';
// const fakeInputs = [
//   { id: 1, content: '10, 20', assertion: 'expect(%result%).to.equal(30)' },
//   {
//     id: 2,
//     content: '10000, 20',
//     assertion: 'expect(%result%).to.equal(10020)',
//   },
//   { id: 3, content: '1, 2', assertion: 'expect(%result%).to.equal(3)' },
//   {
//     id: 4,
//     content: '100000000, 0',
//     assertion: 'expect(%result%).to.equal(100000000)',
//   },
// ];

type Params = {
  submitId: string;
  inputs: Input[];
} & Pick<Data, 'solution' | 'funcName'>;

export const genFileData = async (params: Params): Promise<string> => {
  const { submitId, solution, funcName, inputs } = params;

  const separator = '|';
  const path = `${cwd()}/dist/temp/${new Date().getDay()}/${submitId}`;

  await mkdir(path, { recursive: true });
  await writeFile(
    `${path}/${inputsTxt}`,
    inputs
      .map(
        ({ id, content, assertion }) =>
          `${id}${separator}${content}${separator}${assertion}`,
      )
      .join('\n'),
  );
  await writeFile(`${path}/${solutionTxt}`, solution);
  await writeFile(`${path}/${funcNameTxt}`, funcName);

  return path;
};
