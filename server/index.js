import App from './src/App';
import config from './src/config';

global.__basedir = __dirname;

if (config.env === 'development') require('dotenv').config();

App.launch();
