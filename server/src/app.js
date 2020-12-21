import express from "express";
import bodyParser from "body-parser";
import { Database } from "./database";
import user from "./routes/api/user";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(user);

Database.connect(
  "mongodb+srv://mariam:0NOXKwlCOSuLEGiz@cluster0.4vd1w.mongodb.net/mean-stack-cms?retryWrites=true&w=majority",
  3000
);
