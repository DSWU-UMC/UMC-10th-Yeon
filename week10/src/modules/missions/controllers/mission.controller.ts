import { Controller, Middlewares, Patch, Path, Post, Request, Response, Route, SuccessResponse, Tags } from "tsoa";
import express from "express";
import { missionChallenge, missionComplete } from "../services/mission.service.js";
import { MissionRecordResponse } from "../dtos/mission.dto.js";
import { ApiResponse, ErrorResponse, success } from "../../../common/responses/response.js";
import { authenticate, JwtPayload } from "../../../middleware/authentication.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 로그인한 유저가 특정 미션에 도전을 시작합니다. (로그인 필요)
   * @param missionId 도전할 미션의 ID
   */
  @Post("{missionId}/challenge")
  @Middlewares(authenticate)
  @SuccessResponse(201, "미션 도전 성공")
  @Response<ErrorResponse>(401, "인증 토큰이 없거나 유효하지 않습니다. (U004)")
  @Response<ErrorResponse>(404, "존재하지 않는 유저 또는 미션입니다. (U001 / M001)")
  @Response<ErrorResponse>(409, "이미 도전 중인 미션입니다. (M002)")
  public async challengeMission(
    @Path() missionId: number,
    @Request() req: express.Request,
  ): Promise<ApiResponse<MissionRecordResponse>> {
    this.setStatus(201);
    const { userId } = req.user as JwtPayload;
    return success(await missionChallenge({ userId, missionId }));
  }

  /**
   * 진행 중인 미션을 완료 처리합니다. (로그인 필요)
   * @param recordId 완료할 미션 기록의 ID
   */
  @Patch("records/{recordId}/complete")
  @Middlewares(authenticate)
  @SuccessResponse(200, "미션 완료 처리 성공")
  @Response<ErrorResponse>(401, "인증 토큰이 없거나 유효하지 않습니다. (U004)")
  public async completeMission(
    @Path() recordId: number,
  ): Promise<ApiResponse<MissionRecordResponse>> {
    return success(await missionComplete(recordId));
  }
}
