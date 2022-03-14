import { IBookRepository, IBooksDTO, IUseCase } from '@/domain/contracts/gateways';
import { InMemoryBookRepository } from '@/domain/contracts/repository/in-memory-book-repository';
import { Book } from '@/domain/entities';
import { CreateBook } from '@/domain/usecases/create-book/create-book';
import { DeleteBook } from '@/domain/usecases/delete-book/delete-book';

describe('Delete book usecase', () => {
  test('should delete a book by its id', async () => {
    const books:IBooksDTO[] = [];
    const repo: IBookRepository = new InMemoryBookRepository(books);
    const createBook: IUseCase = new CreateBook(repo);
    const deleteBook: IUseCase = new DeleteBook(repo);
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
     await deleteBook.perform(books[1].id);
     expect(books.length).toEqual(1);
  });
});
