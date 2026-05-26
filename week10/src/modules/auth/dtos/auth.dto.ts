export interface SignupRequest {
  /** 이메일 주소 */
  email: string;
  /** 비밀번호 */
  password: string;
  /** 닉네임 */
  nickname: string;
  /** 전화번호 */
  phoneNum?: string;
  /** 생일 (YYYY-MM-DD) */
  birthday?: string;
}

export interface LoginRequest {
  /** 이메일 주소 */
  email: string;
  /** 비밀번호 */
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  userId: number;
  nickname: string;
}
