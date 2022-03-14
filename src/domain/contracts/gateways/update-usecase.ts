export interface IUpdateUseCase {
    perform(id: string, request: any): Promise<any>
}
