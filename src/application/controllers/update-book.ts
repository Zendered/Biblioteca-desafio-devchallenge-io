import { IUpdateUseCase } from '@/domain/contracts/gateways';
import { IHttpRequest, IHttpResponse } from '../contracts';
import { ok } from '../helpers';

export class UpdateBookController {
  constructor(private readonly useCase: IUpdateUseCase) {}

  async handle(request: IHttpRequest, update: IHttpRequest): Promise<IHttpResponse> {
    const response = await this.useCase.perform(request.body.id, update);
    return ok(response);
  }
}
