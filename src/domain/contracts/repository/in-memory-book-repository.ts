import { randomUUID } from 'crypto';
import { IBooksDTO } from '../gateways';
import { IBookRepository } from '../gateways/book-repository';

export class BookRepository implements IBookRepository {
  constructor(private repo: IBooksDTO[] = []) {}

  async add(request: IBooksDTO): Promise<void> {
    const exists = await this.exists(request);
    if (!request.id) {
      request.id = randomUUID();
    }

    if (!exists) {
      this.repo.push(request);
    }
  }

  async findById(id: string): Promise<IBooksDTO | undefined> {
    const book = await this.repo.find(book => book.id === id);
    return book;
  }

  async findAll(): Promise<IBooksDTO[]> {
    return this.repo;
  }

  async update(request: IBooksDTO): Promise<void> {
    const oldBook = await this.findById(request.id);
    await this.delete(oldBook?.id);
    await this.add(request);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    this.repo.splice(0, 1);
  }

  async exists(request: IBooksDTO): Promise<boolean> {
    const existBook = await this.findById(request.id);
    if (!existBook) {
      return false;
    }
    return true;
  }
}
