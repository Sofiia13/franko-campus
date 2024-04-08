const { events, eventImages } = require("../models");
const moment = require("moment-timezone");

let SUPABASE_URL = "https://tmgzyqbynitvxdqmbyoz.supabase.co"
let SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZ3p5cWJ5bml0dnhkcW1ieW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NDY5NzEsImV4cCI6MjAyNTQyMjk3MX0.H74l6_Rf0u0PBS5VxMM9gae1naZxXpU8Hehm5P7IwI8"

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const fs = require("fs");


// events.sync({ force: true });

// реєстрація нової події

const createEvent = async (req, res) => {
  try {
    const { reqName, reqOrganizer, reqDescription } = req.body;

    const existingEvent = await events.findOne({
      where: { name: reqName },
    });

    if (existingEvent) {
      return res
        .status(400)
        .json({ error: "Така подія вже існує." });
    }

    if (!reqName.trim() || !reqOrganizer.trim() || !reqDescription.trim()) {
      return res
        .status(400)
        .json({ error: "Необхідно заповнити усі поля." });
    }

    const createdEvent = await events.create({
      name: reqName,
      organizer: reqOrganizer,
      description: reqDescription,
    });

    return res
      .status(200)
      .json({ success: true, id: createdEvent.id });

  } catch (error) {

    console.error("Виникла помилка під час реєстрації події:", error);
    return res
      .status(500)
      .json({ error: "Внутрішня помилка сервера." });
  }
};



const uploadImage = async (req, res) => {

  const { id } = req.params;

  try {
    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res
        .status(400)
        .json({ error: "Жодного файлу не обрано" });
    }

    const existingEvent = await events.findOne({
      where: { id },
    });

    if (!existingEvent) {
      return res
        .status(404)
        .json({ error: "Такої події не знайдено" });
    }

    const promises = Object.values(files).map(async (file) => {

      const fileName = `${file.originalname.split(".")[0]}-${Date.now()}.${file.originalname.split(".")[1]}`;
      fs.renameSync(file.path, `uploads/${fileName}`);

      const rawData = fs.readFileSync(`uploads/${fileName}`);

      const { error } = await supabase.storage.from('campus-bucket').upload('public/' + fileName, rawData, {
        contentType: file.mimetype
      });

      await eventImages.create({
        event_id: id,
        url: `public/${fileName}`,
      });

      if (error) {
        throw new Error(`[Promise] Error uploading file ${fileName}: ${error.message}`);
      }

      return;
    });

    await Promise.all(promises);

    return res
      .status(200)
      .json({ success: true });


  } catch (error) {

    await events.destroy({ where: { id: id } });

    return res
      .status(500)
      .json({ error: "Помилка сервера під час завантаження зображення. Запис про подію видалено." });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const existingEvent = await events.findOne({
      where: { id },
    });

    if (!existingEvent) {
      return res
        .status(404)
        .json({ error: "Такої події не знайдено. Можливо, вона вже видалена." });
    }

    await events.destroy({
      where: { id },
    });

    await eventImages.destroy({
      where: { event_id: id },
    });

    return res
      .status(200)
      .json({ success: true });
  } catch (error) {
    console.error("Виникла помилка під час видалення події:", error);
    return res
      .status(500)
      .json({ error: "Внутрішня помилка сервера." });
  }
}



const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { reqName, reqOrganizer, reqDescription } = req.body;

    const existingEvent = await events.findOne({
      where: { id },
    });

    if (!existingEvent) {
      return res
        .status(404)
        .json({ error: "Такої події не знайдено." });
    }

    if (!reqName.trim() || !reqOrganizer.trim() || !reqDescription.trim()) {
      return res
        .status(400)
        .json({ error: "Необхідно заповнити усі поля." });
    }

    await events.update(
      {
        name: reqName,
        organizer: reqOrganizer,
        description: reqDescription,
      },
      {
        where: { id },
      }
    );

    return res
      .status(200)
      .json({ success: true });
  } catch (error) {
    console.error("Виникла помилка під час редагування події:", error);
    return res
      .status(500)
      .json({ error: "Внутрішня помилка сервера." });
  }
}



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
  createEvent,
  deleteEvent,
  editEvent,
  uploadImage,
  initialListOfEvents,
  extendedListOfEvents,
};
