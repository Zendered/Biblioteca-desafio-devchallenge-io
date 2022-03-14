import { IBookRepository, IBooksDTO, IUseCase } from '@/domain/contracts/gateways';

export class ListBook implements IUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async perform(id: string): Promise<IBooksDTO> {
    const listBook = await this.bookRepository.findById(id);
    return listBook;
  }
}
