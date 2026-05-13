import { CreateRestaurantData, responseFromRestaurant, CreateReviewData, responseFromReview } from "../dtos/restaurant.dto.js";
import { getRegion, addRestaurant, getRestaurant, addReview } from "../repositories/restaurant.repository.js";
import { getUser } from "../../users/repositories/user.repository.js";

export const restaurantAdd = async (data: CreateRestaurantData) => {
  const region = await getRegion(data.regionId);
  if (!region) throw new Error("존재하지 않는 지역입니다.");
  const restaurant = await addRestaurant(data);
  return responseFromRestaurant(restaurant);
};

export const reviewAdd = async (data: CreateReviewData) => {
  const user = await getUser(data.userId);
  if (!user) throw new Error("존재하지 않는 유저입니다.");
  const restaurant = await getRestaurant(data.restaurantId);
  if (!restaurant) throw new Error("존재하지 않는 가게입니다.");
  const review = await addReview(data);
  return responseFromReview(review);
};
