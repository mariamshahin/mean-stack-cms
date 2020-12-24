import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import compression from "compression";
import morgan from "morgan";
import logger from "../services/LoggerService";
//const path = require( "path" );
//const config = require( "../config" );

import routes from "../routes";

export default class ExpressLoader {
  constructor() {
    const app = express();
    const multipart = multer();

    // Serve static content
    // app.use( express.static( path.join( __dirname, "uploads" ) ) );

    // Set up middleware
    app.use(morgan("dev"));
    app.use(compression());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(multipart.array());

    // Pass app to routes
    routes(app);

    // Setup error handling, this must be after all other middleware
    app.use(ExpressLoader.errorHandler);

    // Start application
    this.server = app.listen(3000, () => {
      logger.info(`Express running, now listening on port ${3000}`);
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
      if (error && typeof error === "object") {
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
