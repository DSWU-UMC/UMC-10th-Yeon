import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../common/errors/error.js";

export interface JwtPayload {
  userId: number;
}

// passport의 Express.User 타입에 JWT 페이로드 필드 병합
declare global {
  namespace Express {
    interface User {
      userId?: number;
      id?: number;
      nickname?: string;
    }
  }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return next(new UnauthorizedError("인증 토큰이 없습니다."));
  }

  const token = authHeader.slice(7);
  const secret = process.env.JWT_SECRET;
  if (!secret) return next(new Error("JWT_SECRET 환경변수가 설정되지 않았습니다."));

  try {
    req.user = jwt.verify(token, secret) as JwtPayload;
    next();
  } catch {
    next(new UnauthorizedError("유효하지 않거나 만료된 토큰입니다."));
  }
};
