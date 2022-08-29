import { readFile } from 'fs/promises';
import { FailToReadFileException } from '../exceptions/fail-to-read-file';

export const getInputs = async (): Promise<
  {
    id: string;
    content: string;
    assertion: string;
  }[]
> => {
  const path = `${process.cwd()}/dist/data/test-inputs.txt`;

  try {
    const data = await readFile(path, 'utf-8');

    const testInputs = data.split('\n').map((d) => {
      const [id, content, assertion] = d.split('|');
      return { id, content, assertion };
    });

    return testInputs;
  } catch (_) {
    throw new FailToReadFileException();
  }
};
