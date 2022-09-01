import { cwd } from 'process';
import { Worker } from 'worker_threads';

export const createRunner = () => {
  const path = `${cwd()}/dist/utils/runner.js`;
  const runner = new Worker(path);
  return runner;
};
