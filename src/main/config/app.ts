import express from 'express';
import { setupMiddleware } from './middleware';

export const app = express();
setupMiddleware(app);
