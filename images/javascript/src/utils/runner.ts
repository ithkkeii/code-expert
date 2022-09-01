import { createContext, Script } from 'vm';
import { parentPort } from 'worker_threads';
import { RunnerCannotPrepareException } from '../exceptions/runner-cannot-prepare';
import { format } from '../utils';

const messagePort = parentPort;
const logs: string[] = [];
let result: any = null;

const proxyLog = () => {
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

if (messagePort) {
  messagePort.on('message', (msg) => {
    if (msg === 'ping') {
      messagePort.postMessage('pong');
      return;
    }

    // Why create context here ?
    // For some reasons, if context not re-create, it will keep the const variable initialize
    // in code. Ex: const _ = require('lodash'); -> Identifier '_' has already been declared
    const sandboxContext = createContext({
      require,
      Array,
      Set,
      Map,
      console: proxyLog(),
      getResult: (r: any) => {
        result = r;
      },
    });

    // Receive code
    // Solution is checked before pass into runner, it's not possible to fail here.
    const script = new Script(msg);
    script.runInContext(sandboxContext);

    messagePort.postMessage({ result, logs });
  });
} else {
  throw new RunnerCannotPrepareException();
}
