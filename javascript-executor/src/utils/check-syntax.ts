import { Script } from 'vm';

export const checkSyntax = (
  solution: string,
  preparedCode = '',
): string | null => {
  const lineCount = preparedCode.split('\n').length;

  try {
    new Script(`${preparedCode}\n${solution}`, {
      filename: 'solution.js',
      columnOffset: -lineCount,
      lineOffset: -lineCount,
    });
  } catch (err) {
    if (err instanceof Error && err.stack) {
      return err.stack;
    }
    return 'unknown error';
  }

  return null;
};
