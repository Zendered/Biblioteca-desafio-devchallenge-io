import { IBooksDTO } from '.';

export interface IBookRepository {
    add(book: IBooksDTO): Promise<void>
    findById(id: string): Promise<IBooksDTO | undefined>
    findAll(): Promise<IBooksDTO[]>
    update(id: string, request: IBooksDTO): Promise<IBooksDTO>
    delete(id: string): Promise<void>
    exists(book: IBooksDTO): Promise<boolean>
}
