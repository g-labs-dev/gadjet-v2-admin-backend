import { Router } from 'express';

import { hqRouter } from './hqs';
import { branchRouter } from './hqs/branches';

const router = Router({ mergeParams: true, caseSensitive: true });

const routes = (): Router => {
  router.use('/hqs/:hqId/branches', branchRouter());
  router.use('/hqs', hqRouter());

  return router;
};

export default routes;
