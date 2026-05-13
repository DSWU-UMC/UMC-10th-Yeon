export interface AddRestaurantRequest {
  name: string;
  category: string;
}

export interface CreateRestaurantData {
  regionId: number;
  name: string;
  category: string;
}

export const responseFromRestaurant = (restaurant: any) => {
  return {
    id: restaurant.id,
    name: restaurant.name,
    category: restaurant.category,
    regionId: restaurant.regionId,
  };
};

export const bodyToRestaurant = (body: AddRestaurantRequest, regionId: number): CreateRestaurantData => {
  return {
    regionId,
    name: body.name,
    category: body.category,
  };
};

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

export const responseFromReview = (review: any) => {
  return {
    id: review.id,
    userId: review.userId,
    restaurantId: review.restaurantId,
    content: review.body,
    score: review.score,
    createdAt: review.createdAt,
  };
};

export const bodyToReview = (body: ReviewRequest, restaurantId: number): CreateReviewData => {
  return {
    userId: body.userId,
    restaurantId,
    content: body.content,
    score: body.score,
  };
};
