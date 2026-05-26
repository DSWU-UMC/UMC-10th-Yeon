import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { signup, login } from "../services/auth.service.js";
import { SignupRequest, LoginRequest, AuthTokenResponse } from "../dtos/auth.dto.js";
import { ApiResponse, ErrorResponse, success } from "../../../common/responses/response.js";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  /**
   * 회원가입 후 JWT 토큰을 발급합니다.
   * @param body 이메일, 비밀번호, 닉네임 (전화번호·생일 선택)
   */
  @Post("signup")
  @SuccessResponse(201, "회원가입 성공")
  @Response<ErrorResponse>(409, "이미 가입된 이메일입니다. (U002)")
  public async signup(
    @Body() body: SignupRequest,
  ): Promise<ApiResponse<AuthTokenResponse>> {
    this.setStatus(201);
    return success(await signup(body));
  }

  /**
   * 이메일/비밀번호로 로그인 후 JWT 토큰을 발급합니다.
   * @param body 이메일, 비밀번호
   */
  @Post("login")
  @SuccessResponse(200, "로그인 성공")
  @Response<ErrorResponse>(401, "이메일 또는 비밀번호가 올바르지 않습니다. (U003)")
  public async login(
    @Body() body: LoginRequest,
  ): Promise<ApiResponse<AuthTokenResponse>> {
    return success(await login(body));
  }
}
