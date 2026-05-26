export interface AddMissionRequest {
  /** 미션 이름 */
  name: string;
  /** 미션 달성 조건 설명 */
  missionSpec: string;
  /** 미션 완료 시 지급되는 포인트 */
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
  /** 미션에 도전하는 유저 ID */
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
