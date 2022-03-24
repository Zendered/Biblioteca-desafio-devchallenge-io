import { Express } from 'express';
import { BodyParser } from '../middleware/body-parser';
import { cors } from '../middleware/cors';

export const setupMiddleware = (app: Express): void => {
  app.use(BodyParser);
  app.use(cors);
};
