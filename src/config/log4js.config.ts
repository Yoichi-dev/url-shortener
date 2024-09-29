import appRoot from 'app-root-path';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const LOG_ROOT_DIR: string = process.env.LOG_ROOT_DIR || appRoot.resolve('logs');

export default {
  appenders: {
    console: {
      type: 'console'
    },
    application: {
      type: 'dateFile',
      filename: path.join(LOG_ROOT_DIR, './application.log'),
      pattern: 'yyyyMMdd',
      keepFileExt: true,
      numBackups: 7
    },
    access: {
      type: 'dateFile',
      filename: path.join(LOG_ROOT_DIR, './access.log'),
      pattern: 'yyyyMMdd',
      keepFileExt: true,
      numBackups: 7
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'ALL'
    },
    application: {
      appenders: ['console', 'application'],
      level: 'INFO'
    },
    access: {
      appenders: ['console', 'access'],
      level: 'INFO'
    }
  }
};
