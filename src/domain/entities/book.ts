import { Either, left, right } from '@/shared';
import { randomUUID } from 'crypto';
import { IBooksDTO } from '../contracts/gateways';
import { Entity } from './entity';
import { InvalidEntity } from './error/invalid-entity';

export class Book {
  constructor(readonly id: string, readonly author: String, readonly editor: string, readonly thumbnail: string, readonly title: string) {
    this.id = randomUUID();
  }

  static create(book: IBooksDTO): Either<InvalidEntity, Book> {
    const bookOrError = Entity.create(book);

    if (bookOrError.isLeft()) {
      return left(new InvalidEntity());
    }

    return right(new Book(book.id as string, book.author, book.editor, book.thumbnail, book.title));
  }
}
