import { hrtime } from 'process';
import { ContainerCreateOptions } from 'dockerode';
import { docker } from './start-up';
import { randName } from './utils/rand-name';

export const startContainer = async ({ dataPath }: { dataPath: string }) => {
  const options: ContainerCreateOptions = {
    Image: 'js-runner',
    AttachStdout: true,
    name: `JS_${randName()}`,
    WorkingDir: '/app',
    HostConfig: {
      CpuPeriod: 100000,
      CpuQuota: 30000,
      AutoRemove: true,
      Mounts: [
        {
          Target: `/app/dist/data`,
          Source: dataPath,
          Type: 'bind',
          ReadOnly: true,
        },
      ],
    },
  };

  const start = hrtime();
  const container = await docker.createContainer(options);
  const stop = hrtime(start);
  const timeConsume = String((stop[0] * 1e9 + stop[1]) / 1e9);
  console.log('Create container: ', timeConsume);

  function streamToString(stream: any) {
    const chunks: any[] = [];
    return new Promise((resolve, reject) => {
      const start = hrtime();
      stream.on('data', (chunk: any) => {
        chunks.push(Buffer.from(chunk));
      });
      stream.on('error', (err: any) => reject(err));
      stream.on('end', () => {
        const stop = hrtime(start);
        const timeConsume = String((stop[0] * 1e9 + stop[1]) / 1e9);
        console.log('Retrieve data took : ', timeConsume);
        resolve(Buffer.concat(chunks).toString('utf-8'));
      });
    });
  }

  return new Promise(async (resolve, reject) => {
    container.attach(
      { stream: true, stdout: true, stderr: true },
      async function (err, stream) {
        if (err) {
          reject(err.message);
        }

        const result = await streamToString(stream);
        resolve(result);
      },
    );

    const start = hrtime();
    await container.start();
    const stop = hrtime(start);
    const timeConsume = String((stop[0] * 1e9 + stop[1]) / 1e9);
    console.log('Start container: ', timeConsume);
  });
};
