import type { Data } from './interface';
import { runContainer } from './run-container';
import { connectToDocker, createConsumer, createProducer } from './start-up';
import { checkAssertion } from './utils/check-assertion';
import { checkSyntax } from './utils/check-syntax';
import { genFileData } from './utils/gen-file-data';

export const main = async () => {
  await connectToDocker();

  const producer = await createProducer();

  const consumer = await createConsumer();
  consumer.run({
    eachMessage: async (params) => {
      const { message } = params;

      if (!message.value) return;

      const { submitId, solution, funcName, inputs }: Data = JSON.parse(
        message.value?.toString(),
      );

      // Check user's solution syntax
      const syntaxErr = checkSyntax(solution, `const _ = require('lodash');`);
      if (syntaxErr) {
        await producer.send({
          topic: 'javascript-exec-result',
          messages: [{ value: JSON.stringify(syntaxErr) }],
        });
        return;
      }

      const dataPath = await genFileData({
        funcName,
        inputs,
        solution,
        submitId,
      });

      // Spin container
      const execResults = await runContainer({
        dataPath,
        inputIds: inputs.map((i) => i.id),
      });

      const assertedResults = execResults.map((v) => {
        const { id, result } = v;

        const input = inputs.find((i) => i.id === id);
        if (!input) {
          // TODO: Do we have any chances this will fail ?
          // TODO: expected should be store in DB ?
          return { ...v, pass: false, expected: '' };
        }

        const checked = checkAssertion(String(result), input.assertion);

        return { ...checked, ...v };
      });

      await producer.send({
        topic: 'javascript-exec-result',
        messages: [
          { value: JSON.stringify({ id: submitId, value: assertedResults }) },
        ],
      });
    },
  });
};
