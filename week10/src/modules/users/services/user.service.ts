import { getUser, getUserReviews, updateUser } from "../repositories/user.repository.js";
import { UpdateUserRequest, UserProfileResponse } from "../dtos/user.dto.js";
import { NotFoundUserError } from "../../../common/errors/error.js";

export const userProfileUpdate = async (userId: number, data: UpdateUserRequest): Promise<UserProfileResponse> => {
  const user = await getUser(userId);
  if (!user) throw new NotFoundUserError("존재하지 않는 유저입니다.");
  const updated = await updateUser(userId, data);
  return {
    id: updated.id,
    email: updated.email,
    nickname: updated.nickname,
    phoneNum: updated.phoneNum ?? null,
    birthday: updated.birthday ?? null,
    point: updated.point,
  };
};

export const userReviewList = async (userId: number, cursor?: number) => {
  const user = await getUser(userId);
  if (!user) throw new NotFoundUserError("존재하지 않는 유저입니다.");
  const { reviews, nextCursor } = await getUserReviews(userId, cursor);
  return {
    reviews: reviews.map((r) => ({
      id: r.id,
      restaurantName: r.restaurant.name,
      score: r.score,
      content: r.body,
      createdAt: r.createdAt,
    })),
    nextCursor,
  };
};
