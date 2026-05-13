const pool = require("../../../db");

const findAll = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

module.exports = { findAll };