import dotenv from 'dotenv';
import ExpressLoader from './loaders/Express';
import Database from './Database';

export default function () {
  dotenv.config();
  global.__basedir = require.main.path;
  const expressApp = new ExpressLoader();
  expressApp.Server();
  Database.connect(process.env.DB_URI);
}
