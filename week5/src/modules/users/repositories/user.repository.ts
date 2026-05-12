import { pool } from "../../../db.config.js";
import { RowDataPacket } from "mysql2";

export const getUser = async (userId: number) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};
