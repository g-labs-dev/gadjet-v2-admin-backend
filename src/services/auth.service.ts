import config from '@config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const validatePassword = (password: string): boolean => {
  const crypted = crypto.createHash('sha512').update(password).digest('base64');
  return crypted === config.passwordHash;
};

export const validateToken = (token: string): boolean => {
  try {
    jwt.verify(token, config.jwtSecret);
    return true;
  } catch (err) {
    return false;
  }
};

export const getToken = (ip: string) => jwt.sign({ ip }, config.jwtSecret, { expiresIn: '10y' });
