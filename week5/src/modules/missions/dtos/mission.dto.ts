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
    restaurantId: mission.restaurant_id,
    name: mission.name,
    missionSpec: mission.mission_spec,
    rewardPoints: mission.reward_points,
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
    userId: record.user_id,
    missionId: record.mission_id,
    status: record.status,
    createdAt: record.created_at,
  };
};

export const bodyToMissionRecord = (body: ChallengeMissionRequest, missionId: number): CreateMissionRecordData => {
  return {
    userId: body.userId,
    missionId,
  };
};
