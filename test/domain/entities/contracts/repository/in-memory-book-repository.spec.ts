import { IBooksDTO } from '@/domain/contracts/gateways';
import { IBookRepository } from '@/domain/contracts/gateways/book-repository';
import { InMemoryBookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { Book } from '@/domain/entities';
import { CreateBook } from '@/domain/usecases/create-book/create-book';

describe('Create category usecase ', () => {
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

  test('should find a book by the id', async () => {
    const books: IBooksDTO[] = [];
    const repo: IBookRepository = new InMemoryBookRepository(books);
    const usecase: CreateBook = new CreateBook(repo);
    const validBook:IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'thumbnail01',
      title: 'title01',
    };
    (await usecase.perform(validBook)).value as Book;
    const findBookId = await repo.findById(validBook.id);
    expect(books[0]).toEqual(findBookId);
  });

  test('should delete a book by the id', async () => {
    const books: IBooksDTO[] = [];
    const repo: IBookRepository = new InMemoryBookRepository(books);
    const usecase: CreateBook = new CreateBook(repo);
    const validBook1:IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'thumbnail01',
      title: 'title01',
    };
    const validBook2:IBooksDTO = {
      author: 'author02',
      editor: 'editor02',
      thumbnail: 'thumbnail02',
      title: 'title02',
    };

    (await usecase.perform(validBook1)).value as Book;
    (await usecase.perform(validBook2)).value as Book;

    await repo.delete(validBook1.id);
    const result = await repo.findAll();
    expect(result[0].id).toBe(validBook2.id);
  });

  test('should find a book if the book exists', async () => {
    const validBook:IBooksDTO = {
      author: 'author07',
      editor: 'editor07',
      thumbnail: 'thumbnail07',
      title: 'title07',
    };
    const findBookId = await repo.exists(validBook);
    expect(findBookId).toBeFalsy();
  });

  test('should update a book', async () => {
    const books: IBooksDTO[] = [];
    const repo: IBookRepository = new InMemoryBookRepository(books);
    const usecase: CreateBook = new CreateBook(repo);
    const oldBook:IBooksDTO = {
      author: 'author07',
      editor: 'editor07',
      thumbnail: 'thumbnail07',
      title: 'title07',
    };

    const newBook:IBooksDTO = {
      author: 'author',
      editor: 'editor',
      thumbnail: 'thumbnail',
      title: 'title',
    };
    await usecase.perform(oldBook);
    await repo.update(oldBook.id, newBook);
    expect(books[0]).toEqual(newBook);
  });
});
