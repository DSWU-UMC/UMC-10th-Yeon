export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  phoneNum?: string;
  birthday?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  userId: number;
  nickname: string;
}
