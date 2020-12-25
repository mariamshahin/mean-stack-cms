import dotenv from 'dotenv';
import ExpressLoader from './loaders/Express';
import { Database } from './database';

const expressApp = new ExpressLoader();

dotenv.config();

expressApp.Server();
Database.connect(process.env.DB_URI);
