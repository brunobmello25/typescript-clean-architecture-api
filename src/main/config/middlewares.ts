import { Express } from 'express';

import { bodyParser } from '../middlewares/body-parser';
import { cors } from '../middlewares/cors';
import { contentType } from '../middlewares/content-type';

export function configMiddlewares(app: Express) {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
}
