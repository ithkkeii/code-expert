import { Producer } from "kafkajs";
import { handler } from "./handler";
import { connectToDocker, createConsumer, createProducer } from "./start-up";

export interface Record {
  guestId: string;
  challengeId: number;
  solution: string;
  functionName: string;
  testInput: { id: number; content: string };
  testCase: { id: number; content: string };
}

export let producer: null | Producer = null;

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
      console.log("record", record);

      // No need to block consumer
      handler(record);
    },
  });

  // Send result
  producer = await createProducer();
};

main();
