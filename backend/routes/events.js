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



// # Special routes

router.get("/supabase-credentials", eventsController.getSupabaseCredentials);

// # Event

router.get("/event/:id", eventsController.getEvent);

router.post("/create-event", eventsController.createEvent);

router.delete("/delete-event/:id", eventsController.deleteEvent);

router.patch("/edit-event/:id", eventsController.editEvent);

router.post(
  "/upload-image/:id",  
  upload.array("files"),
  eventsController.uploadImage
);

// # Event signup

router.post("/cancel-event-reg/:id", eventsController.cancelEventRegistration);

router.post("/signup-to-event/:id", eventsController.signupToEvent);

router.get("/check-signup-to-event/:id", eventsController.checkSignupToEvent)

// # Retrieve events

router.get("/events-list", eventsController.initialListOfEvents);

router.get("/events-list-extended", eventsController.extendedListOfEvents);

router.get("/event-list-for-user", eventsController.getEventsForUser);

router.get("/user-list-for-event", eventsController.getUsersForEvent);

router.get("/filter-events", eventsController.filterEvents);

router.get("/search-events/:key", eventsController.filterSearchedEvents);

// # Rating

router.post("/rate-event/:id", eventsController.rateEvent);

router.get("/get-event-rating/:id", eventsController.getEventRating);

router.delete("/delete-event-rating/:id", eventsController.deleteRating);

// # Comments

router.post("/add-comment/:id", eventsController.addComment);

router.delete("/delete-comment/:id", eventsController.deleteComment);

router.get("/retrieve-comments/:id", eventsController.retrieveComments);

// # Bookmarks

router.post("/bookmark-event/:id", eventsController.addEventToBookmarks);

router.delete("/delete-bookmark/:id", eventsController.deleteEventFromBookmarks);

module.exports = router;
