const { users } = require("../models");

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:0789@25.33.46.34:5432/campus-db')

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// users.sync({ force: true });

users.create({
    username: "test_username",
    password: "test_hashedPassword",
    email: "test_email",
    university: "test_university"
  });