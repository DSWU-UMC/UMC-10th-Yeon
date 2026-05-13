import { Body, Controller, Path, Post, Route, SuccessResponse, Tags } from "tsoa";
import { restaurantAdd } from "../../restaurants/services/restaurant.service.js";
import { AddRestaurantRequest, RestaurantResponse } from "../../restaurants/dtos/restaurant.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("regions")
@Tags("Regions")
export class RegionController extends Controller {
  @Post("{regionId}/restaurants")
  @SuccessResponse(201, "Created")
  public async addRestaurant(
    @Path() regionId: number,
    @Body() body: AddRestaurantRequest,
  ): Promise<ApiResponse<RestaurantResponse>> {
    this.setStatus(201);
    const restaurant = await restaurantAdd({ ...body, regionId });
    return success(restaurant);
  }
}
