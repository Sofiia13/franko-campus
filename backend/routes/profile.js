const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/get-info", profileController.getProfileInfo);

router.patch("/",profileController.editProfileInfo);

router.delete("/", profileController.deleteUser);

module.exports = router;
