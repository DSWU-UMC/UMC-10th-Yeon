import { prisma } from "../../../db.config.js";
import { CreateMissionData, CreateMissionRecordData } from "../dtos/mission.dto.js";

export const getMission = async (missionId: number) => {
  return prisma.mission.findUnique({ where: { id: missionId } });
};

export const addMission = async (data: CreateMissionData) => {
  return prisma.mission.create({
    data: {
      restaurantId: data.restaurantId,
      name: data.name,
      missionSpec: data.missionSpec,
      rewardPoints: data.rewardPoints,
    },
  });
};

export const getActiveMissionRecord = async (userId: number, missionId: number) => {
  return prisma.missionRecord.findFirst({
    where: { userId, missionId, status: "CHALLENGING" },
  });
};

export const addMissionRecord = async (data: CreateMissionRecordData) => {
  return prisma.missionRecord.create({
    data: {
      userId: data.userId,
      missionId: data.missionId,
      status: "CHALLENGING",
    },
  });
};

export const getMissionRecord = async (recordId: number) => {
  return prisma.missionRecord.findUnique({ where: { id: recordId } });
};

export const getRestaurantMissions = async (restaurantId: number, cursor?: number) => {
  const missions = await prisma.mission.findMany({
    where: { restaurantId },
    take: 10,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: "asc" },
  });
  const nextCursor = missions.length === 10 ? (missions[missions.length - 1]?.id ?? null) : null;
  return { missions, nextCursor };
};

export const getUserChallengingMissions = async (userId: number, cursor?: number) => {
  const records = await prisma.missionRecord.findMany({
    where: { userId, status: "CHALLENGING" },
    take: 10,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: "desc" },
    include: {
      mission: {
        include: {
          restaurant: { select: { name: true } },
        },
      },
    },
  });
  const nextCursor = records.length === 10 ? (records[records.length - 1]?.id ?? null) : null;
  return { records, nextCursor };
};

export const completeMissionRecord = async (recordId: number) => {
  return prisma.missionRecord.update({
    where: { id: recordId },
    data: { status: "COMPLETED" },
  });
};
