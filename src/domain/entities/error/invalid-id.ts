export class InvalidID extends Error {
  constructor() {
    super('ID not compatible');
    this.name = 'InvalidID';
  }
}
