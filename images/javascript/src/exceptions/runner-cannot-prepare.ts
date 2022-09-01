// especially throw when runner cannot be prepared by worker
export class RunnerCannotPrepareException extends Error {
  code = 13;

  constructor() {
    super('Runner cannot prepare');

    this.name = 'RunnerCannotPrepare';
  }
}
