export interface ApiResponse<T> {
  resultType: "SUCCESS";
  error: null;
  success: T;
}

export const success = <T>(data: T): ApiResponse<T> => ({
  resultType: "SUCCESS",
  error: null,
  success: data,
});

export interface ErrorDetail {
  errorCode: string;
  reason: string | null;
  data: unknown | null;
}

export interface ErrorResponse {
  resultType: "FAIL";
  error: ErrorDetail;
  success: null;
}
