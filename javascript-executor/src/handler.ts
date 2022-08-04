import fs from "fs";
import { ContainerCreateOptions } from "dockerode";
import { producer, Record } from ".";
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
      resolve(Buffer.concat(chunks).toString("utf-8"));
    });
  });
}

export const handler = async (record: Record) => {
  const {
    guestId,
    challengeId,
    solution,
    // TODO: this field is not available yet
    functionName = "sum",
    testCase,
    testInput,
  } = record;

  // Gen specific identifier
  const id = `${Date.now()}${testCase.id}`;
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
    `${solution}\nconsole.log(${functionName}(${testInput.content}))`
  );

  const container = await docker.createContainer(execEnvOptions);
  container.attach(
    { stream: true, stdout: true, stderr: true },
    async function (err, stream) {
      let result = await streamToString(stream);
      fs.unlinkSync(`${__dirname}/${fileName}.js`);

      // Sanitize result
      result = String(result).replace(/[^A-Z0-9]+/gi, "");
      await producer!.send({
        topic: "javascript-result",
        messages: [
          {
            key: guestId,
            value: JSON.stringify({ guestId, challengeId, result }),
          },
        ],
      });
    }
  );
  await container.start();
};
