export class NotFoundException extends Error {
  code = 12;

  constructor() {
    super('Not found');

    this.name = 'NotFoundException';
  }
}
