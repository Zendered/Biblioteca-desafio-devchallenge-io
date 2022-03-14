import { IBooksDTO } from '@/domain/contracts/gateways';
import { Book } from '@/domain/entities';

describe('Book entity', () => {
  test('should add a book', () => {
    const book: IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'link01',
      title: 'title01',
    };
    const response = Book.create(book).value as Book;
    expect(response.author).toBe('author01');
  });

  test('should not add a book with null author', () => {
    const book: IBooksDTO = {
      author: '',
      editor: 'editor01',
      thumbnail: 'link01',
      title: 'title01',
    };
    const response = Book.create(book).value as Error;
    expect(response.name).toEqual('InvalidEntity');
    expect(response.message).toEqual('Something went wrong.');
  });

  test('should not add a book with null editor', () => {
    const book: IBooksDTO = {
      author: 'author01',
      editor: '',
      thumbnail: 'link01',
      title: 'title01',
    };
    const response = Book.create(book).value as Error;
    expect(response.name).toEqual('InvalidEntity');
    expect(response.message).toEqual('Something went wrong.');
  });

  test('should not add a book with null thumbnail', () => {
    const book: IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: '',
      title: 'title01',
    };
    const response = Book.create(book).value as Error;
    expect(response.name).toEqual('InvalidEntity');
    expect(response.message).toEqual('Something went wrong.');
  });

  test('should not add a book with null title', () => {
    const book: IBooksDTO = {
      author: 'author01',
      editor: 'editor01',
      thumbnail: 'thumbnail01',
      title: '',
    };
    const response = Book.create(book).value as Error;
    expect(response.name).toEqual('InvalidEntity');
    expect(response.message).toEqual('Something went wrong.');
  });
});
