import "dotenv/config";
import "reflect-metadata";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import passport from "./middleware/passport.js";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get("/", (_req: Request, res: Response) => {
  res.send("서버 동작 중!");
});

const swaggerDocument = JSON.parse(readFileSync("dist/swagger.json", "utf-8"));
app.use("/index", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Google OAuth 라우트 (TSOA 밖에서 처리 — 리다이렉트 플로우이므로)
app.get(
  "/api/v1/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"], session: false }),
);

app.get(
  "/api/v1/auth/google/callback",
  passport.authenticate("google", { session: false, failWithError: true }),
  (req: Request, res: Response) => {
    const user = req.user as { id: number; nickname: string };
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    res.json({
      resultType: "SUCCESS",
      error: null,
      success: { accessToken: token, userId: user.id, nickname: user.nickname },
    });
  },
);

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
