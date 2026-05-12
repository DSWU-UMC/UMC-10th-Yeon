import { CreateMissionData, CreateMissionRecordData, responseFromMission, responseFromMissionRecord } from "../dtos/mission.dto.js";
import { getMission, getActiveMissionRecord, addMission, addMissionRecord, getMissionRecord } from "../repositories/mission.repository.js";
import { getRestaurant } from "../../restaurants/repositories/restaurant.repository.js";
import { getUser } from "../../users/repositories/user.repository.js";

export const missionAdd = async (data: CreateMissionData) => {
  const restaurant = await getRestaurant(data.restaurantId);
  if (!restaurant) {
    throw new Error("존재하지 않는 가게입니다.");
  }
  const missionId = await addMission(data);
  const mission = await getMission(missionId);
  return responseFromMission(mission);
};

export const missionChallenge = async (data: CreateMissionRecordData) => {
  const user = await getUser(data.userId);
  if (!user) {
    throw new Error("존재하지 않는 유저입니다.");
  }
  const mission = await getMission(data.missionId);
  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }
  const existing = await getActiveMissionRecord(data.userId, data.missionId);
  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }
  const recordId = await addMissionRecord(data);
  const record = await getMissionRecord(recordId);
  return responseFromMissionRecord(record);
};
