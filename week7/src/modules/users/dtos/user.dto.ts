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
