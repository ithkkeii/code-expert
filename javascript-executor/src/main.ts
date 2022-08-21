import { connectToDocker } from './start-up';

export const main = async () => {
  await connectToDocker();
};
