import { NextFunction, Request, Response } from 'express';

import * as authService from '@services/auth.service';

export const authorizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token;

  const isValid = authService.validateToken(String(token));

  if (isValid) next();
  else res.sendStatus(401);
};
