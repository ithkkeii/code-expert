import { hrtime, cwd } from 'process';
import { readFile } from 'fs/promises';
import { ContainerCreateOptions } from 'dockerode';
import { docker } from './start-up';
import { randName } from './utils/rand-name';

interface ExecRes {
  id: number;
  result: string | number;
  logs: string[];
  error: string | null;
  time: string;
}

const waitFile = async (path: string) => {
  return new Promise<string>((resolve, reject) => {
    // console.log('create interval');
    const interval = setInterval(async () => {
      // console.log('check');
      try {
        const data = await readFile(path);
        clearInterval(interval);
        // console.log('clear interval');
        resolve(data.toString('utf-8'));
        return;
      } catch (err) {
        // Do nothing
      }
    }, 50);

    // const timeout = setTimeout(() => {
    //   clearTimeout(timeout);
    //   reject('time out');
    // }, 30000);
  });
};

export const runContainer = async ({
  dataPath,
  inputIds,
}: {
  dataPath: string;
  inputIds: number[];
}): Promise<ExecRes[]> => {
  const options: ContainerCreateOptions = {
    Image: 'js-runner',
    AttachStdout: true,
    name: `JS_${randName()}`,
    WorkingDir: '/app',
    HostConfig: {
      CpuPeriod: 100000,
      CpuQuota: 50000,
      AutoRemove: true,
      Mounts: [
        {
          Target: `/app/dist/data`,
          Source: dataPath,
          Type: 'bind',
          ReadOnly: false,
        },
      ],
    },
  };

  const container = await docker.createContainer(options);
  await container.start();

  // TODO: Split it to multiple response & format result if fail (file never generate)
  // TODO: JSON.parse will fail if data is not json style
  const result = await Promise.all(
    inputIds.map((i) => waitFile(`${dataPath}/result-${i}.txt`)),
  );
  // @ts-ignore
  return result.map((r) => JSON.parse(r) as ExecRes);
  return [];
};
