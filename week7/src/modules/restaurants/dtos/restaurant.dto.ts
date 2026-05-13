export interface AddRestaurantRequest {
  name: string;
  category: string;
}

export interface CreateRestaurantData {
  regionId: number;
  name: string;
  category: string;
}

export const responseFromRestaurant = (restaurant: any) => ({
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

export const responseFromReview = (review: any) => ({
  id: review.id,
  userId: review.userId,
  restaurantId: review.restaurantId,
  content: review.body,
  score: review.score,
  createdAt: review.createdAt,
});
