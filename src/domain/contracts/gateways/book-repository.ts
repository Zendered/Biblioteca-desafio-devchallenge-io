import { IBooksDTO } from '.';

export interface IBookRepository {
    add(book: IBooksDTO): Promise<void>
    findById(id: string): Promise<IBooksDTO | undefined>
    findAll(): Promise<IBooksDTO[]>
    update(request: IBooksDTO): Promise<void>
    delete(id: string): Promise<void>
    exists(book: IBooksDTO): Promise<boolean>
}
