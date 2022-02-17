import { authorizeMiddleware } from '@middlewares/authorize';
import { Router } from 'express';

import { authRouter } from './authRouter';
import { hqRouter } from './hqs';
import { branchRouter } from './hqs/branches';

const router = Router({ mergeParams: true, caseSensitive: true });

const routes = (): Router => {
  router.use('/auth', authRouter());
  router.use('/hqs/:hqId/branches', authorizeMiddleware, branchRouter());
  router.use('/hqs', authorizeMiddleware, hqRouter());

  return router;
};

export default routes;
