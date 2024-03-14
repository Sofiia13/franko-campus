const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const { verifyToken } = require("./services/jwt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db = require("./models");

const authRouter = require("./routes/auth");

app.use("/auth", authRouter);

const PORT = 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER is listening on port ${PORT}`);
  });
});

app.get("/", verifyToken, (req, res) => {
  res.redirect("/feed");
});

