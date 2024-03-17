const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/validate", authController.validate);

router.post("/login", authController.login);

router.post("/profile", authController.profileInfo);

module.exports = router;
