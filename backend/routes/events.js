const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const eventsController = require("../controllers/eventsController");

router.post("/create-event", eventsController.createEvent);

router.get("/event/:id", eventsController.getEvent);

router.post("/delete-event/:id", eventsController.deleteEvent);

router.post("/edit-event/:id", eventsController.editEvent);

router.post(
  "/upload-image/:id",
  upload.array("files"),
  eventsController.uploadImage
);

router.post("/signup-to-event/:id", eventsController.signupToEvent);

router.get("/check-signup-to-event/:id", eventsController.checkSignupToEvent)

router.post("/cancel-event-reg/:id", eventsController.cancelEventRegistration);

router.get("/events-list", eventsController.initialListOfEvents);

router.get("/events-list-extended", eventsController.extendedListOfEvents);

router.get("/event-list-for-user", eventsController.getEventsForUser);

router.get("/user-list-for-event", eventsController.getUsersForEvent);

router.get("/filter-events", eventsController.filterEvents);

router.get("/search-events/:key", eventsController.filterSearchedEvents);

module.exports = router;
