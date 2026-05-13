export interface AddMissionRequest {
  name: string;
  missionSpec: string;
  rewardPoints: number;
}

export interface CreateMissionData {
  restaurantId: number;
  name: string;
  missionSpec: string;
  rewardPoints: number;
}

export const responseFromMission = (mission: any) => {
  return {
    id: mission.id,
    restaurantId: mission.restaurantId,
    name: mission.name,
    missionSpec: mission.missionSpec,
    rewardPoints: mission.rewardPoints,
  };
};

export const bodyToMission = (body: AddMissionRequest, restaurantId: number): CreateMissionData => {
  return {
    restaurantId,
    name: body.name,
    missionSpec: body.missionSpec,
    rewardPoints: body.rewardPoints,
  };
};

export interface ChallengeMissionRequest {
  userId: number;
}

export interface CreateMissionRecordData {
  userId: number;
  missionId: number;
}

export const responseFromMissionRecord = (record: any) => {
  return {
    id: record.id,
    userId: record.userId,
    missionId: record.missionId,
    status: record.status,
    createdAt: record.createdAt,
  };
};

export const bodyToMissionRecord = (body: ChallengeMissionRequest, missionId: number): CreateMissionRecordData => {
  return {
    userId: body.userId,
    missionId,
  };
};
