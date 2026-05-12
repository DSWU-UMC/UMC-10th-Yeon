const express = require("express");
const dotenv = require("dotenv");
const { getUsers } = require("./modules/users/controllers/user.controller");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("서버 동작 중");
});

app.get("/users", getUsers);

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});