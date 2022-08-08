import vm from 'vm';
import fs from 'fs';
import { format } from './utils';

const solutionCode = fs.readFileSync(`${__dirname}/solution.js`, {
  encoding: 'utf-8',
  flag: 'r',
});

// pre prepared code
const prepareCode = `const _ = require('lodash');`;
const lineCount = prepareCode.split('\n').length;

// Evaluate code (not execute)
const script = new vm.Script(`${prepareCode}\n${solutionCode}`, {
  filename: 'solution.js',
  columnOffset: -lineCount,
  lineOffset: -lineCount,
});

const logs: string[] = [];
let result: any = null;
const handleLogs = () => {
  return {
    log: (...args: unknown[]) => {
      const log = args.map((arg) => format(arg)).join(' ');
      logs.push(log);
    },
  };
};

const sandboxContext = vm.createContext({
  require,
  Array,
  Set,
  Map,
  console: handleLogs(),
  getResult: (r: any) => {
    result = r;
  },
});

const start = process.hrtime();
script.runInContext(sandboxContext);
const stop = process.hrtime(start);
console.log(
  `Time Taken to execute: ${((stop[0] * 1e9 + stop[1]) / 1e9).toFixed(
    2
  )} seconds`
);
console.log(result);
