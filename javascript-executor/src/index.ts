import { handler } from "./handler";
import { connectToDocker, createConsumer } from "./start-up";

export interface Record {
  solution: string;
  functionName: string;
  input: number;
}

const main = async () => {
  console.log("Connecting to docker...");
  await connectToDocker();

  const consumer = await createConsumer();

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("consumes message");

      const value = message.value?.toString();
      if (!value) {
        // Ignore it, we don't know what case cause this undefined
        return;
      }
      const record: Record = JSON.parse(value);

      // No need to block consumer
      handler(record);
    },
  });
};

main();
