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

export interface MissionResponse {
  id: number;
  restaurantId: number;
  name: string;
  missionSpec: string;
  rewardPoints: number;
}

export const responseFromMission = (mission: any): MissionResponse => ({
  id: mission.id,
  restaurantId: mission.restaurantId,
  name: mission.name,
  missionSpec: mission.missionSpec,
  rewardPoints: mission.rewardPoints,
});

export interface ChallengeMissionRequest {
  userId: number;
}

export interface CreateMissionRecordData {
  userId: number;
  missionId: number;
}

export interface MissionRecordResponse {
  id: number;
  userId: number;
  missionId: number;
  status: string;
  createdAt: Date;
}

export const responseFromMissionRecord = (record: any): MissionRecordResponse => ({
  id: record.id,
  userId: record.userId,
  missionId: record.missionId,
  status: record.status,
  createdAt: record.createdAt,
});

export interface MissionListResponse {
  missions: MissionResponse[];
  nextCursor: number | null;
}
