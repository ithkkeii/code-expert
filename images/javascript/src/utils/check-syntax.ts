import { Script } from 'vm';
import { FailToCheckSyntaxException } from '../exceptions/fail-to-check-syntax';

export const checkSyntax = async (
  code: string,
  prePreparedCode = '',
): Promise<{ error: string | null }> => {
  const lineCount = prePreparedCode.split('\n').length;

  try {
    new Script(`${code}\n${prePreparedCode}`, {
      filename: 'solution.js',
      columnOffset: -lineCount,
      lineOffset: -lineCount,
    });
    return { error: null };
  } catch (err) {
    if (err instanceof Error && err.stack) {
      return { error: err.stack };
    }

    throw new FailToCheckSyntaxException();
  }
};
