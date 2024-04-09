const express = require("express");
const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

const eventsController = require("../controllers/eventsController");

router.post("/create-event", eventsController.createEvent);

router.post("/delete-event/:id", eventsController.deleteEvent);

router.post("/edit-event/:id", eventsController.editEvent);

router.post("/upload-image/:id", upload.array('files'), eventsController.uploadImage);

router.get("/events-list", eventsController.initialListOfEvents);

router.get("/events-list-extended", eventsController.extendedListOfEvents);

router.get("/search-event/:key", eventsController.searchEvent);

module.exports = router;
