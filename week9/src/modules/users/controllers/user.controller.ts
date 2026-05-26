import { Body, Controller, Get, Middlewares, Patch, Path, Query, Request, Response, Route, SuccessResponse, Tags } from "tsoa";
import express from "express";
import { userReviewList, userProfileUpdate } from "../services/user.service.js";
import { userChallengingMissionList } from "../../missions/services/mission.service.js";
import { ApiResponse, ErrorResponse, success } from "../../../common/responses/response.js";
import { UpdateUserRequest, UserMissionListResponse, UserProfileResponse, UserReviewListResponse } from "../dtos/user.dto.js";
import { authenticate, JwtPayload } from "../../../middleware/authentication.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 내 정보를 수정합니다. (닉네임, 전화번호, 생일)
   * @param body 수정할 필드 (모두 선택)
   */
  @Patch("me")
  @Middlewares(authenticate)
  @SuccessResponse(200, "내 정보 수정 성공")
  @Response<ErrorResponse>(401, "인증 토큰이 없거나 유효하지 않습니다. (U004)")
  @Response<ErrorResponse>(404, "존재하지 않는 유저입니다. (U001)")
  public async updateMe(
    @Request() req: express.Request,
    @Body() body: UpdateUserRequest,
  ): Promise<ApiResponse<UserProfileResponse>> {
    const { userId } = req.user as JwtPayload;
    return success(await userProfileUpdate(userId, body));
  }

  /**
   * 유저가 작성한 리뷰 목록을 조회합니다. (커서 기반 페이지네이션, 10개씩)
   * @param userId 조회할 유저의 ID
   * @param cursor 이전 페이지의 마지막 리뷰 ID (첫 요청 시 생략)
   */
  @Get("{userId}/reviews")
  @Middlewares(authenticate)
  @SuccessResponse(200, "리뷰 목록 조회 성공")
  @Response<ErrorResponse>(401, "인증 토큰이 없거나 유효하지 않습니다. (U004)")
  @Response<ErrorResponse>(404, "존재하지 않는 유저입니다. (U001)")
  public async getUserReviews(
    @Path() userId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<UserReviewListResponse>> {
    return success(await userReviewList(userId, cursor));
  }

  /**
   * 유저가 현재 진행 중인 미션 목록을 조회합니다. (커서 기반 페이지네이션, 10개씩)
   * @param userId 조회할 유저의 ID
   * @param cursor 이전 페이지의 마지막 미션 기록 ID (첫 요청 시 생략)
   */
  @Get("{userId}/missions")
  @Middlewares(authenticate)
  @SuccessResponse(200, "진행 중인 미션 목록 조회 성공")
  @Response<ErrorResponse>(401, "인증 토큰이 없거나 유효하지 않습니다. (U004)")
  @Response<ErrorResponse>(404, "존재하지 않는 유저입니다. (U001)")
  public async getUserMissions(
    @Path() userId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<UserMissionListResponse>> {
    return success(await userChallengingMissionList(userId, cursor));
  }
}
