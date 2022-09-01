// unexpected exit on runner
export class RunnerExitException extends Error {
  code = 14;

  constructor() {
    super('Runner exit');

    this.name = 'RunnerExitException';
  }
}
