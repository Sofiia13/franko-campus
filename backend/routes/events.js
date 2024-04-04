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

//const upload = multer({ dest: 'uploads/' });

const eventsController = require("../controllers/eventsController");

router.post("/event-registration", eventsController.eventRegistration);

router.post("/upload-image/:id", upload.array('files'), eventsController.uploadImage);

router.get("/events-list", eventsController.initialListOfEvents);

router.get("/events-list-extended", eventsController.extendedListOfEvents);

module.exports = router;