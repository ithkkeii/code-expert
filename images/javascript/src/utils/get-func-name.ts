import { readFile } from 'fs/promises';
import { FailToReadFileException } from '../exceptions/fail-to-read-file';

export const getFuncName = async (): Promise<string> => {
  const path = `${process.cwd()}/dist/data/func-name.txt`;

  try {
    const data = await readFile(path, 'utf-8');
    return data;
  } catch (_) {
    throw new FailToReadFileException();
  }
};
