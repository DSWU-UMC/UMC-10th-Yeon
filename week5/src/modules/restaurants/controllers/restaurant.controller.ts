import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { restaurantAdd, reviewAdd } from "../services/restaurant.service.js";
import { bodyToRestaurant, AddRestaurantRequest, bodyToReview, ReviewRequest } from "../dtos/restaurant.dto.js";

export const handleAddRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regionId = parseInt(req.params.regionId as string);
    const restaurant = await restaurantAdd(bodyToRestaurant(req.body as AddRestaurantRequest, regionId));
    res.status(StatusCodes.CREATED).json({ result: restaurant });
  } catch (err) {
    next(err);
  }
};

export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId as string);
    const review = await reviewAdd(bodyToReview(req.body as ReviewRequest, restaurantId));
    res.status(StatusCodes.OK).json({ result: review });
  } catch (err) {
    next(err);
  }
};
