import { cwd, hrtime } from 'process';
import { Worker } from 'worker_threads';

export const execRunner = (code: string) => {
  const path = `${cwd()}/dist/runner.js`;

  return new Promise<
    | { error: null; result: string; logs: string[]; time: string }
    | { error: string; time: string }
  >((resolve, reject) => {
    // new Worker can be fail, it will send error through error-event
    const worker = new Worker(path, { workerData: { code } });
    let timeout: NodeJS.Timeout | undefined = undefined;
    let timerStart = hrtime();

    worker.on('online', () => {
      worker.postMessage('ping');
    });

    worker.on('message', async (msg) => {
      // runner is ready!
      if (msg === 'pong') {
        const timeLimit = 500;
        timeout = setTimeout(
          () => resolve({ error: 'too slow bitch!', time: String(timeLimit) }),
          timeLimit,
        );
        timerStart = hrtime();
        return;
      }

      // Calc timer
      const timerStop = hrtime(timerStart);
      const timeConsume = String((timerStop[0] * 1e9 + timerStop[1]) / 1e9);

      // msg type second time runner comm is {result: string, logs: string[]}
      clearTimeout(timeout);
      resolve({ error: null, time: timeConsume, ...msg });
      return;
    });

    worker.on('error', async (_) => {
      // handle any error throw from runner
      clearTimeout(timeout);
      reject({ message: 'runner.js fail to execute' });
      return;
    });

    worker.on('exit', () => {
      reject({ message: 'runner is terminated' });
      return;
    });
  });
};
