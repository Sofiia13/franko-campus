const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/get-info", profileController.getProfileInfo);

router.patch("/edit-info",profileController.editProfileInfo);

router.delete("/delete", profileController.deleteUser);

module.exports = router;
