import ExpressLoader from './loaders/Express';
import config from './config';
import Database from './Database';

export default class App {
  static launch() {
    new ExpressLoader().Server;
    Database.connect(config.dbUrl);
  }
}
