import mongoose from 'mongoose';
import logger from './services/LoggerService';

export default class Database {
  static connect(uri) {
    mongoose
      .connect(uri)
      .then(() => {
        console.log('Database connected');
        logger.info('Database connection successful');
      })
      .catch((err) => {
        console.error(err);
        logger.error(err);
      });
  }
}
