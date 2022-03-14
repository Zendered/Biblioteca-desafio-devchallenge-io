import { IBookRepository, IUseCase } from '@/domain/contracts/gateways';

export class DeleteBook implements IUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async perform(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
