import { Express } from 'express';

import { bodyParser } from '../middlewares/body-parser';

export function configMiddlewares(app: Express) {
  app.use(bodyParser);
}
