import { writeFile, unlink, mkdir } from 'fs/promises';
import { Container, ContainerCreateOptions } from 'dockerode';
import { docker } from './start-up';
import { randName } from './utils/rand-name';

const image = 'node:16-alpine';
const userCodeFilename = 'solution';
const containerName = `js_${randName()}`;
const workingDir = '/app';
const tempDir = `/temp/${new Date().getDate()}`;
const userId = 1;
// This code send from client, for ban user from multiple submit times.
// user can submit and change challenge to another submit
// w/o this code it's unable for client to know if result is correctly mapped.
const executionCode = randName();

const inputs = ['1', '5', '10', '15'];

const solutionData = `function fibonacci(n) {
  console.log('');
  console.log('hi there', 'there', 1);
  console.log(new Map());
  console.log(new Set(), new Map());
  const a = 1000;
  console.log(a);
  // if (n < 2) return n;
  // return fibonacci(n - 2) + fibonacci(n - 1);
  return 1;
}`;

export const runContainer = async () => {
  const solutionFileDir = `${__dirname}${tempDir}/${userId}/${executionCode}/${userCodeFilename}.js`;
  const inputFileDir = `${__dirname}${tempDir}/${userId}/${executionCode}/inputs.txt`;
  await mkdir(`${__dirname}${tempDir}/${userId}/${executionCode}`, {
    recursive: true,
  });
  await writeFile(solutionFileDir, solutionData);
  await writeFile(inputFileDir, inputs.join('\n'));

  console.time('create');
  console.timeLog('create');
  const [error, container]: [any, Container] = await docker.run(
    image,
    ['echo', 'hi'],
    // ['node', `${userCodeFilename}.js`],
    process.stdout,
    {
      name: containerName,
      WorkingDir: workingDir,
      // HostConfig: {
      //   CpuPeriod: 100000,
      //   CpuQuota: 20000,
      //   AutoRemove: false,
      //   Mounts: [
      //     {
      //       Target: `${workingDir}/${userCodeFilename}.js`,
      //       Source: mountedFilename,
      //       Type: 'bind',
      //       ReadOnly: true,
      //     },
      //   ],
      // },
    } as ContainerCreateOptions,
    {},
  );
  console.timeLog('create');
  console.timeEnd('create');
  console.log(container.id);
};
