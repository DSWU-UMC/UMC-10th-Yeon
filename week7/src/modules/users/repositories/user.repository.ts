import { prisma } from "../../../db.config.js";

export const getUser = async (userId: number) => {
  return prisma.user.findUnique({ where: { id: userId } });
};

// 내가 작성한 리뷰 목록 (커서 페이지네이션)
export const getUserReviews = async (userId: number, cursor?: number) => {
  const reviews = await prisma.review.findMany({
    where: { userId },
    take: 10,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: "desc" },
    include: {
      restaurant: { select: { name: true } },
    },
  });
  const nextCursor = reviews.length === 10 ? reviews[reviews.length - 1]?.id : null;
  return { reviews, nextCursor };
};
