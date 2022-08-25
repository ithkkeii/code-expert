import { startContainer } from './start-container';
import { connectToDocker } from './start-up';
import { genFileData } from './utils/gen-file-data';

export const main = async () => {
  await connectToDocker();
  const dataPath = await genFileData(String(Date.now()));
  console.log('Start container');
  const start = process.hrtime.bigint();
  const result = await startContainer({ dataPath });
  const end = process.hrtime.bigint();
  console.log(`Start container ${Number(end - start) / 1000000000} s`);
  console.log(result);
};
