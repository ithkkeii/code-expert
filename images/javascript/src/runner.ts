import { createContext, Script } from 'vm';
import { parentPort, workerData } from 'worker_threads';
import { format } from './utils';

if (!parentPort) {
  throw new Error('parent port not found');
}

const messagePort = parentPort;
const { code } = workerData;

const logs: string[] = [];
let result: any = null;
const handleLogs = () => {
  return {
    log: (...args: unknown[]) => {
      if (logs.length > 20) {
        // Stop log if too long
        return;
      }

      const log = args.map((arg) => format(arg)).join(' ');
      logs.push(log);
    },
  };
};

const sandboxContext = createContext({
  require,
  Array,
  Set,
  Map,
  console: handleLogs(),
  getResult: (r: any) => {
    result = r;
  },
});

messagePort.on('message', (msg) => {
  if (msg === 'ping') {
    // I'm ready!
    messagePort.postMessage('pong');

    // Solution is checked before pass into runner, it's not possible to fail here.
    const script = new Script(code);
    script.runInContext(sandboxContext);

    messagePort.postMessage({ result, logs });
  }
});
