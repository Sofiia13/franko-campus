const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authCheck, conventionalAuthCheck } = require("../services/jwt");

router.use((req, res, next) => {
    if (req.path == "/logout") {
        return next();
    }
    authCheck(req, res, next);
});

router.get("/check-token", authCheck, authController.checkToken);

router.get("/conventional-check-token", conventionalAuthCheck, authController.conventionalCheckToken);

router.post("/register", authController.register);

router.post("/validate", authController.validate);

router.post("/login", authController.login);

router.post("/profile", authController.profileInfo);

router.get("/logout", authController.logout);

module.exports = router;
