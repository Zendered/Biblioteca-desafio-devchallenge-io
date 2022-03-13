export class InvalidEntity extends Error {
  constructor() {
    super('Something went wrong.');
    this.name = 'InvalidEntity';
  }
}
