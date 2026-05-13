import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { missionAdd, missionChallenge, restaurantMissionList, userChallengingMissionList, missionComplete } from "../services/mission.service.js";
import { bodyToMission, AddMissionRequest, bodyToMissionRecord, ChallengeMissionRequest } from "../dtos/mission.dto.js";

export const handleAddMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId as string);
    const mission = await missionAdd(bodyToMission(req.body as AddMissionRequest, restaurantId));
    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (err) {
    next(err);
  }
};

export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const missionId = parseInt(req.params.missionId as string);
    const record = await missionChallenge(bodyToMissionRecord(req.body as ChallengeMissionRequest, missionId));
    res.status(StatusCodes.CREATED).json({ result: record });
  } catch (err) {
    next(err);
  }
};

export const handleGetRestaurantMissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId as string);
    const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : undefined;
    const result = await restaurantMissionList(restaurantId, cursor);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};

export const handleGetUserMissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId as string);
    const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : undefined;
    const result = await userChallengingMissionList(userId, cursor);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};

export const handleCompleteMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recordId = parseInt(req.params.recordId as string);
    const result = await missionComplete(recordId);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};
