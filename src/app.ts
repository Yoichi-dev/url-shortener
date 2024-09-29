import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import routes from './routes';
import type { Express, Request, Response, NextFunction } from 'express';
import { AppLogger } from './lib/log/logger';
import applicationLogger from './lib/log/application-logger';
import accessLogger from './lib/log/access-logger';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(accessLogger());

app.use('/', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ status: "404 not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ status: "500 Internal Server Error" });
});

app.use(applicationLogger());

app.listen(port, () => {
  AppLogger.info(`Server started on port ${port}`);
});
