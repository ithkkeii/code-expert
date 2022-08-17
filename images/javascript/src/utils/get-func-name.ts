import { readFile } from 'fs/promises';

/**
 * This function will not throw
 */
export const getFuncName = async (): Promise<
  | {
      error: string;
      data: null;
    }
  | { error: null; data: string }
> => {
  const path = `${process.cwd()}/dist/data/func-name.txt`;

  try {
    const data = await readFile(path, 'utf-8');
    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'Cannot read func name.' };
  }
};
