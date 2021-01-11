import fs from 'fs';
import ExpressLoader from './loaders/Express';
import config from './config';
import Database from './Database';

if (config.env === 'development') require('dotenv').config();

global.__basedir = __dirname;

const dir = `${__basedir}/uploads`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

new ExpressLoader().Server;

Database.connect(config.dbUrl);
