const { workerData, parentPort, threadId } = require("node:worker_threads");

const findFi = (n) => {
  // Base Case
  if (n < 2) return 1;
  else return findFi(n - 1) + findFi(n - 2);
};

parentPort.on("message", (message) => {
  const { workerId, task, data } = message;

  console.log(`worker running is ${workerId} on thread ${threadId}`);

  const result = findFi(data);

  console.log(`done task find Fi ${data}`);

  parentPort.postMessage({ workerId, task, result });
});
