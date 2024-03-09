const express = require("express");
const app = express();
app.use(express.json());


const db = require("../models");

const authRouter = require("./routes/auth"); // Import the router

app.use("/", authRouter); // Use the router


const PORT = 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER is listening on port ${PORT}`);
  });
});


