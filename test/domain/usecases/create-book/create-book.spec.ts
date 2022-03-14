import { IBooksDTO } from '@/domain/contracts/gateways';
import { IBookRepository } from '@/domain/contracts/gateways/book-repository';
import { InMemoryBookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { Book } from '@/domain/entities';
import { CreateBook } from '@/domain/usecases/create-book/create-book';

describe('Create book usecase ', () => {
  const books: IBooksDTO[] = [];
  const repo: IBookRepository = new InMemoryBookRepository(books);
  const usecase: CreateBook = new CreateBook(repo);
  test('should create a book with valid data', async () => {
    const validBook:IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'thumbnail01',
      title: 'title01',
    };
    const result = (await usecase.perform(validBook)).value as Book;
    expect(result).toEqual(validBook);
  });

  test('should not add a book with invalid author', async () => {
    const validBook:IBooksDTO = {
      author: 'B     ',
      editor: 'editor01',
      thumbnail: 'thumbnail01',
      title: 'title01',
    };
    const result = (await usecase.perform(validBook)).value as Error;
    expect(result.message).toEqual('Something went wrong.');
  });

  test('should not add a book when author was more than 125 chars', async () => {
    const validBook:IBooksDTO = {
      author: 'A'.repeat(126),
      editor: 'editor01',
      thumbnail: 'thumbnail01',
      title: 'title01',
    };
    const result = (await usecase.perform(validBook)).value as Error;
    expect(result.message).toEqual('Something went wrong.');
  });

  test('should not add a book with invalid editor', async () => {
    const validBook:IBooksDTO = {
      author: 'author01',
      editor: 'E     ',
      thumbnail: 'thumbnail01',
      title: 'title01',
    };
    const result = (await usecase.perform(validBook)).value as Error;
    expect(result.message).toEqual('Something went wrong.');
  });

  test('should not add a book when editor was more than 125 chars', async () => {
    const validBook:IBooksDTO = {
      author: 'author01',
      editor: 'A'.repeat(126),
      thumbnail: 'thumbnail01',
      title: 'title01',
    };
    const result = (await usecase.perform(validBook)).value as Error;
    expect(result.message).toEqual('Something went wrong.');
  });

  test('should not add a book with invalid Thumbnail', async () => {
    const validBook:IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'T     ',
      title: 'title01',
    };
    const result = (await usecase.perform(validBook)).value as Error;
    expect(result.message).toEqual('Something went wrong.');
  });

  test('should not add a book when thumbnail was more than 125 chars', async () => {
    const validBook:IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'A'.repeat(126),
      title: 'title01',
    };
    const result = (await usecase.perform(validBook)).value as Error;
    expect(result.message).toEqual('Something went wrong.');
  });

  test('should not add a book with title editor', async () => {
    const validBook:IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'thumbnail',
      title: 'T     ',
    };
    const result = (await usecase.perform(validBook)).value as Error;
    expect(result.message).toEqual('Something went wrong.');
  });

  test('should not add a book when title was more than 125 chars', async () => {
    const validBook:IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'thumbnail',
      title: 'A'.repeat(126),
    };
    const result = (await usecase.perform(validBook)).value as Error;
    expect(result.message).toEqual('Something went wrong.');
  });
});
