import { readFile } from 'fs/promises';

/**
 * This function will not throw
 */
export const getSolution = async (): Promise<
  | {
      error: string;
      data: null;
    }
  | { error: null; data: string }
> => {
  const path = `${process.cwd()}/dist/data/solution.txt`;
  try {
    const solution = await readFile(path, 'utf-8');
    return { error: null, data: solution };
  } catch (_) {
    return { error: 'Cannot read solution', data: null };
  }
};
