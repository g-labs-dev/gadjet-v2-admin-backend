import { Request } from 'express';

export const getIp = (req: Request) => String(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
