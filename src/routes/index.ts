import { authorizeMiddleware } from '@middlewares/authorize';
import { Router } from 'express';

import { authRouter } from './auth';
import { etcRouter } from './etc';
import { hqRouter } from './hqs';
import { branchRouter } from './hqs/branches';

const router = Router({ mergeParams: true, caseSensitive: true });

const routes = (): Router => {
  router.use('/hqs/:hqId/branches', authorizeMiddleware, branchRouter());
  router.use('/hqs', authorizeMiddleware, hqRouter());

  router.use('/auth', authRouter());

  router.use('/etc', etcRouter());
  return router;
};

export default routes;
