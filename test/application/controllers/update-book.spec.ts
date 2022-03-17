import { IHttpRequest } from '@/application/contracts';
import { Controller } from '@/application/controllers/controller';
import { DeleteBookController } from '@/application/controllers/delete-book';
import { UpdateBookController } from '@/application/controllers/update-book';
import {
  IBookRepository, IBooksDTO, IUpdateUseCase, IUseCase,
} from '@/domain/contracts/gateways';
import { InMemoryBookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { CreateBook } from '@/domain/usecases/create-book/create-book';
import { UpdateBook } from '@/domain/usecases/update-book/update-book';
import { randomUUID } from 'crypto';

describe('Update book controller', () => {
  const books: IBooksDTO[] = [];
  const repo: IBookRepository = new InMemoryBookRepository(books);
  const createBook: IUseCase = new CreateBook(repo);
  const usecase: IUpdateUseCase = new UpdateBook(repo);
  const controller = new UpdateBookController(usecase);
  test('should return status code 200 after update a book by its id', async () => {
    const request: IHttpRequest = {
      body: {
        id: randomUUID(),
        author: 'author01',
        editor: 'editor01',
        thumbnail: 'thumbnail01',
        title: 'title01',
      },
    };

    const newBook: IHttpRequest = {
      body: {
        id: randomUUID(),
        author: 'author02',
        editor: 'editor02',
        thumbnail: 'thumbnail02',
        title: 'title02',
      },
    };

    await createBook.perform(request.body);
    const result = await controller.handle(request, newBook);
    expect(result.statusCode).toBe(200);
    expect(books[0]).toEqual(newBook);
  });
});
