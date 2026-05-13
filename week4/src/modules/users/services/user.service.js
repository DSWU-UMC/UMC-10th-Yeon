const userRepository = require("../repositories/user.repository");

const getAllUsers = async () => {
  return await userRepository.findAll();
};

module.exports = { getAllUsers };