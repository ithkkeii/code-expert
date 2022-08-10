import { Producer } from 'kafkajs';
import { handler } from './handler';
import { SubmittedSolutionMessage } from './interface';
import { runContainer } from './run-container';
import { connectToDocker, createConsumer, createProducer } from './start-up';
import { consumerHandler, initExecutorFleet } from './test';

const data =
  '{"solution":"function diffTwoArr(a, b) {\n    \treturn a;\n    }","funcName":"diffTwoArr","guestId":"this-thing-is-unique","testCase":{"id":1,"content":"diffTwoArr([], [])"},"assertStatement":{"id":1,"content":"assert(#res).strictEqual(4)"}}';

export let producer: null | Producer = null;

const main = async () => {
  console.log('Connecting to docker...');
  await connectToDocker();

  const consumer = await createConsumer();

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log('consumes message');

      const value = message.value?.toString();
      if (!value) {
        return;
      }
      const submittedSolution: SubmittedSolutionMessage = JSON.parse(value);

      // No need to block consumer
      handler(submittedSolution);
    },
  });

  // Send result
  // producer = await createProducer();
};

// main();

const testRun = async () => {
  await runContainer();
  /* await initExecutorFleet();
  const consumer = await createConsumer();

  await consumer.run({
    eachMessage: async ({ message }) => {
      await consumerHandler(message);
    },
  }); */
};

testRun();
