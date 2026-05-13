import { Controller, Get, Path, Query, Route, Tags } from "tsoa";
import { userReviewList } from "../services/user.service.js";
import { userChallengingMissionList } from "../../missions/services/mission.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { UserMissionListResponse, UserReviewListResponse } from "../dtos/user.dto.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Get("{userId}/reviews")
  public async getUserReviews(
    @Path() userId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<UserReviewListResponse>> {
    const result = await userReviewList(userId, cursor);
    return success(result);
  }

  @Get("{userId}/missions")
  public async getUserMissions(
    @Path() userId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<UserMissionListResponse>> {
    const result = await userChallengingMissionList(userId, cursor);
    return success(result);
  }
}
