const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json({limit : "5mb"}));
app.use(cors());
//app.use(express.urlencoded({limit: 2000000, extended: false}));

const db = require("./models");

const authRouter = require("./routes/auth");
const eventsRouter = require("./routes/events");

app.use("/auth", authRouter);
app.use("/events", eventsRouter);


const PORT = 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER is listening on port ${PORT}`);
  });
});
