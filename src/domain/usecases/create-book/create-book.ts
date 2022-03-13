import { IBookRepository } from '@/domain/contracts/gateways/book-repository';
import { IUseCase } from '@/domain/contracts/gateways/usecase';
import { Book } from '@/domain/entities';
import { InvalidEntity } from '@/domain/entities/error/invalid-entity';
import { Either, left, right } from '@/shared';

export class CreateBook implements IUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async perform(request: any): Promise<Either<InvalidEntity, Book>> {
    const bookOrError: Either<InvalidEntity, Book> = Book.create(request);
    if (bookOrError.isLeft()) {
      return left(new InvalidEntity());
    }

    const bookExists = await this.bookRepository.exists(request);

    if (!bookExists) {
      await this.bookRepository.add(request);
    }

    return right(request);
  }
}
