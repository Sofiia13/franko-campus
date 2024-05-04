const {
  events,
  eventImages,
  eventParticipants,
  users,
  userBookmarks,
  ratings,
  comments
} = require("../models");

const { noEmptyFields } = require("../services/formValidation");

const sequelize = require('sequelize');
const moment = require("moment-timezone");
const fuzzysort = require("fuzzysort"); // library for searching with typos

const { returnUserId } = require("../services/jwt");

let SUPABASE_URL = "https://tmgzyqbynitvxdqmbyoz.supabase.co";
let SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZ3p5cWJ5bml0dnhkcW1ieW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NDY5NzEsImV4cCI6MjAyNTQyMjk3MX0.H74l6_Rf0u0PBS5VxMM9gae1naZxXpU8Hehm5P7IwI8";

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const fs = require("fs");
const { json } = require("sequelize");
const userBookmarksModel = require("../models/userBookmarksModel");


// реєстрація нової події

const getSupabaseCredentials = async (req, res) => {
  return res.status(200).json({ SUPABASE_URL, SUPABASE_KEY });
};

// # Events

const createEvent = async (req, res) => {
  try {
    const newEventData = req.body;

    const existingEvent = await events.findOne({
      where: { name: newEventData.name },
    });

    if (existingEvent) {
      return res.status(400).json({ error: "Така подія вже існує." });
    }

    //
    //перевірка, чи немає пустих полів
    //
    const isAnyFieldEmpty = Object.values(newEventData).some(
      (value) => !value || !value.trim()
    );

    if (isAnyFieldEmpty) {
      return res.status(400).json({ error: "Необхідно заповнити всі поля." });
    }

    const createdEvent = await events.create({
      name: newEventData.name,
      organizer: newEventData.organizer,
      description: newEventData.description,
      date: newEventData.date,
      time: newEventData.time,
      format: newEventData.format,
      cost: newEventData.cost,
      type: newEventData.type,
    });

    return res.status(200).json({ success: true, id: createdEvent.id });
  } catch (error) {
    console.error("Виникла помилка під час реєстрації події:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

const uploadImage = async (req, res) => {
  const { id } = req.params;

  try {
    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: "Жодного файлу не обрано" });
    }

    const existingEvent = await events.findOne({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({ error: "Такої події не знайдено" });
    }

    const promises = Object.values(files).map(async (file) => {
      const fileName = `${file.originalname.split(".")[0]}-${Date.now()}.${file.originalname.split(".")[1]
        }`;
      fs.renameSync(file.path, `uploads/${fileName}`);

      const rawData = fs.readFileSync(`uploads/${fileName}`);

      const { error } = await supabase.storage
        .from("campus-bucket")
        .upload("public/" + fileName, rawData, {
          contentType: file.mimetype,
        });

      await eventImages.create({
        event_id: id,
        url: `public/${fileName}`,
      });

      if (error) {
        throw new Error(
          `[Promise] Error uploading file ${fileName}: ${error.message}`
        );
      }

      return;
    });

    await Promise.all(promises);

    return res.status(200).json({ success: true });
  } catch (error) {
    await events.destroy({ where: { id: id } });

    return res.status(500).json({
      error:
        "Помилка сервера під час завантаження зображення. Запис про подію видалено.",
    });
  }
};

const getEvent = async (req, res) => {
  try {
    const id = req.params.id;

    const existingEvent = await events.findOne({
      where: { id },
    });

    if (!existingEvent) {
      return res
        .status(404)
        .json({ error: "Такої події не знайдено" });
    }

    const eventImagesList = await eventImages.findAll({
      where: { event_id: id },
    });

    let images = [];

    if (eventImagesList) {
      images = eventImagesList.map((image) => image.url);
    }

    return res.status(200).json({
      ...existingEvent.toJSON(),
      createdAt: moment
        .tz(existingEvent.createdAt, "UTC")
        .tz("Europe/Kiev")
        .format(),
      updatedAt: moment
        .tz(existingEvent.updatedAt, "UTC")
        .tz("Europe/Kiev")
        .format(),
      images,
    });

  } catch (error) {
    console.error("Виникла помилка під час отримання події:", error);
    return res
      .status(500)
      .json({ error: "Внутрішня помилка сервера." });
  }
}



//
//TODO: додати видалення зображень з bucket'а
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const existingEvent = await events.findOne({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({
        error: "Такої події не знайдено. Можливо, вона вже видалена.",
      });
    }

    await events.destroy({
      where: { id },
    });

    await eventImages.destroy({
      where: { event_id: id },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Виникла помилка під час видалення події:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const newEventData = req.body;

    const existingEvent = await events.findOne({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({ error: "Такої події не знайдено." });
    }

    const existingName = await events.findOne({
      where: { name: newEventData.name },
    });

    if (existingName) {
      return res.status(400).json({ error: "Подія з такою назвою вже існує." });
    }

    //
    //перевірка, чи немає пустих полів або полів з пробілами/відступами
    //загалом з фронтенду мають приходити усі поля, проте якщо чомусь прийшли не всі,
    //або є пробіли/відступи, то
    //замінюємо їх на вже існуючі поля
    //
    for (field in newEventData) {
      if (!newEventData[field] || !newEventData[field].trim()) {
        newEventData[field] = existingEvent[field];
      }
    }

    await events.update(
      {
        name: newEventData.name,
        organizer: newEventData.organizer,
        description: newEventData.description,

        date: newEventData.date,
        time: newEventData.time,

        format: newEventData.format,
        cost: newEventData.cost,
        type: newEventData.type,
      },
      {
        where: { id },
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Виникла помилка під час редагування події:", error);
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

const signupToEvent = async (req, res) => {
  const  userId  = returnUserId(req);

  if(userId == null){
    return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
  }

  const eventId = req.params.id;
  console.log(userId, eventId)
  try {
    if (!(await events.findOne({ where: { id: eventId } }))) {
      return res.status(404).json({ error: "Некоректне id події" });
    }

    if (!(await users.findOne({ where: { id: userId } }))) {
      return res.status(404).json({ error: "Некоректний ID користувача" });
    }

    const existingParticipant = await eventParticipants.findOne({
      where: { user_id: userId, event_id: eventId },
    });

    if (existingParticipant) {
      return res
        .status(400)
        .json({ error: "Користувач вже записаний на цю подію" });
    }
    await eventParticipants.create({
      event_id: eventId,
      user_id: userId,
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};

const checkSignupToEvent = async (req, res) => {
  const userId = returnUserId(req);

  if(userId == null){
    return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
  }

  const eventId = req.params.id;
  try {
    if (!(await eventParticipants.findOne({ where: { user_id: userId, event_id: eventId } }))) {
      return res.status(404).json({ error: "Користувач не записаний на цю подію" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};


const cancelEventRegistration = async (req, res) => {
  const userId = returnUserId(req)
  const eventId = req.params.id;
  const existingParticipant = await eventParticipants.findOne({
    where: { user_id: userId, event_id: eventId },
  });

  if (!existingParticipant) {
    return res.status(404).json({
      error:
        "Користувач не записаний на цю подію, або не існує користувача/події.",
    });
  }
  try {
    await eventParticipants.destroy({
      where: { event_id: eventId, user_id: userId },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};

const getEventsForUser = async (req, res) => {
  const { limit } = req.query;
  const userId = returnUserId(req);

  if(userId == null){
    return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
  }

  if(userId == null){
    return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
  }

  try {
    if (!(await users.findOne({ where: { id: userId } }))) {
      return res.status(400).json({ error: "Некоректний ID користувача" });
    }
    if (limit) {
      const events = await eventParticipants.findAll({
        where: { user_id: userId },
        attributes: ["event_id"],
        limit: limit,
      });
      return res.status(200).send(events);
    }

    const events = await eventParticipants.findAll({
      where: { user_id: userId },
      attributes: ["event_id"],
    });
    return res.status(200).send(events);
    //
    //залишу тут цю записку як нагадування, що в майбутньому варто розглянути варіант того,
    //щоб відправлялось не тільки ID подій, але й їхні назви, організатори, описи, дати тощо,
    //проте це залежатиме від фронтенду, як він буде використовувати ці дані
    //
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};

const getUsersForEvent = async (req, res) => {
  const { limit } = req.query;
  const { eventId } = req.body;
  try {
    if (limit) {
      const users = await eventParticipants.findAll({
        where: { event_id: eventId },
        attributes: ["user_id"],
        limit: limit,
      });
      return res.status(200).send(users);
    }

    const users = await eventParticipants.findAll({
      where: { event_id: eventId },
      attributes: ["user_id"],
    });
    return res.status(200).send(users);
    //
    //аналогічна ситуація як і в минулій замітці до функції.
    //
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
};

const filterEvents = async (req, res) => {
  try {
    const eventData = req.body;

    const whereClause = {};

    if (eventData.format) {
      whereClause.format = eventData.format;
    }
    if (eventData.cost) {
      whereClause.cost = eventData.cost;
    }
    if (eventData.type) {
      whereClause.type = eventData.type;
    }

    console.log(whereClause);

    const filteredData = await events.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: whereClause,
    });

    return res.status(200).json({ filteredData });
  } catch (error) {
    console.error("Виникла помилка під час сортування подій:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

const addEventToBookmarks = async (req, res) =>{
    const userId = returnUserId(req);

    if(userId == null){
      return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
    }

    const eventId = req.params.id;
    try {
      if(!await events.findOne({where: {id: eventId}})){
        return res.status(404).json({error: "Події з таким ID немає"});
    }

      if(await userBookmarks.findOne({where:{user_id: userId, event_id: eventId}})){
        return res.status(400).json({error: "Подія вже в закладках"});
      }

    await userBookmarks.create({
        event_id: eventId,
        user_id: userId
    });

    return res.status(201).json({success: true});

    } catch (error) {
      return res.status(500).json({error: "Помилка на сервері"});
    }
};

const deleteEventFromBookmarks = async (req, res) =>{
  const userId = returnUserId(req);

  if(userId == null){
    return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
  }

  const eventId = req.params.id;
  try {
    if(!await events.findOne({where: {id: eventId}})){
      return res.status(404).json({error: "Події з таким ID немає"});
  }

    if(!await userBookmarks.findOne({where: {event_id: eventId, user_id: userId}})){
      return res.status(404).json({error: "Подія не в закладках"});
    }

  await userBookmarks.destroy({where: {
      event_id: eventId,
      user_id: userId
  }});

  return res.status(204).json({success: true});

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Помилка на сервері"});
  }
};


const filterSearchedEvents = async (req, res) => {
  try {
    let searchingQuery = req.params.key;
    const eventData = req.body;
    const whereClause = {};

    const allEvents = await events.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const searchResults = allEvents.filter((event) => {
      return ["name", "organizer", "description"].some((field) => {
        let fieldValue = event[field] || "";
        return fuzzysort.single(searchingQuery, fieldValue) !== null;
      });
    });

    if (eventData.format) {
      whereClause.format = eventData.format;
    }
    if (eventData.cost) {
      whereClause.cost = eventData.cost;
    }
    if (eventData.type) {
      whereClause.type = eventData.type;
    }

    const filteredData = searchResults.filter((event) => {
      return (
        (whereClause.format ? event.format === whereClause.format : true) &&
        (whereClause.cost ? event.cost === whereClause.cost : true) &&
        (whereClause.type ? event.type === whereClause.type : true)
      );
    });

    return res.status(200).json(filteredData);
  } catch (error) {
    console.error("Виникла помилка під час сортування подій:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

const rateEvent = async (req, res) => {
  const userId = returnUserId(req);

  if(userId == null){
    return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
  }
  
  const eventId = req.params.id;
  const { rating } = req.body;

  try {
    if (!(await events.findOne({ where: { id: eventId } }))) {
      return res.status(404).json({ error: "Подію не знайдено" });
    }

    if (
      await ratings.findOne({ where: { user_id: userId, event_id: eventId } })
    ) {
      return res.status(418).json({ error: "Користувач вже оцінив подію" });
    }

    await ratings.create({
      user_id: userId,
      event_id: eventId,
      rating: rating,
    });

    return res.status(201).json("success:true");
  } catch (error) {
    console.log(`${error}`);
    return res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
};

const deleteRating = async (req, res) => {
  const userId = returnUserId(req);

  if(userId == null){
    return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
  }

  const eventId = req.params.id;

  try {
    if (!(await events.findOne({ where: { id: eventId } }))) {
      return res.status(404).json({ error: "Подію не знайдено" });
    }

    if (
      !(await ratings.findOne({
        where: { user_id: userId, event_id: eventId },
      }))
    ) {
      return res.status(418).json({ error: "Користувач не оцінював подію" });
    }

    await ratings.destroy({
      where: {
        user_id: userId,
        event_id: eventId,
      },
    });

    return res.status(201).json("success:true");
  } catch (error) {
    console.log(`${error}`);
    return res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
};

const getEventRating = async (req, res) => {
  const eventId = req.params.id;
  try {
    if (!(await events.findOne({ where: { id: eventId } }))) {
      return res.status(400).json({ error: "Подія з таким ID не існує" });
    }
    if (!(await ratings.findOne({ where: { event_id: eventId } }))) {
      return res.status(200).json({ average_rating: null, user_count: 0 });
    }

    const result = await ratings.findAll({
      attributes: [
        [sequelize.literal("ROUND(AVG(rating), 1)"), "average_rating"],
        [sequelize.fn("COUNT", sequelize.col("user_id")), "user_count"],
      ],
      where: {
        event_id: eventId,
      },
    });
    return res.status(200).json(result[0].dataValues);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Помилка на сервері ${error}` });
  }
};



// # Comments

const addComment = async (req, res) => {
  const userId = returnUserId(req);
  const eventId = req.params.id;
  const text = req.body.text
  console.log(text);

  try {
    if (text.trim() === "") {
      return res.status(400).json({ error: "Необхідно заповнити всі поля." });
    }

    const event = await events.findOne({ where: { id: eventId } });
    if (!event) {
      return res.status(404).json({ error: "No such event" });
    }

    const newComment = await comments.create(
      {
        user_id: userId,
        event_id: eventId,
        text: text
      }
    )

    return res.status(201).json({ success: true });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ Error: error });
  }


}

const deleteComment = async (req, res) => {
  const userId = returnUserId(req);
  const commentId = req.body.id;
  try {
    const comment = await comments.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ error: "No such comment. Try refreshing page" });
    }

    if (comment.user_id !== userId) {
      return res.status(403).json({ error: "You can't delete this comment", message: "I know what you are trying to do" });
    }

    await comments.destroy({ where: { id: commentId } });

    return res.status(200).json({ success: true }); 
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ Error: error });
  }
}

const retrieveComments = async(req, res) => { // !!! Might need to be redone for retrieving in specific order !!!
  const eventId = req.params.id;
  try {
    const commentsList = await comments.findAll({ where: { event_id: eventId }, limit: 7 });
    return res.status(200).json(commentsList);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ Error: error });
   }
}

module.exports = {
  getSupabaseCredentials,
  createEvent,
  deleteEvent,
  getEvent,
  editEvent,
  uploadImage,
  initialListOfEvents,
  extendedListOfEvents,
  signupToEvent,
  checkSignupToEvent,
  cancelEventRegistration,
  getEventsForUser,
  getUsersForEvent,
  filterEvents,
  addEventToBookmarks,
  deleteEventFromBookmarks,
  filterSearchedEvents,
  rateEvent,
  deleteRating,
  getEventRating,
  addComment,
  deleteComment,
  retrieveComments
};
