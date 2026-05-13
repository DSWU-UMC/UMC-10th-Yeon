import { pool } from "../../../db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { CreateRestaurantData } from "../dtos/restaurant.dto.js";

// 지역 존재 여부 확인
export const getRegion = async (regionId: number) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM region WHERE id = ?",
      [regionId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

// 가게 추가
export const addRestaurant = async (data: CreateRestaurantData) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO restaurant (region_id, name, category) VALUES (?, ?, ?)",
      [data.regionId, data.name, data.category]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

// 가게 존재 여부 확인
export const getRestaurant = async (restaurantId: number) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM restaurant WHERE id = ?",
      [restaurantId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

// 리뷰 추가
export const addReview = async (data: any) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO review (user_id, restaurant_id, body, score) VALUES (?, ?, ?, ?)",
      [data.userId, data.restaurantId, data.content, data.score]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

// 추가된 리뷰 조회
export const getReview = async (reviewId: number) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM review WHERE id = ?",
      [reviewId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};