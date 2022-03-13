import { Either, left, right } from '@/shared';
import { IBooksDTO } from '../contracts/gateways';
import { InvalidEntity } from './error/invalid-entity';

export class Entity {
  constructor({
    id, author, editor, thumbnail, title,
  }: IBooksDTO) {}

  static create({
    id, author, editor, thumbnail, title,
  }:IBooksDTO): Either<InvalidEntity, Entity> {
    if (Entity.validate({
      id, author, editor, thumbnail, title,
    })) {
      return right(new Entity({
        id, author, editor, thumbnail, title,
      }));
    }
    return left(new InvalidEntity());
  }

  static validate({
    id, author, editor, thumbnail, title,
  }: IBooksDTO): boolean {
    const invalidAuthor = author.trim();
    const invalidEditor = editor.trim();
    const invalidThumbnail = thumbnail.trim();
    const invalidTitle = title.trim();

    const maxChar = 125;
    const minChar = 2;

    if (!author || !editor || !thumbnail || !title) {
      return false;
    }

    if (invalidAuthor.length > maxChar || invalidAuthor.length < minChar) {
      return false;
    }

    if (invalidEditor.length > maxChar || invalidEditor.length < minChar) {
      return false;
    }

    if (invalidThumbnail.length > maxChar || invalidThumbnail.length < minChar) {
      return false;
    }

    if (invalidTitle.length > maxChar || invalidTitle.length < minChar) {
      return false;
    }

    return true;
  }
}
