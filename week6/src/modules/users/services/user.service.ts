import { getUser, getUserReviews } from "../repositories/user.repository.js";

export const userReviewList = async (userId: number, cursor?: number) => {
  const user = await getUser(userId);
  if (!user) throw new Error("존재하지 않는 유저입니다.");
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
