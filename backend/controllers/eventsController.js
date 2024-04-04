const { events, eventImages } = require("../models");
const moment = require("moment-timezone");

let SUPABASE_URL = "https://tmgzyqbynitvxdqmbyoz.supabase.co"
let SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZ3p5cWJ5bml0dnhkcW1ieW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NDY5NzEsImV4cCI6MjAyNTQyMjk3MX0.H74l6_Rf0u0PBS5VxMM9gae1naZxXpU8Hehm5P7IwI8"


const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const multer = require("multer");
const upload = multer({ dest: 'uploads/' })

// events.sync({ force: true });

// реєстрація нової події
const eventRegistration = async (req, res) => {
  try {
    const { reqName, reqOrganizer, reqDescription } = req.body;

    const existingEvent = await events.findOne({
      where: { name: reqName },
    });

    if (existingEvent) {
      return res.status(400).json({ error: "Такий івент вже існує" });
    }

    if (!reqName.trim() || !reqOrganizer.trim() || !reqDescription.trim()) {
      return res.status(400).json({ error: "Заповни всі поля" });
    }

    const createdEvent = await events.create({
      name: reqName,
      organizer: reqOrganizer,
      description: reqDescription,
    });

    return res.status(200).json({ success: true, id: createdEvent.id });
  } catch (error) {
    console.error("Виникла помилка під час реєстрації події:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

async function uploadImage(req, res) {
  try {
    const { id } = req.params;
    const { files } = req;

    if (!files) {
      return res.status(400).json({ error: "Виберіть файли для завантаження" });
    }

    const event = await events.findOne({
      where: { id },
    });

    if (!event) {
      return res.status(400).json({ error: "Подія не знайдена" });
    }

    const eventImagesList = files.map((file) => ({
      event_id: id,
      name: file.originalname,
      data: file.buffer,
    }));

    await eventImages.bulkCreate(eventImagesList);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Виникла помилка під час завантаження зображення:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }}

  // const { data, error } = await supabase
  //         .storage
  //         .from('campus-bucket')
  //         .upload("public/name1", file, { cacheControl: '3600' });


  const initialListOfEvents = async (req, res) => {
    try {
      const existingEvents = await events.findAll({
        order: [["createdAt", "DESC"]],
        offset: 0, // Початковий зсув - починаємо з першого запису
        limit: 10,
      });

      const listJSON = existingEvents.map((existingEvent) => ({
        ...existingEvent.toJSON(),
        createdAt: moment
          .tz(existingEvent.createdAt, "UTC")
          .tz("Europe/Kiev")
          .format(),
        updatedAt: moment
          .tz(existingEvent.updatedAt, "UTC")
          .tz("Europe/Kiev")
          .format(),
      }));

      return res.json(listJSON);
    } catch (error) {
      console.error("Виникла помилка під час відображення списку подій:", error);
      return res.status(500).json({ error: "Внутрішня помилка сервера." });
    }
  };

  const extendedListOfEvents = async (req, res) => {
    try {
      const { offset = 0 } = req.query;

      const existingEvents = await events.findAll({
        order: [["createdAt", "DESC"]],
        offset: parseInt(offset),
        limit: 20,
      });

      const listJSON = existingEvents.map((existingEvent) => ({
        ...existingEvent.toJSON(),
        createdAt: moment
          .tz(existingEvent.createdAt, "UTC")
          .tz("Europe/Kiev")
          .format(),
        updatedAt: moment
          .tz(existingEvent.updatedAt, "UTC")
          .tz("Europe/Kiev")
          .format(),
      }));

      return res.json(listJSON);
    } catch (error) {
      console.error("Виникла помилка під час відображення списку подій:", error);
      return res.status(500).json({ error: "Внутрішня помилка сервера." });
    }
  };

  module.exports = {
    eventRegistration,
    uploadImage,
    initialListOfEvents,
    extendedListOfEvents,
  };