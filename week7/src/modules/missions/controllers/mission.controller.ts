import { Body, Controller, Patch, Path, Post, Route, SuccessResponse, Tags } from "tsoa";
import { missionChallenge, missionComplete } from "../services/mission.service.js";
import { ChallengeMissionRequest, MissionRecordResponse } from "../dtos/mission.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  @Post("{missionId}/challenge")
  @SuccessResponse(201, "Created")
  public async challengeMission(
    @Path() missionId: number,
    @Body() body: ChallengeMissionRequest,
  ): Promise<ApiResponse<MissionRecordResponse>> {
    this.setStatus(201);
    const record = await missionChallenge({ userId: body.userId, missionId });
    return success(record);
  }

  @Patch("records/{recordId}/complete")
  public async completeMission(
    @Path() recordId: number,
  ): Promise<ApiResponse<MissionRecordResponse>> {
    const result = await missionComplete(recordId);
    return success(result);
  }
}
