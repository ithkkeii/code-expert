"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vm_1 = require("vm");
const promises_1 = require("fs/promises");
const worker_threads_1 = require("worker_threads");
const createRunner = (code) => {
    const path = `${__dirname}/runner.js`;
    return new Promise((resolve, reject) => {
        // new Worker can be fail, it will send error through error-event
        const worker = new worker_threads_1.Worker(path, { workerData: { code } });
        let timeout = undefined;
        worker.on('online', () => {
            worker.postMessage('ping');
        });
        worker.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
            // runner is ready!
            if (msg === 'pong') {
                timeout = setTimeout(() => reject({ message: 'too slow bitch!' }), 1000);
                return;
            }
            // msg type second time runner comm is {result: string, logs: string[]}
            resolve(msg);
            clearTimeout(timeout);
        }));
        worker.on('error', (err) => {
            // handle any error throw from runner
            console.log(err);
            clearTimeout(timeout);
            reject({ message: 'runner.js fail to execute' });
        });
        worker.on('exit', () => { });
    });
};
const prepareSolution_safe = () => __awaiter(void 0, void 0, void 0, function* () {
    const path = `${__dirname}/data/solution.txt`;
    try {
        const solution = yield (0, promises_1.readFile)(path, 'utf-8');
        return solution;
    }
    catch (_) {
        return undefined;
    }
});
const prepareInputs_safe = () => __awaiter(void 0, void 0, void 0, function* () {
    const path = `${__dirname}/data/test-inputs.txt`;
    try {
        const data = yield (0, promises_1.readFile)(path, 'utf-8');
        const testInputs = data.split('\n').map((d) => {
            const [id, content] = d.split(' ');
            return { id, content };
        });
        return testInputs;
    }
    catch (_) {
        return undefined;
    }
});
const checkSyntax_safe = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { solution, prepareCode } = params;
    const lineCount = prepareCode.split('\n').length;
    try {
        new vm_1.Script(`${prepareCode}\n${solution}`, {
            filename: 'solution.js',
            columnOffset: -lineCount,
            lineOffset: -lineCount,
        });
    }
    catch (err) {
        if (err instanceof Error && err.stack) {
            return { error: err.stack };
        }
    }
    return { error: undefined };
});
const writeResult_safe = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, path } = params;
    try {
        yield (0, promises_1.writeFile)(path, data);
    }
    catch (err) {
        // Do nothing
    }
});
const report = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { testId, code } = params;
    const path = `${__dirname}/report/${testId}-result.txt`;
    try {
        const { result, logs } = yield createRunner(code);
        process.stdout.write(JSON.stringify({ id: testId, result, logs, error: '' }));
        // await writeResult_safe({
        //   path,
        //   data: JSON.stringify({ result, logs, error: '' }),
        // });
    }
    catch (err) {
        process.stdout.write(JSON.stringify({
            id: testId,
            result: null,
            logs: [],
            error: err.message,
        }));
        // await writeResult_safe({
        //   path,
        //   data: JSON.stringify({ result: null, logs: [], error: err.message }),
        // });
    }
    process.stdout.write('\n');
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const solution = yield prepareSolution_safe();
    if (!solution) {
        // TODO: handle errors
        throw new Error('handle me');
        return;
    }
    const inputs = yield prepareInputs_safe();
    if (!inputs) {
        // TODO: handle errors
        throw new Error('handle me');
        return;
    }
    const prepareCode = `const _ = require('lodash');`;
    const { error } = yield checkSyntax_safe({ solution, prepareCode });
    if (error) {
        // TODO: handle errors
        throw new Error('handle me');
        return;
    }
    inputs.forEach((input) => {
        const { id, content } = input;
        const execCode = `getResult(fibonacci(${content}))`;
        const code = `${prepareCode}\n${solution}\n${execCode}`;
        report({ testId: id, code });
    });
    return;
});
const start = process.hrtime();
main();
const stop = process.hrtime(start);
console.log(`Time Taken to execute: ${(stop[0] * 1e9 + stop[1]) / 1e9} seconds`);
