class UserResponseDto {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
  }
}

module.exports = { UserResponseDto };