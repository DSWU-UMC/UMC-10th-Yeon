import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from "tsoa";
import { reviewAdd } from "../services/restaurant.service.js";
import { ReviewRequest } from "../dtos/restaurant.dto.js";
import { missionAdd, restaurantMissionList } from "../../missions/services/mission.service.js";
import { AddMissionRequest } from "../../missions/dtos/mission.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("restaurants")
@Tags("Restaurants")
export class RestaurantController extends Controller {
  @Post("{restaurantId}/reviews")
  @SuccessResponse(201, "Created")
  public async addReview(
    @Path() restaurantId: number,
    @Body() body: ReviewRequest,
  ): Promise<ApiResponse<object>> {
    this.setStatus(201);
    const review = await reviewAdd({ ...body, restaurantId });
    return success(review);
  }

  @Post("{restaurantId}/missions")
  @SuccessResponse(201, "Created")
  public async addMission(
    @Path() restaurantId: number,
    @Body() body: AddMissionRequest,
  ): Promise<ApiResponse<object>> {
    this.setStatus(201);
    const mission = await missionAdd({ ...body, restaurantId });
    return success(mission);
  }

  @Get("{restaurantId}/missions")
  public async getRestaurantMissions(
    @Path() restaurantId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<object>> {
    const result = await restaurantMissionList(restaurantId, cursor);
    return success(result);
  }
}
