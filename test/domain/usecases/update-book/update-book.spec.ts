import {
  IBookRepository, IBooksDTO, IUpdateUseCase, IUseCase,
} from '@/domain/contracts/gateways';
import { InMemoryBookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { Book } from '@/domain/entities';
import { CreateBook } from '@/domain/usecases/create-book/create-book';
import { UpdateBook } from '@/domain/usecases/update-book/update-book';

describe('Update book usecase', () => {
  test('should update a book by its id', async () => {
    const books:IBooksDTO[] = [];
    const repo: IBookRepository = new InMemoryBookRepository(books);
    const createBook: IUseCase = new CreateBook(repo);
    const updateBook: IUpdateUseCase = new UpdateBook(repo);
    const oldBook:IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'thumbnail01',
      title: 'title01',
    };
    const newBook:IBooksDTO = {
      author: 'author02',
      editor: 'editor02',
      thumbnail: 'thumbnail02',
      title: 'title02',
    };

     (await createBook.perform(oldBook)).value as Book;
     const result = await updateBook.perform(books[0].id, newBook);
     expect(result).toEqual(newBook);
  });
});
