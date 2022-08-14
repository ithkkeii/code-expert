"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vm_1 = __importDefault(require("vm"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
const solutionCode = fs_1.default.readFileSync(`${__dirname}/solution.js`, {
    encoding: 'utf-8',
    flag: 'r',
});
// pre prepared code
const prepareCode = `const _ = require('lodash');`;
const lineCount = prepareCode.split('\n').length;
// Evaluate code (not execute)
// If code has wrong syntax, node will throw and exit.
// Executor can has this info in stderr.
const script = new vm_1.default.Script(`${prepareCode}\n${solutionCode}`, {
    filename: 'solution.js',
    columnOffset: -lineCount,
    lineOffset: -lineCount,
});
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
const sandboxContext = vm_1.default.createContext({
    require,
    Array,
    Set,
    Map,
    console: handleLogs(),
    getResult: (r) => {
        result = r;
    },
});
const start = process.hrtime();
script.runInContext(sandboxContext);
const stop = process.hrtime(start);
console.log(`Time Taken to execute: ${((stop[0] * 1e9 + stop[1]) / 1e9).toFixed(2)} seconds`);
fs_1.default.writeFileSync('./report/logs.txt', logs.join('\n'));
fs_1.default.writeFileSync('./report/result.txt', JSON.stringify(result));
