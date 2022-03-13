import { IBooksDTO } from '@/domain/contracts/gateways';
import { IBookRepository } from '@/domain/contracts/gateways/book-repository';
import { BookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { Book } from '@/domain/entities';
import { CreateBook } from '@/domain/usecases/create-book/create-book';

describe('Create category usecase ', () => {
  const books: IBooksDTO[] = [];
  const bookRepository: IBookRepository = new BookRepository(books);
  const usecase: CreateBook = new CreateBook(bookRepository);
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
});
