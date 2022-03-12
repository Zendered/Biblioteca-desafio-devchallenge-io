import { IBooksDTO } from '@/domain/contracts/gateways';
import { Book } from '@/domain/entities';

describe('Book entity', () => {
  const books: IBooksDTO[] = [];

  test('should add a book', () => {
    const book: IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'link01',
      title: 'title01',
    };
    const response = Book.create(book).value as Book;
    console.log(response);
    expect(response.author.value).toBe('author01');
  });

  test('should not add a book without a author', () => {
    const book: IBooksDTO = {
      author: '',
      editor: 'editor01',
      thumbnail: 'link01',
      title: 'title01',
    };
    const response = Book.create(book).value as Error;
    expect(response.name).toEqual('InvalidAuthor');
    expect(response.message).toEqual(`Invalid Author: ${book.author}.`);
  });
});
