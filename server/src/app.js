import express from "express";
import { Database } from "./database";
const app = express();
Database.connect(
  "mongodb+srv://mariam:0NOXKwlCOSuLEGiz@cluster0.4vd1w.mongodb.net/mean-stack-cms?retryWrites=true&w=majority",
  3000
);
