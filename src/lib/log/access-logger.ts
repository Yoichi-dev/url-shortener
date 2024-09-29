import log4js from 'log4js';
import dotenv from 'dotenv';
import { AccessLogger } from './logger';

dotenv.config();

const DEFAULT_LOG_LEBEL: string = process.env.DEFAULT_LOG_LEBEL || 'auto';

type Options = {
  level?: string;
};

export default (options: Options = {}) => {
  const opts = options;
  opts.level = options.level || DEFAULT_LOG_LEBEL;

  return log4js.connectLogger(AccessLogger, opts);
};
