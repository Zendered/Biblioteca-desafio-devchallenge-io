import { IBooksDTO, IUseCase } from '@/domain/contracts/gateways';
import { Book } from '@/domain/entities';
import { InvalidEntity } from '@/domain/entities/error/invalid-entity';
import { Either } from '@/shared';
import { IControllerOperation, IHttpRequest, IHttpResponse } from '../contracts';
import { badRequest, created } from '../helpers';

export class CreateBookController implements IControllerOperation {
  readonly requiredParams:string[] = ['title', 'editor', 'thumbnail', 'author'];

  constructor(
    private useCase: IUseCase,
  ) {}

  async specificOp(request: IHttpRequest): Promise<IHttpResponse> {
    const bookRequest: IBooksDTO = {
      id: request.body.id,
      author: request.body.author,
      editor: request.body.editor,
      thumbnail: request.body.thumbnail,
      title: request.body.title,
    };

    const response: Either<InvalidEntity, Book> = await this.useCase.perform(bookRequest);

    if (response.isRight()) {
      return created(response.value);
    }

    return badRequest(response.value);
  }
}
