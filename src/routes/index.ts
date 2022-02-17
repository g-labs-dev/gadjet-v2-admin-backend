import { Router } from 'express';

import { hqRouter } from './hqs';

const router = Router({ mergeParams: true, caseSensitive: true });

const routes = (): Router => {
  router.use('/hqs/:hqId/branches', hqRouter());
  router.use('/hqs', hqRouter());

  return router;
};

export default routes;
