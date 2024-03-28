const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = require("./models");

const authRouter = require("./routes/auth");
const eventsRouter = require("./routes/events");
const profileRouter = require("./routes/profile");

app.use("/auth", authRouter);
app.use("/events", eventsRouter);
app.use("/profile", profileRouter);

const PORT = 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER is listening on port ${PORT}`);
  });
});
