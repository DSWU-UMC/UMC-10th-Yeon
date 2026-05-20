import { Body, Controller, Get, Path, Post, Query, Response, Route, SuccessResponse, Tags } from "tsoa";
import { reviewAdd } from "../services/restaurant.service.js";
import { ReviewRequest, ReviewResponse } from "../dtos/restaurant.dto.js";
import { missionAdd, restaurantMissionList } from "../../missions/services/mission.service.js";
import { AddMissionRequest, MissionListResponse, MissionResponse } from "../../missions/dtos/mission.dto.js";
import { ApiResponse, ErrorResponse, success } from "../../../common/responses/response.js";

@Route("restaurants")
@Tags("Restaurants")
export class RestaurantController extends Controller {
  /**
   * 가게에 리뷰를 등록합니다.
   * @param restaurantId 리뷰를 등록할 가게의 ID
   * @param body 작성자 유저 ID, 리뷰 내용, 별점
   */
  @Post("{restaurantId}/reviews")
  @SuccessResponse(201, "리뷰 등록 성공")
  @Response<ErrorResponse>(404, "존재하지 않는 유저 또는 가게입니다. (U001 / R002)")
  public async addReview(
    @Path() restaurantId: number,
    @Body() body: ReviewRequest,
  ): Promise<ApiResponse<ReviewResponse>> {
    this.setStatus(201);
    const review = await reviewAdd({ ...body, restaurantId });
    return success(review);
  }

  /**
   * 가게에 미션을 등록합니다.
   * @param restaurantId 미션을 등록할 가게의 ID
   * @param body 미션 이름, 달성 조건, 보상 포인트
   */
  @Post("{restaurantId}/missions")
  @SuccessResponse(201, "미션 등록 성공")
  @Response<ErrorResponse>(404, "존재하지 않는 가게입니다. (R002)")
  public async addMission(
    @Path() restaurantId: number,
    @Body() body: AddMissionRequest,
  ): Promise<ApiResponse<MissionResponse>> {
    this.setStatus(201);
    const mission = await missionAdd({ ...body, restaurantId });
    return success(mission);
  }

  /**
   * 가게의 미션 목록을 조회합니다. (커서 기반 페이지네이션, 10개씩)
   * @param restaurantId 미션 목록을 조회할 가게의 ID
   * @param cursor 이전 페이지의 마지막 미션 ID (첫 요청 시 생략)
   */
  @Get("{restaurantId}/missions")
  @SuccessResponse(200, "미션 목록 조회 성공")
  @Response<ErrorResponse>(404, "존재하지 않는 가게입니다. (R002)")
  public async getRestaurantMissions(
    @Path() restaurantId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<MissionListResponse>> {
    const result = await restaurantMissionList(restaurantId, cursor);
    return success(result);
  }
}
