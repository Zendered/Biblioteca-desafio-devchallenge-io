import { IBookRepository, IBooksDTO, IUseCase } from '@/domain/contracts/gateways';
import { InMemoryBookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { Book } from '@/domain/entities';
import { CreateBook } from '@/domain/usecases/create-book/create-book';
import { ListBook } from '@/domain/usecases/list-book/list-book';

describe('List book usecase', () => {
  test('should list a book by its id ', async () => {
    const books:IBooksDTO[] = [];
    const repo: IBookRepository = new InMemoryBookRepository(books);
    const createBook: IUseCase = new CreateBook(repo);
    const listBook: IUseCase = new ListBook(repo);
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

     (await createBook.perform(validBook1)).value as Book;
     (await createBook.perform(validBook2)).value as Book;
     const result = await listBook.perform(books[1].id);
     expect(result).toEqual(validBook2);
  });
});
