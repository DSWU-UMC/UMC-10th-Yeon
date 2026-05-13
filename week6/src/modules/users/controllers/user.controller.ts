import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userReviewList } from "../services/user.service.js";

export const handleGetUserReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId as string);
    const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : undefined;
    const result = await userReviewList(userId, cursor);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};
