const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { users } = require("../../models");

const bcrypt = require("bcrypt");

// create application/json parser
const jsonParser = bodyParser.json();

const {
  activationMiddleware,
  isCodeValid,
  generateActivationCode,
  sendActivationEmail,
} = require("../middleware/MailMiddleware");

router.post("/register", jsonParser, activationMiddleware, async (req, res) => {
  const { reqUsername, reqPassword, reqEmail, reqUniversity } = req.body;

  // console.log("body:", req.body);
  // console.log("reqUsername:", reqUsername);
  // console.log("reqPassword:", reqPassword);
  // console.log("reqEmail:", reqEmail);
  // console.log("reqUniversity:", reqUniversity);

  try {
    const existingUser = await users.findOne({
      where: { username: reqUsername },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Ім'я користувача вже зайняте." });
    }

    const hashedPassword = await bcrypt.hash(reqPassword, 10);

    await users.create({
      username: reqUsername,
      password: hashedPassword,
      email: reqEmail,
      university: reqUniversity,
      is_verified: false,
    });

    sendActivationEmail(reqEmail, generateActivationCode());

    return res.status(200).json({ success: true });
    //
    //після успішного виконання цього запиту користувача потрібно перекинути на сторінку "валідація"
    //
  } catch (error) {
    console.error("Під час реєстрації виникла помилка:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
});

router.post("/validate", jsonParser, async (req, res) => {
  const { reqUsername, reqCode } = req.body;
  // console.log("username:", reqUsername);
  // console.log("code:", reqCode);

  const intCode = parseInt(reqCode);

  //debug features
  //
  //console.log(isCodeValid(intCode));
  //console.log(intCode);

  try {
    if (isCodeValid(intCode)) {
      await users.update(
        { is_verified: true },
        {
          where: {
            username: reqUsername,
          },
        }
      );

      res.status(200).json({ success: true });
      //
      //після успішного виконання цього запиту користувача потрібно перекинути на сторінку "успіх" (або головну)
      //
    } else {
      res.status(400).json({ error: "Код неправильний." });
    }
  } catch (error) {
    console.error("Виникла помилка під час валідації:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
});

router.post("/login", jsonParser, async (req, res) => {
  try {
    const { reqUsername, reqPassword } = req.body;
    // console.log("body:", req.body);
    // console.log("reqUsername:", reqUsername);
    // console.log("reqPassword:", reqPassword);

    const user = await users.findOne({ where: { username: reqUsername } });

    if (!user) {
      return res.status(404).json({ error: "Такого користувача не існує." });
    }

    const passwordMatch = await bcrypt.compare(reqPassword, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: "Неправильне ім'я користувача або пароль." });
    }

    //  jwt token
    //
    //   const accessToken = sign(
    //     { username: user.username, id: user.id },
    //     "importantsecret"
    //   );
    //

    return res.status(200);
    //
    // .json({ token: accessToken, username: user.username, id: user.id });
    //
  } catch (error) {
    console.error("Виникла помилка під час логіну:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
});

module.exports = router;
