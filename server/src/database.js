import mongoose from "mongoose";
import express from "express";
const app = express();

export class Database {
  constructor() {}

  static connect(uri, port) {
    mongoose
      .connect(uri)
      .then((result) => {
        console.log("DB connected");
        app.listen(port);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
