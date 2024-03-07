const { users } = require("../models");

users.sync({ force: true });

// users.create({
//     username: "test_username",
//     password: "test_hashedPassword",
//     email: "test_email",
//     university: "test_university",
//     is_verified: "false"
//   });