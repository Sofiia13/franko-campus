const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.post("/event-registration", eventsController.eventRegistration);

router.get("/events-list", eventsController.initialListOfEvents);

router.get("/events-list-extended", eventsController.extendedListOfEvents);

router.get("/search-event/:key", eventsController.searchEvent);

module.exports = router;
