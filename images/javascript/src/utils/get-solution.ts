import { readFile } from 'fs/promises';
import { FailToReadFileException } from '../exceptions/fail-to-read-file';

export const getSolution = async (): Promise<string> => {
  const path = `${process.cwd()}/dist/data/solution.txt`;
  try {
    const solution = await readFile(path, 'utf-8');
    return solution;
  } catch (_) {
    throw new FailToReadFileException();
  }
};
