export class InvalidAuthor extends Error {
  constructor(protected readonly author: string) {
    super(`Invalid Author: ${author}.`);
    this.name = 'InvalidAuthor';
  }
}
