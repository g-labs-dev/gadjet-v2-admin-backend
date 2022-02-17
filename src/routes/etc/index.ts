import { Router } from 'express';

import * as etcService from '@services/etc.service';

import onError from '@utils/error';

const router = Router({ mergeParams: true, caseSensitive: true });

export const etcRouter = () => {
  router.get('/banks', async (req, res) => {
    try {
      const banks = await etcService.getBanks();
      res.json(banks);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  return router;
};
