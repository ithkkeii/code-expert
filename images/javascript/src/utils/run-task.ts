import { hrtime } from 'process';
import { Worker } from 'worker_threads';

type Options = {
  runner: Worker;
  code: string;
};

const TIME_LIMIT = 500;

export interface TaskSuccessRes {
  result: string;
  error: null;
  logs: [];
  time: string;
}

export interface TaskTimeoutRes {
  result: null;
  error: string;
  logs: [];
  time: string;
}

export const runTask = (options: Options) => {
  const { code, runner } = options;

  runner.removeAllListeners();

  // Analysis helper
  let timeout: NodeJS.Timeout | null = null;
  let timeStart = hrtime();

  return new Promise<TaskSuccessRes | TaskTimeoutRes>((resolve, reject) => {
    runner.on('message', (msg) => {
      if (timeout) clearTimeout(timeout);

      // Calc time
      const timeStop = hrtime(timeStart);
      const timeConsumed = String((timeStop[0] * 1e9 + timeStop[1]) / 1e9);

      resolve({ ...msg, error: null, time: timeConsumed });

      return;
    });

    // Comm with worker
    runner.postMessage(code);

    timeout = setTimeout(
      () =>
        resolve({
          error: 'too slow bitch!',
          result: null,
          logs: [],
          time: String(TIME_LIMIT / 1000),
        }),
      TIME_LIMIT,
    );
    timeStart = hrtime();
  });
};
