import { AppError } from "./app.error.js";

export class NotFoundRegionError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "R001", statusCode: 404, message, data });
  }
}

export class NotFoundRestaurantError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "R002", statusCode: 404, message, data });
  }
}

export class NotFoundUserError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "U001", statusCode: 404, message, data });
  }
}

export class NotFoundMissionError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "M001", statusCode: 404, message, data });
  }
}

export class DuplicateMissionChallengeError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "M002", statusCode: 409, message, data });
  }
}

export class DuplicateEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "U002", statusCode: 409, message, data });
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "U003", statusCode: 401, message, data });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, data?: unknown) {
    super({ errorCode: "U004", statusCode: 401, message, data });
  }
}
