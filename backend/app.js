const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const { verifyToken } = require("./services/jwt");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));

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

app.get("/", verifyToken, (req, res) => {
  res.redirect("/feed");
});

app.get("/test123", (req, res) => {
  console.log("Cookies: ");
  res.cookie("testCookie", "testValue", { httpOnly: true }).send("Cookie set");
});