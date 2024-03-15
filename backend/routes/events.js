const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.post("/event-registration", eventsController.event_registration);

router.get("/events-list", eventsController.list_of_events);

module.exports = router;
