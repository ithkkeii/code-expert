import { Container } from 'dockerode';
import { docker } from './start-up';
import { randName } from './utils/rand-name';

const FLEET_QUANTITY = 20;

interface Executor {
  value: Container;
  status: 'idle' | 'busy';
}

let executorFleet: Executor[] = [];

export const initExecutorFleet = async () => {
  // TODO: make sure alpine is exist
  const promises = [...Array(FLEET_QUANTITY).keys()].map(() =>
    docker.createContainer({
      name: `JS_${randName()}`,
      Image: 'alpine',
    })
  );
  const containers = await Promise.all(promises);

  for (let index = 0; index < containers.length; index++) {
    executorFleet.push({ value: containers[index], status: 'idle' });
  }
};

const findIdleExecutor = () => {
  const executor = executorFleet.find((e) => e.status === 'idle');
  return executor;
};

const findIdleExecutorRepeatedly = async () => {
  while (true) {
    await wait(0);
    const executor = findIdleExecutor();
    if (executor) return executor;
  }
};

export const consumerHandler = (data: any) => {
  const id = data.offset;

  return new Promise<void>(async (resolve, reject) => {
    console.log('finding idle executor...', id);
    const executor = await findIdleExecutorRepeatedly();

    console.log('start heavily workload ', id);
    executor.status = 'busy';
    heavilyWorkload(10000).then(() => {
      executor.status = 'idle';
      console.log('complete heavily workload ', id);
    });
    resolve();
  });
};

const wait = async (ms: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

const heavilyWorkload = async (ms: number) => wait(ms);
