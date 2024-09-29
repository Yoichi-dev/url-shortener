import type { Request, Response, NextFunction } from 'express';
import { AppLogger } from './logger';

export default (options = {}) => {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    AppLogger.error(err.message);
    next(err);
  };
};
