import express from "express";
import fs from "fs";
import Docker, { ContainerCreateOptions } from "dockerode";

const fakeData = [
  {
    solution: `function fibonacci(n) {
      if (n < 2) return n;
      return fibonacci(n - 2) + fibonacci(n - 1);
    }`,
    functionName: "fibonacci",
    inputs: [21, 1000, 100, 4000, 5, 6],
  },
];

const app = express();

// Insert into my-worker.js new function base on challenge
// each request will create a pool of worker dedicated for all test input

// console.log("Create worker...");
// const pool = workerpool.pool({
//   minWorkers: 100,
//   maxWorkers: 100,
//   workerType: "thread",
// });
// console.log("Worker pool created!");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// Docker command
// docker run -it -w /app -v $(pwd)/src/solution.js:/app/solution.js -i alpine sh
app.get("/", async (_, res) => {
  // Gen specific identifier
  const id = Date.now();
  const fileName = id;

  // Exec environment options
  const execEnvOptions: ContainerCreateOptions = {
    Image: "node:16-alpine",
    name: `JS-executor-${id}`,
    AttachStdout: true,
    WorkingDir: "/app",
    Cmd: ["node", `${fileName}.js`],
    HostConfig: {
      CpuPeriod: 100000,
      CpuQuota: 2000,
      AutoRemove: true,
      Mounts: [
        {
          Target: `/app/${fileName}.js`,
          Source: `${__dirname}/${fileName}.js`,
          Type: "bind",
          ReadOnly: true,
        },
      ],
    },
  };

  const x = [21, 1000, 100, 4000, 5, 6];
  const input = x[Math.round(Math.random() * (5 - 0) + 0)];

  const { solution, functionName } = fakeData[0];
  fs.writeFileSync(
    `${__dirname}/${fileName}.js`,
    `${solution}\n${functionName}(${input})`
  );

  function streamToString(stream: any) {
    const chunks: any[] = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk: any) => {
        chunks.push(Buffer.from(chunk));
      });
      stream.on("error", (err: any) => reject(err));
      stream.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf8"));
      });
    });
  }

  const container = await docker.createContainer(execEnvOptions);
  container.attach(
    { stream: true, stdout: true, stderr: true },
    async function (err, stream) {
      const result = await streamToString(stream);
      console.log(result);
    }
  );
  await container.start();

  // const index = Math.round(Math.random() * (1 - 0) + 0);
  // const { solution, functionName, inputs } = fakeData[index];
  // fs.writeFileSync(`${__dirname}/my-worker.js`, `${solution}\n${tail}`);
  // const pool = workerpool.pool(__dirname + "/my-worker.js", {
  //   maxWorkers: inputs.length,
  // });
  // inputs.forEach((input) => {
  //   console.log(`exec ${functionName} with ${input}`);
  //   pool.exec(functionName, [input]).then((result) => {
  //     console.log(result);
  //   });
  // });
  res.send("execute code");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
