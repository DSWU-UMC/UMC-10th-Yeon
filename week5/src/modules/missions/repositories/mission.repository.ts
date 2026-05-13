import { pool } from "../../../db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { CreateMissionData, CreateMissionRecordData } from "../dtos/mission.dto.js";

// 미션 존재 여부 확인
export const getMission = async (missionId: number) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM mission WHERE id = ?",
      [missionId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

// 이미 도전 중인 미션인지 확인
export const getActiveMissionRecord = async (userId: number, missionId: number) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM mission_record WHERE user_id = ? AND mission_id = ? AND status = 'CHALLENGING'",
      [userId, missionId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 추가
export const addMission = async (data: CreateMissionData) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO mission (restaurant_id, name, mission_spec, reward_points) VALUES (?, ?, ?, ?)",
      [data.restaurantId, data.name, data.missionSpec, data.rewardPoints]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 도전 기록 추가
export const addMissionRecord = async (data: CreateMissionRecordData) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO mission_record (user_id, mission_id, status) VALUES (?, ?, 'CHALLENGING')",
      [data.userId, data.missionId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

// 도전 기록 조회
export const getMissionRecord = async (recordId: number) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM mission_record WHERE id = ?",
      [recordId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};
