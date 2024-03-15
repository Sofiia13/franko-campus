const { events } = require("../models");
const moment = require("moment-timezone");

// events.sync({ force: true });

// реєстрація нової події
const event_registration = async (req, res) => {
  try {
    const { reqName, reqOrganizer, reqDescription } = req.body;

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

let limit = 2;
const list_of_events = async (req, res) => {
  try {
    // let offset = 0;

    const existingEvents = await events.findAll({
      limit: limit,
      // offset: offset,
      order: [["updatedAt", "DESC"]],
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

    // буде кнопка "Показати ще" і якщо її натиснути,то буде збільшуватись ліміт івентів, які показуються
    // поки що воно буде збільшуватись, коли надіслати запит декілька разів
    limit += 2;

    // Send the JSON response
    return res.json(listJSON);
  } catch (error) {
    console.error("Виникла помилка під час відображення списку подій:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

module.exports = { event_registration, list_of_events };
