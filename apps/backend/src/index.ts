import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';
import { getLanguage } from './middleware/getLanguage';
import { dbCreateConnection } from './orm/dbCreateConnection';
import routes from './routes';

export const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(getLanguage);

try {
  const logDirectory = path.join(__dirname, '../log');
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }
  const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), {
    flags: 'a',
  });
  accessLogStream.on('error', (err) => {
    console.warn('Access log stream error:', err);
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan('combined'));

app.use('/', routes);

app.use(errorHandler);

const port = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  (async () => {
    await dbCreateConnection();
  })();
}
