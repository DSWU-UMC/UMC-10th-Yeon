import "reflect-metadata";
import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("서버 동작 중!");
});

const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  if (res.headersSent) return _next(err);
  res.status(err.statusCode || 500).json({
    resultType: "FAIL",
    error: {
      errorCode: err.errorCode || "UNKNOWN",
      reason: err.message || null,
      data: err.data || null,
    },
    success: null,
  });
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
