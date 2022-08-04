import fs from 'fs';
import { Container, ContainerCreateOptions } from 'dockerode';
import { producer } from '.';
import { docker } from './start-up';
import { SubmittedSolutionMessage } from './interface';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10,
);
// Docker command
// docker run -it -w /app -v $(pwd)/src/solution.js:/app/solution.js -i alpine sh

const fakeData = {
  solution: `function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 2) + fibonacci(n - 1);
  }`,
  functionName: 'fibonacci',
  input: 21,
};

function streamToString(stream: any) {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => {
      chunks.push(Buffer.from(chunk));
    });
    stream.on('error', (err: any) => reject(err));
    stream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf-8'));
    });
  });
}

type Lang = 'JS';

const genUniqName = (lang: Lang) => {
  const name = `${lang}_${nanoid()}`;
  return name;
};

export const handler = async (submittedSolution: SubmittedSolutionMessage) => {
  const { guestId, solution, funcName, testCase, assertStatement, timeLimit } =
    submittedSolution;

  const containerName = genUniqName('JS');
  const fileName = genUniqName('JS');

  // File name inside docker container, no need unique
  const executableFileName = 'solution';

  // Exec environment options
  const execEnvOptions: ContainerCreateOptions = {
    Image: 'node:16-alpine',
    AttachStdout: true,
    name: containerName,
    WorkingDir: '/app',
    Cmd: ['node', `${executableFileName}.js`],
    HostConfig: {
      CpuPeriod: 100000,
      CpuQuota: 2000,
      AutoRemove: true,
      Mounts: [
        {
          Target: `/app/${executableFileName}.js`,
          Source: `${__dirname}/${fileName}.js`,
          Type: 'bind',
          ReadOnly: true,
        },
      ],
    },
  };

  fs.writeFileSync(
    `${__dirname}/${fileName}.js`,
    `${solution}\nconsole.log(JSON.stringify(${testCase.content}))`,
  );

  // let container: Container | null = null;
  // try {
  //   container = await docker.createContainer(execEnvOptions);
  // } catch (err) {
  //   // TODO: log and handle this
  //   console.error(err);
  //   return;
  // }
  const container = await docker.createContainer(execEnvOptions);
  container.attach(
    { stream: true, stdout: true, stderr: true },
    async function (err, stream) {
      if (err) {
        console.error(err);
        return;
      }

      let result = await streamToString(stream);
      fs.unlinkSync(`${__dirname}/${fileName}.js`);

      // Sanitize result
      // TODO: this will remove array and object
      // result = String(result).replace(/[^A-Z0-9]+/gi, '');
      console.log(typeof result);
      console.log(result);
      // await producer!.send({
      //   topic: 'javascript-result',
      //   messages: [
      //     {
      //       key: guestId,
      //       value: JSON.stringify({ guestId, challengeId, result }),
      //     },
      //   ],
      // });
    },
  );
  await container.start();
};
