import ExpressLoader from './loaders/Express';
import config from './config';
import Database from './Database';

if (config.env === 'development') {
  require('dotenv').config();
  require('../index');
} else {
  global.__basedir = __dirname;
}

new ExpressLoader().Server;
Database.connect(config.dbUrl);
