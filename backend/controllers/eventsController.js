const { events } = require("../models");
const moment = require("moment-timezone");
const fuzzysort = require("fuzzysort"); // library for searching with typos

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

    await events.create({
      name: reqName,
      organizer: reqOrganizer,
      description: reqDescription,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Виникла помилка під час реєстрації події:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

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

const searchEvent = async (req, res) => {
  try {
    let searchingQuery = req.params.key;

    const allEvents = await events.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const searchResults = allEvents.filter((event) => {
      return ["name", "organizer", "description"].some((field) => {
        let fieldValue = event[field] || "";
        return fuzzysort.single(searchingQuery, fieldValue) !== null;
      });
    });

    console.log(searchResults);
    return res.json(searchResults);
  } catch (error) {
    console.error("Виникла помилка під час пошуку подій:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

module.exports = {
  eventRegistration,
  initialListOfEvents,
  extendedListOfEvents,
  searchEvent,
};
