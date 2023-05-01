import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";

import "dotenv/config";

const app = express();
const { PORT, MONGO_DB_URL } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1", routes);

const port = PORT || 8000;
const server = http.createServer(app);

mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to mongodb");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1); // 현재 프로세스 종료 exit(1) 다른 프로세스나 시스템에서 현재 프로세스가 비정상적 종료를 의미
  });
