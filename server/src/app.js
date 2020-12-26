import dotenv from 'dotenv';
import ExpressLoader from './loaders/Express';
import { Database } from './database';

dotenv.config();

const expressApp = new ExpressLoader();

expressApp.Server();
Database.connect(process.env.DB_URI);
