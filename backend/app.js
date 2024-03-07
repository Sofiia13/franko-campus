const express = require("express");
const app = express();
app.use(express.json());

const db = require('./models');

const PORT = 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER is listening on port ${PORT}`)
  })
});