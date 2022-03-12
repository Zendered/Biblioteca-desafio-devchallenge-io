import { randomUUID } from 'crypto';
import { Either, left, right } from '@/shared';
import { InvalidID } from './error';

export class _ID {
  constructor(readonly id: string) {
    this.id = id ?? randomUUID();
  }

  static create(id: any): Either<InvalidID, _ID> {
    if (_ID.validate(id)) {
      return right(new _ID(id));
    }

    return left(new InvalidID());
  }

  static validate(id: string) {
    if (id?.trim().length < 1 || id?.trim().length > 36) {
      return false;
    }

    return true;
  }
}
