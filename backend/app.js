const express = require("express");
const app = express();
app.use(express.json());

const db = require("./models");

const authRouter = require("./routes/auth");
const eventsRouter = require("./routes/events");

app.use("/auth", authRouter);
app.use("/events", eventsRouter);

const PORT = 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER is listening on port ${PORT}`);
  });
});
