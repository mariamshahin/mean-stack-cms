import 'regenerator-runtime/runtime.js';
import fs from 'fs';
import ExpressLoader from './loaders/Express';
import config from './config';
import Database from './Database';

if (config.env === 'development') require('dotenv').config();

const dir = 'uploads';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

new ExpressLoader().Server;

Database.connect(config.dbUrl);
