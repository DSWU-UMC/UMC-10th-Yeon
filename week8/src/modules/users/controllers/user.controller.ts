import { Controller, Get, Path, Query, Response, Route, SuccessResponse, Tags } from "tsoa";
import { userReviewList } from "../services/user.service.js";
import { userChallengingMissionList } from "../../missions/services/mission.service.js";
import { ApiResponse, ErrorResponse, success } from "../../../common/responses/response.js";
import { UserMissionListResponse, UserReviewListResponse } from "../dtos/user.dto.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 유저가 작성한 리뷰 목록을 조회합니다. (커서 기반 페이지네이션, 10개씩)
   * @param userId 조회할 유저의 ID
   * @param cursor 이전 페이지의 마지막 리뷰 ID (첫 요청 시 생략)
   */
  @Get("{userId}/reviews")
  @SuccessResponse(200, "리뷰 목록 조회 성공")
  @Response<ErrorResponse>(404, "존재하지 않는 유저입니다. (U001)")
  public async getUserReviews(
    @Path() userId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<UserReviewListResponse>> {
    const result = await userReviewList(userId, cursor);
    return success(result);
  }

  /**
   * 유저가 현재 진행 중인 미션 목록을 조회합니다. (커서 기반 페이지네이션, 10개씩)
   * @param userId 조회할 유저의 ID
   * @param cursor 이전 페이지의 마지막 미션 기록 ID (첫 요청 시 생략)
   */
  @Get("{userId}/missions")
  @SuccessResponse(200, "진행 중인 미션 목록 조회 성공")
  @Response<ErrorResponse>(404, "존재하지 않는 유저입니다. (U001)")
  public async getUserMissions(
    @Path() userId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<UserMissionListResponse>> {
    const result = await userChallengingMissionList(userId, cursor);
    return success(result);
  }
}
