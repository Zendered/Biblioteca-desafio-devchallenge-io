import { IControllerOperation, IHttpRequest, IHttpResponse } from '../contracts';
import { badRequest, serverError } from '../helpers';

export class Controller {
  constructor(private controllerOP: IControllerOperation) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const missingParams: string = Controller.getMissingPArams(request, this.controllerOP.requiredParams);
      if (missingParams) {
        return badRequest(new Error('Missing Parameter'));
      }
      const createBook = await this.controllerOP.specificOp(request);
      return createBook;
    } catch (error) {
      return serverError(error);
    }
  }

  static getMissingPArams(request: IHttpRequest, requireParams: string[]): string {
    const missingParams: string[] = [];
    requireParams.forEach(name => {
      if (!Object.keys(request.body).includes(name)) {
        missingParams.push(name);
      }
    });
    return missingParams.join(', ');
  }
}
