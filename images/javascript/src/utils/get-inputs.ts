import { readFile } from 'fs/promises';

/**
 * This function will not throw
 */
export const getInputs = async (): Promise<
  | {
      error: null;
      data: {
        id: string;
        content: string;
      }[];
    }
  | { error: string; data: null }
> => {
  const path = `${process.cwd()}/dist/data/test-inputs.txt`;

  try {
    const data = await readFile(path, 'utf-8');

    const testInputs = data.split('\n').map((d) => {
      const [id, content] = d.split(' ');
      return { id, content };
    });

    return { error: null, data: testInputs };
  } catch (_) {
    return { error: 'Cannot read test-inputs', data: null };
  }
};
