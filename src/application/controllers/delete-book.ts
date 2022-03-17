import { IUseCase } from '@/domain/contracts/gateways';
import { IControllerOperation, IHttpRequest, IHttpResponse } from '../contracts';
import { ok } from '../helpers';

export class DeleteBookController implements IControllerOperation {
  requiredParams: string[] = ['id'];

  constructor(private readonly useCase: IUseCase) {}

  async specificOp(request: IHttpRequest): Promise<IHttpResponse> {
    const result = await this.useCase.perform(request.body.id);
    return ok(result);
  }
}
