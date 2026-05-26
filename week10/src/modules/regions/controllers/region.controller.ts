import { Body, Controller, Middlewares, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { authenticate } from "../../../middleware/authentication.js";
import { restaurantAdd } from "../../restaurants/services/restaurant.service.js";
import { AddRestaurantRequest, RestaurantResponse } from "../../restaurants/dtos/restaurant.dto.js";
import { ApiResponse, ErrorResponse, success } from "../../../common/responses/response.js";

@Route("regions")
@Tags("Regions")
export class RegionController extends Controller {
  /**
   * 특정 지역에 새 가게를 등록합니다.
   * @param regionId 가게를 등록할 지역의 ID
   * @param body 가게 이름과 카테고리
   */
  @Post("{regionId}/restaurants")
  @Middlewares(authenticate)
  @SuccessResponse(201, "가게 등록 성공")
  @Response<ErrorResponse>(401, "인증 토큰이 없거나 유효하지 않습니다. (U004)")
  @Response<ErrorResponse>(404, "존재하지 않는 지역입니다. (R001)")
  public async addRestaurant(
    @Path() regionId: number,
    @Body() body: AddRestaurantRequest,
  ): Promise<ApiResponse<RestaurantResponse>> {
    this.setStatus(201);
    const restaurant = await restaurantAdd({ ...body, regionId });
    return success(restaurant);
  }
}
