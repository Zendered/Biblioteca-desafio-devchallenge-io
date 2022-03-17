import { IHttpRequest } from '@/application/contracts';
import { Controller } from '@/application/controllers/controller';
import { ListByIdController } from '@/application/controllers/list-by-id';
import { IBookRepository, IBooksDTO, IUseCase } from '@/domain/contracts/gateways';
import { InMemoryBookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { CreateBook } from '@/domain/usecases/create-book/create-book';
import { ListBook } from '@/domain/usecases/list-book/list-book';
import { randomUUID } from 'crypto';

describe('List book by id controller ', () => {
  const books: IBooksDTO[] = [];
  const repo: IBookRepository = new InMemoryBookRepository(books);
  const createBook: IUseCase = new CreateBook(repo);
  const usecase: IUseCase = new ListBook(repo);
  const controller = new Controller(new ListByIdController(usecase));
  test('should return status code 200 when listing a book by its id', async () => {
    const request: IHttpRequest = {
      body: {
        id: randomUUID(),
        author: 'author01',
        editor: 'editor01',
        thumbnail: 'thumbnail01',
        title: 'title01',
      },
    };
    await createBook.perform(request.body);
    const result = await controller.handle(request);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(books[0]);
  });

  test('should return status code 400 when listing a book with invalid id', async () => {
    const request: IHttpRequest = {
      body: {
        author: 'author01',
        editor: 'editor01',
        thumbnail: 'thumbnail01',
        title: 'title01',
      },
    };
    const result = await controller.handle(request);
    expect(result.statusCode).toEqual(400);
  });
});
