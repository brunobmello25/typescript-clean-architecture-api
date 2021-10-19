import { Express } from 'express';

import { bodyParser } from '../middlewares/body-parser';
import { cors } from '../middlewares/cors';

export function configMiddlewares(app: Express) {
  app.use(bodyParser);
  app.use(cors);
}
