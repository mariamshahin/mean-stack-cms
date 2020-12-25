import ExpressLoader from './loaders/Express';
import { Database } from './database';

const expressApp = new ExpressLoader();

expressApp.Server();

Database.connect(
  'mongodb+srv://mariam:0NOXKwlCOSuLEGiz@cluster0.4vd1w.mongodb.net/mean-stack-cms?retryWrites=true&w=majority'
);
