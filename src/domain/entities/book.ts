import { randomUUID } from 'crypto';
import { Either, left, right } from '@/shared';
import { IBooksDTO } from '../contracts/gateways';
import { Author } from './author';
import { InvalidAuthor, InvalidID } from './error';
import { _ID } from './_id';

export class Book {
  constructor(readonly id: _ID, readonly author: Author, readonly editor: string, readonly thumbnail: string, readonly title: string) {
    this.id = id ?? randomUUID();
  }

  static create(book: IBooksDTO): Either<InvalidAuthor | InvalidID, Book> {
    const authorOrError = Author.create(book.author);

    if (authorOrError.isLeft()) {
      return left(new InvalidAuthor(book.author));
    }

    const idOrError = _ID.create(book.id);
    if (idOrError.isLeft()) {
      return left(new InvalidID());
    }

    const author: Author = authorOrError.value as Author;
    const id: _ID = idOrError.value as _ID;

    return right(new Book(id, author, book.editor, book.thumbnail, book.title));
  }
}
