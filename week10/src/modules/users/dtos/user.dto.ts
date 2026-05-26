export interface UpdateUserRequest {
  /** 변경할 닉네임 */
  nickname?: string;
  /** 변경할 전화번호 */
  phoneNum?: string;
  /** 변경할 생일 (YYYY-MM-DD) */
  birthday?: string;
}

export interface UserProfileResponse {
  id: number;
  email: string;
  nickname: string;
  phoneNum: string | null;
  birthday: Date | null;
  point: number;
}

export interface UserReviewItem {
  id: number;
  restaurantName: string;
  score: number;
  content: string;
  createdAt: Date;
}

export interface UserReviewListResponse {
  reviews: UserReviewItem[];
  nextCursor: number | null;
}

export interface UserMissionItem {
  recordId: number;
  missionId: number;
  missionName: string;
  missionSpec: string;
  restaurantName: string;
  rewardPoints: number;
  status: string;
}

export interface UserMissionListResponse {
  missions: UserMissionItem[];
  nextCursor: number | null;
}
