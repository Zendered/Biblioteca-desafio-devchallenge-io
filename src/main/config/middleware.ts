import { Express } from 'express';
import { BodyParser } from '../middleware/body-parser';

export const setupMiddleware = (app: Express): void => {
  app.use(BodyParser);
};
