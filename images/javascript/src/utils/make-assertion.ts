import { expect as chaiExpect } from 'chai';
import type { TaskSuccessRes, TaskTimeoutRes } from './run-task';

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

interface Options {
  id: string;
  doneTask: TaskSuccessRes | TaskTimeoutRes;
  assertion: string;
}

export const makeAssertion = (options: Options): RunnerRes => {
  const { id, doneTask, assertion } = options;

  if (doneTask.error === null) {
    const { result, logs, time } = doneTask;

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
        error: 'Wrong answer',
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
      error: doneTask.error,
      expected: '',
      result: '',
      logs: [],
      time: doneTask.time,
    };
  }
};
