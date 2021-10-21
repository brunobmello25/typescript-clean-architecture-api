import { Express, Router } from 'express';
import fg from 'fast-glob';

export function configRoutes(app: Express) {
  const router = Router();

  app.use(router);

  const routesPath = '**/src/main/routes/**/**routes.ts';

  fg.sync(routesPath).map(async (file) => {
    (await import(`../../../${file}`)).default(router);
  });
}
