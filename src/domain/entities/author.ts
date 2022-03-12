import { Either, left, right } from '@/shared';
import { InvalidAuthor } from './error';

export class Author {
  constructor(readonly value:string) {}

  static create(author: string): Either<InvalidAuthor, Author> {
    if (Author.validate(author)) {
      return right(new Author(author));
    }
    return left(new InvalidAuthor(author));
  }

  static validate(author: string): boolean {
    if (!author) {
      return false;
    }

    if (author.trim().length > 125 || author.trim().length < 2) {
      return false;
    }

    return true;
  }
}
