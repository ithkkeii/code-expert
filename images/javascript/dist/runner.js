"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vm_1 = require("vm");
const worker_threads_1 = require("worker_threads");
const utils_1 = require("./utils");
if (!worker_threads_1.parentPort) {
    throw new Error('parent port not found');
}
const messagePort = worker_threads_1.parentPort;
const { code } = worker_threads_1.workerData;
const logs = [];
let result = null;
const handleLogs = () => {
    return {
        log: (...args) => {
            if (logs.length > 20) {
                // Stop log if too long
                return;
            }
            const log = args.map((arg) => (0, utils_1.format)(arg)).join(' ');
            logs.push(log);
        },
    };
};
const sandboxContext = (0, vm_1.createContext)({
    require,
    Array,
    Set,
    Map,
    console: handleLogs(),
    getResult: (r) => {
        result = r;
    },
});
messagePort.on('message', (msg) => {
    if (msg === 'ping') {
        // I'm ready!
        messagePort.postMessage('pong');
        // Solution is checked before pass into runner, it's not possible to fail here.
        const script = new vm_1.Script(code);
        script.runInContext(sandboxContext);
        messagePort.postMessage({ result, logs });
    }
});
