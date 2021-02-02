import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';
import morgan from 'morgan';
import routes from '../routes';
import upload from '../middlewares/upload';
import logger from '../services/LoggerService';

export default class ExpressLoader {
  constructor() {
    const app = express();
    const root = process.cwd();
    const corsOptions = {
      origin: true,
    };

    // Set up middleware
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(upload);
    app.use(
      morgan('combined', {
        stream: { write: (message) => logger.info(message) },
      })
    );

    // Serve static content
    app.use('/static/uploads', express.static(path.join(root, 'uploads')));

    // Pass app to routes
    routes(app);

    // Setup error handling, this must be after all other middleware
    app.use(ExpressLoader.errorHandler);

    // use route not found plain response
    app.use(function (req, res) {
      res.sendStatus(404);
    });

    // Start application
    this.server = app.listen(process.env.PORT, () => {
      logger.info(`Express running, now listening on port ${process.env.PORT}`);
    });
  }

  Server() {
    return this.server;
  }

  /**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*}
   */
  static errorHandler(error, req, res, next) {
    let parsedError;

    // Attempt to gracefully parse error object
    try {
      if (error && typeof error === 'object') {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      logger.error(e);
    }

    // Log the original error
    logger.error(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error);
    }

    res.status(400).json({
      error,
    });
  }
}
