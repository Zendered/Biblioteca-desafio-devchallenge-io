import { IBookRepository, IBooksDTO, IUpdateUseCase } from '@/domain/contracts/gateways';

export class UpdateBook implements IUpdateUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  perform(id: string, request: IBooksDTO): Promise<IBooksDTO> {
    const newBook = this.bookRepository.update(id, request);
    return newBook;
  }
}
