import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../db.config.js";
import { SignupRequest, LoginRequest, AuthTokenResponse } from "../dtos/auth.dto.js";
import { DuplicateEmailError, InvalidCredentialsError } from "../../../common/errors/error.js";

export const signup = async (data: SignupRequest): Promise<AuthTokenResponse> => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new DuplicateEmailError("이미 가입된 이메일입니다.");

  const hashed = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashed,
      nickname: data.nickname,
      phoneNum: data.phoneNum ?? null,
      birthday: data.birthday ? new Date(data.birthday) : null,
    },
  });

  const accessToken = issueToken(user.id);
  return { accessToken, userId: user.id, nickname: user.nickname };
};

export const login = async (data: LoginRequest): Promise<AuthTokenResponse> => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !user.password) throw new InvalidCredentialsError("이메일 또는 비밀번호가 올바르지 않습니다.");

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new InvalidCredentialsError("이메일 또는 비밀번호가 올바르지 않습니다.");

  const accessToken = issueToken(user.id);
  return { accessToken, userId: user.id, nickname: user.nickname };
};

const issueToken = (userId: number): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET 환경변수가 설정되지 않았습니다.");
  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};
