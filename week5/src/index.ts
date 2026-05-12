import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { handleAddRestaurant, handleAddReview } from "./modules/restaurants/controllers/restaurant.controller.js";
import { handleAddMission, handleChallengeMission } from "./modules/missions/controllers/mission.controller.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("서버 동작 중!");
});

// 특정 지역에 가게 추가
app.post("/api/v1/regions/:regionId/restaurants", handleAddRestaurant);
// 가게에 리뷰 추가
app.post("/api/v1/restaurants/:restaurantId/reviews", handleAddReview);
// 가게에 미션 추가
app.post("/api/v1/restaurants/:restaurantId/missions", handleAddMission);
// 미션 도전하기
app.post("/api/v1/missions/:missionId/challenge", handleChallengeMission);

// 에러 핸들러
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
