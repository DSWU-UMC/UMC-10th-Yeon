export interface AddRestaurantRequest {
  name: string;
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
  userId: number;
  content: string;
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
