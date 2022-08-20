import { execRunner } from './exec-runner';
import { expect as chaiExpect } from 'chai';

type RunnerRes =
  | {
      id: string;
      pass: true;
      result: string;
      expected: string;
      error: null;
      logs: string[];
      time: string;
    }
  | {
      id: string;
      pass: false;
      result: string;
      expected: string;
      error: string;
      logs: string[];
      time: string;
    };

export const makeAssertion = async ({
  id,
  code,
  assertion,
}: {
  id: string;
  code: string;
  assertion: string;
}): Promise<RunnerRes> => {
  try {
    const runnerRes = await execRunner(code);

    if (runnerRes.error === null) {
      const { result, logs, time } = runnerRes;

      try {
        const expect = chaiExpect;
        const assertFunc = new Function(
          'expect',
          `return ${assertion.replace('%result%', result)}`,
        );
        assertFunc(expect);

        return {
          id,
          pass: true,
          error: null,
          expected: result,
          result,
          logs,
          time,
        };
      } catch (err: unknown) {
        const expected = (err as any)?.expected;

        return {
          id,
          pass: false,
          error: 'Wrong result',
          expected,
          result,
          logs,
          time,
        };
      }
    } else {
      return {
        id,
        pass: false,
        error: runnerRes.error,
        expected: '',
        result: '',
        logs: [],
        time: runnerRes.time,
      };
    }
  } catch (err) {
    return {
      id,
      pass: false,
      error: '13',
      expected: '',
      result: '',
      logs: [],
      time: '0',
    };
  }
};
