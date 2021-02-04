import 'regenerator-runtime/runtime.js';
import fs from 'fs';
import ExpressLoader from './loaders/Express';
import config from './config';
import Database from './Database';

if (config.env === 'development') require('dotenv').config();

const dir = 'uploads';
const expressApp = new ExpressLoader();

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
expressApp.server();
Database.connect(config.dbUrl);
