import { CreateMissionData, CreateMissionRecordData, responseFromMission, responseFromMissionRecord } from "../dtos/mission.dto.js";
import {
  getMission, addMission,
  getActiveMissionRecord, addMissionRecord,
  getRestaurantMissions, getUserChallengingMissions, completeMissionRecord,
} from "../repositories/mission.repository.js";
import { getRestaurant } from "../../restaurants/repositories/restaurant.repository.js";
import { getUser } from "../../users/repositories/user.repository.js";
import { NotFoundRestaurantError, NotFoundUserError, NotFoundMissionError, DuplicateMissionChallengeError } from "../../../common/errors/error.js";

export const missionAdd = async (data: CreateMissionData) => {
  const restaurant = await getRestaurant(data.restaurantId);
  if (!restaurant) throw new NotFoundRestaurantError("존재하지 않는 가게입니다.");
  const mission = await addMission(data);
  return responseFromMission(mission);
};

export const missionChallenge = async (data: CreateMissionRecordData) => {
  const user = await getUser(data.userId);
  if (!user) throw new NotFoundUserError("존재하지 않는 유저입니다.");
  const mission = await getMission(data.missionId);
  if (!mission) throw new NotFoundMissionError("존재하지 않는 미션입니다.");
  const existing = await getActiveMissionRecord(data.userId, data.missionId);
  if (existing) throw new DuplicateMissionChallengeError("이미 도전 중인 미션입니다.");
  const record = await addMissionRecord(data);
  return responseFromMissionRecord(record);
};

export const restaurantMissionList = async (restaurantId: number, cursor?: number) => {
  const restaurant = await getRestaurant(restaurantId);
  if (!restaurant) throw new NotFoundRestaurantError("존재하지 않는 가게입니다.");
  const { missions, nextCursor } = await getRestaurantMissions(restaurantId, cursor);
  return {
    missions: missions.map(responseFromMission),
    nextCursor,
  };
};

export const userChallengingMissionList = async (userId: number, cursor?: number) => {
  const user = await getUser(userId);
  if (!user) throw new NotFoundUserError("존재하지 않는 유저입니다.");
  const { records, nextCursor } = await getUserChallengingMissions(userId, cursor);
  return {
    missions: records.map((r) => ({
      recordId: r.id,
      missionId: r.mission.id,
      missionName: r.mission.name,
      missionSpec: r.mission.missionSpec,
      restaurantName: r.mission.restaurant.name,
      rewardPoints: r.mission.rewardPoints,
      status: r.status,
    })),
    nextCursor,
  };
};

export const missionComplete = async (recordId: number) => {
  const record = await completeMissionRecord(recordId);
  return responseFromMissionRecord(record);
};
