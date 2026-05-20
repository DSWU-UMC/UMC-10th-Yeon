import { Body, Controller, Patch, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { missionChallenge, missionComplete } from "../services/mission.service.js";
import { ChallengeMissionRequest, MissionRecordResponse } from "../dtos/mission.dto.js";
import { ApiResponse, ErrorResponse, success } from "../../../common/responses/response.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 유저가 특정 미션에 도전을 시작합니다.
   * @param missionId 도전할 미션의 ID
   * @param body 도전하는 유저 ID
   */
  @Post("{missionId}/challenge")
  @SuccessResponse(201, "미션 도전 성공")
  @Response<ErrorResponse>(404, "존재하지 않는 유저 또는 미션입니다. (U001 / M001)")
  @Response<ErrorResponse>(409, "이미 도전 중인 미션입니다. (M002)")
  public async challengeMission(
    @Path() missionId: number,
    @Body() body: ChallengeMissionRequest,
  ): Promise<ApiResponse<MissionRecordResponse>> {
    this.setStatus(201);
    const record = await missionChallenge({ userId: body.userId, missionId });
    return success(record);
  }

  /**
   * 진행 중인 미션을 완료 처리합니다.
   * @param recordId 완료할 미션 기록의 ID
   */
  @Patch("records/{recordId}/complete")
  @SuccessResponse(200, "미션 완료 처리 성공")
  public async completeMission(
    @Path() recordId: number,
  ): Promise<ApiResponse<MissionRecordResponse>> {
    const result = await missionComplete(recordId);
    return success(result);
  }
}
