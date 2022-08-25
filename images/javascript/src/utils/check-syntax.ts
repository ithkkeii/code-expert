import { Script } from 'vm';
import { FailToCheckSyntaxException } from '../exceptions/fail-to-check-syntax';

export const checkSyntax = async (
  code: string,
  prePreparedCode = '',
): Promise<void> => {
  const lineCount = prePreparedCode.split('\n').length;

  try {
    new Script(`${prePreparedCode}\n${code}`, {
      filename: 'solution.js',
      columnOffset: -lineCount,
      lineOffset: -lineCount,
    });
  } catch (err) {
    if (err instanceof Error && err.stack) {
      throw err;
    }

    throw new FailToCheckSyntaxException();
  }
};
