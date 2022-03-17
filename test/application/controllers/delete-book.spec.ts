import { IHttpRequest } from '@/application/contracts';
import { Controller } from '@/application/controllers/controller';
import { DeleteBookController } from '@/application/controllers/delete-book';
import { IBookRepository, IBooksDTO, IUseCase } from '@/domain/contracts/gateways';
import { InMemoryBookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { CreateBook } from '@/domain/usecases/create-book/create-book';
import { DeleteBook } from '@/domain/usecases/delete-book/delete-book';
import { randomUUID } from 'crypto';

describe('Delete book controller', () => {
  const books: IBooksDTO[] = [];
  const repo: IBookRepository = new InMemoryBookRepository(books);
  const createBook: IUseCase = new CreateBook(repo);
  const usecase: IUseCase = new DeleteBook(repo);
  const controller = new Controller(new DeleteBookController(usecase));
  test('should return status code 200 after removing a book by its id', async () => {
    const book1: IHttpRequest = {
      body: {
        id: randomUUID(),
        author: 'author01',
        editor: 'editor01',
        thumbnail: 'thumbnail01',
        title: 'title01',
      },
    };
    const book2: IHttpRequest = {
      body: {
        id: randomUUID(),
        author: 'author01',
        editor: 'editor01',
        thumbnail: 'thumbnail01',
        title: 'title01',
      },
    };
    await createBook.perform(book1.body);
    await createBook.perform(book2.body);
    const result = await controller.handle(book1);
    expect(books.length).toBe(1);
    expect(result.statusCode).toBe(200);
    expect(books[0]).toEqual(book2.body);
  });
});
