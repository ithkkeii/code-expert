import fs from "fs";
import { ContainerCreateOptions } from "dockerode";
import { Record } from ".";
import { docker } from "./start-up";

// Docker command
// docker run -it -w /app -v $(pwd)/src/solution.js:/app/solution.js -i alpine sh

const fakeData = {
  solution: `function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 2) + fibonacci(n - 1);
  }`,
  functionName: "fibonacci",
  input: 21,
};

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

export const handler = async (record: Record) => {
  const { solution, functionName, input } = record;

  // Gen specific identifier
  const id = Date.now();
  // Unique file name auto gen
  const fileName = id;
  // File name inside docker container, no need unique
  const executableFileName = "solution";

  // Exec environment options
  const execEnvOptions: ContainerCreateOptions = {
    Image: "node:16-alpine",
    name: `JS-executor-${id}`,
    AttachStdout: true,
    WorkingDir: "/app",
    Cmd: ["node", `${executableFileName}.js`],
    HostConfig: {
      CpuPeriod: 100000,
      CpuQuota: 2000,
      AutoRemove: true,
      Mounts: [
        {
          Target: `/app/${executableFileName}.js`,
          Source: `${__dirname}/${fileName}.js`,
          Type: "bind",
          ReadOnly: true,
        },
      ],
    },
  };

  fs.writeFileSync(
    `${__dirname}/${fileName}.js`,
    `${solution}\nconsole.log(${functionName}(${input}))`
  );

  const container = await docker.createContainer(execEnvOptions);
  container.attach(
    { stream: true, stdout: true, stderr: true },
    async function (err, stream) {
      const result = await streamToString(stream);
      console.log(result);
      fs.unlinkSync(`${__dirname}/${fileName}.js`);
    }
  );
  await container.start();
};
