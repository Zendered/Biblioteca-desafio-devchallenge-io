import { IHttpRequest, IHttpResponse } from '@/application/contracts';
import { Controller } from '@/application/controllers/controller';
import { CreateBookController } from '@/application/controllers/create-book';
import { IBookRepository, IBooksDTO } from '@/domain/contracts/gateways';
import { InMemoryBookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { InvalidEntity } from '@/domain/entities/error/invalid-entity';
import { CreateBook } from '@/domain/usecases/create-book/create-book';

describe('Create book controller', () => {
  const books: IBooksDTO[] = [];
  const repo: IBookRepository = new InMemoryBookRepository(books);
  const usecase: CreateBook = new CreateBook(repo);
  const controller = new Controller(new CreateBookController(usecase));

  test('should return status code 201 when request contains valid book data', async () => {
    const request: IHttpRequest = {
      body: {
        author: 'author01',
        editor: 'editor01',
        thumbnail: 'thumbnail01',
        title: 'title01',
      },
    };
    const result: IHttpResponse = await controller.handle(request);
    expect(result.statusCode).toBe(201);
    expect(result.body.author).toEqual(request.body.author);
    expect(result.body.editor).toEqual(request.body.editor);
    expect(result.body.thumbnail).toEqual(request.body.thumbnail);
    expect(result.body.title).toEqual(request.body.title);
  });

  test('should return status code 400 when request contains invalid author param', async () => {
    const request: IHttpRequest = {
      body: {
        author: 'a',
        editor: 'editor01',
        thumbnail: 'thumbnail01',
        title: 'title01',
      },
    };
    const result: IHttpResponse = await controller.handle(request);
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new InvalidEntity());
  });

  test('should return status code 400 when request contains invalid editor param', async () => {
    const request: IHttpRequest = {
      body: {
        author: 'author',
        editor: 'e',
        thumbnail: 'thumbnail01',
        title: 'title01',
      },
    };
    const result: IHttpResponse = await controller.handle(request);
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new InvalidEntity());
  });

  test('should return status code 400 when request contains invalid thumbnail param', async () => {
    const request: IHttpRequest = {
      body: {
        author: 'author',
        editor: 'editor',
        thumbnail: 't',
        title: 'title01',
      },
    };
    const result: IHttpResponse = await controller.handle(request);
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new InvalidEntity());
  });

  test('should return status code 400 when request contains invalid title param', async () => {
    const request: IHttpRequest = {
      body: {
        author: 'author',
        editor: 'editor',
        thumbnail: 'thumbnail',
        title: 't',
      },
    };
    const result: IHttpResponse = await controller.handle(request);
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new InvalidEntity());
  });
});
