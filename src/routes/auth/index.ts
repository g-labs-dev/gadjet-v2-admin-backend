import { Router } from 'express';

import * as authService from '@services/auth.service';

import onError from '@utils/error';
import { getIp } from '@utils/ip';

const router = Router({ mergeParams: true, caseSensitive: true });

export const authRouter = () => {
  router.post('/login', async (req, res) => {
    const { password } = req.body;

    try {
      const isValid = authService.validatePassword(password);

      if (!isValid) return res.sendStatus(403);

      const ip = getIp(req);
      const token = authService.getToken(ip);

      res.setHeader('Authorization', token);

      res.json(token);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  return router;
};
