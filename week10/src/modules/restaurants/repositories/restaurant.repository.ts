import { prisma } from "../../../db.config.js";
import { CreateRestaurantData, CreateReviewData } from "../dtos/restaurant.dto.js";

export const getRegion = async (regionId: number) => {
  return prisma.region.findUnique({ where: { id: regionId } });
};

export const addRestaurant = async (data: CreateRestaurantData) => {
  return prisma.restaurant.create({
    data: {
      regionId: data.regionId,
      name: data.name,
      category: data.category,
    },
  });
};

export const getRestaurant = async (restaurantId: number) => {
  return prisma.restaurant.findUnique({ where: { id: restaurantId } });
};

export const addReview = async (data: CreateReviewData) => {
  return prisma.review.create({
    data: {
      userId: data.userId,
      restaurantId: data.restaurantId,
      body: data.content,
      score: data.score,
    },
  });
};
