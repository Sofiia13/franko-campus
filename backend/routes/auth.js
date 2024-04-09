const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authCheck } = require("../services/jwt");

router.use((req, res, next) => {
    if (req.path == "/logout") {
        return next();
    }
    authCheck(req, res, next);
});

router.post("/register", authController.register);

router.post("/validate", authController.validate);

router.post("/login", authController.login);

router.post("/profile", authController.profileInfo);

router.get("/logout", authController.logout);

module.exports = router;
