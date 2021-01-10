import mongoose from 'mongoose';
import logger from './services/LoggerService';

export default class Database {
  static connect(uri) {
    mongoose
      .connect(uri)
      .then(() => {
        logger.info('Database connected');
      })
      .catch((err) => {
        logger.error(err);
      });
  }
}
