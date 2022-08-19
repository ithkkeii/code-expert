export class FailToReadFileException extends Error {
  code = 10;

  constructor() {
    super('Fail to read file');

    this.name = 'FailToReadFileException';
  }
}
