export class FailToCheckSyntaxException extends Error {
  code = 11;

  constructor() {
    super('Fail to check syntax');

    this.name = 'FailToCheckSyntaxException';
  }
}
