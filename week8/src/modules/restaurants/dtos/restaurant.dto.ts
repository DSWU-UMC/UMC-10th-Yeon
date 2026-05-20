export interface AddRestaurantRequest {
  /** 가게 이름 */
  name: string;
  /** 음식 카테고리 (예: 한식, 중식, 일식, 양식) */
  category: string;
}

export interface CreateRestaurantData {
  regionId: number;
  name: string;
  category: string;
}

export interface RestaurantResponse {
  id: number;
  name: string;
  category: string;
  regionId: number;
}

export const responseFromRestaurant = (restaurant: any): RestaurantResponse => ({
  id: restaurant.id,
  name: restaurant.name,
  category: restaurant.category,
  regionId: restaurant.regionId,
});

export interface ReviewRequest {
  /** 리뷰를 작성하는 유저 ID */
  userId: number;
  /** 리뷰 본문 */
  content: string;
  /** 별점 (1~5) */
  score: number;
}

export interface CreateReviewData {
  userId: number;
  restaurantId: number;
  content: string;
  score: number;
}

export interface ReviewResponse {
  id: number;
  userId: number;
  restaurantId: number;
  content: string;
  score: number;
  createdAt: Date;
}

export const responseFromReview = (review: any): ReviewResponse => ({
  id: review.id,
  userId: review.userId,
  restaurantId: review.restaurantId,
  content: review.body,
  score: review.score,
  createdAt: review.createdAt,
});
