const { users, verificationCodes, profiles } = require("../models");
const bcrypt = require("bcrypt");
const {
  storeActivationCode,
  generateActivationCode,
  sendActivationEmail,
  validateEmail,
} = require("../services/activationMailService");

const register = async (req, res) => {
  const { reqUsername, reqPassword, reqEmail, reqUniversity } = req.body;

  try {
    const whitespaceSym = /\s/;

    if (
      !reqUsername.trim() || whitespaceSym.test(reqUsername) ||
      !reqPassword.trim() || whitespaceSym.test(reqPassword) ||
      !reqEmail.trim() || whitespaceSym.test(reqEmail) ||
      !reqUniversity.trim()
    ) {
      return res.status(400).json({ error: "Заповни всі поля або прибери пробіли з полів" });
    }



    const existingUser = await users.findOne({
      where: { username: reqUsername.trim() },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Ім'я користувача вже зайняте." });
    }

    // перевірка чи правильно введена пошта
    if (!validateEmail(reqEmail)) {
      return res.status(500).json({ error: "Неправильно введена пошта." });
    }

    const hashedPassword = await bcrypt.hash(reqPassword.trim(), 10);

    await users.create({
      username: reqUsername.trim(),
      password: hashedPassword,
      email: reqEmail,
      university: reqUniversity,
      is_verified: false,
    });

    createdUser = await users.findOne({
      where: { username: reqUsername.trim() },
    });

    if (!createdUser) {
      return res
        .status(500)
        .json({ error: "Внутрішня помилка сервера під час роботи з БД." });
    }

    const activationCode = generateActivationCode();

    await storeActivationCode(createdUser.id, activationCode);

    sendActivationEmail(createdUser.email, activationCode);

    return res.status(200).json({ success: true });
    //після успішного виконання цього запиту користувача потрібно перекинути на сторінку "валідація"
    //
  } catch (error) {
    console.error("Під час реєстрації виникла помилка:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

const validate = async (req, res) => {
  const { reqUsername, reqCode } = req.body;
  const intCode = parseInt(reqCode);

  try {
    const whitespaceSym = /\s/;

    if (
      !reqUsername.trim() || whitespaceSym.test(reqUsername) ||
      !reqCode.trim() || whitespaceSym.test(reqCode)
    ) {
      return res.status(400).json({ error: "Заповни всі поля" });
    }
    const user = await users.findOne({
      where: { username: reqUsername.trim() },
    });

    if (!user) {
      return res.status(400).json({ error: "Користувач не знайдений." });
    }

    if (user.is_verified == true) {
      return res.status(409).json({ info: "Користувач вже верифікований." });
    }

    const storedCode = await verificationCodes.findOne({
      where: { user_id: user.id, code: intCode },
    });

    if (!storedCode) {
      return res.status(400).json({ error: "Код неправильний." });
    }

    await users.update(
      { is_verified: true },
      {
        where: {
          username: reqUsername,
        },
      }
    );

    //видалення вериф. коду з бд
    await verificationCodes.destroy({
      where: {
        code: reqCode,
      },
    });

    return res.status(200).json({ success: true });
    //
    //після успішного виконання цього запиту користувача потрібно перекинути на сторінку "успіх" (або головну)
    //
  } catch (error) {
    console.error("Виникла помилка під час валідації:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

const login = async (req, res) => {
  try {
    const { reqUsername, reqPassword } = req.body;

    const whitespaceSym = /\s/;

    if (
      !reqUsername.trim() || whitespaceSym.test(reqUsername) ||
      !reqPassword.trim() || whitespaceSym.test(reqPassword)
    ) {
      return res.status(400).json({ error: "Заповни всі поля" });
    }

    const user = await users.findOne({
      where: { username: reqUsername.trim() },
    });

    if (!user) {
      return res.status(404).json({ error: "Такого користувача не існує." });
    }

    if (user.is_verified == false) {
      return res.status(401).json({ error: "Користувач не верифікований." });
    }

    const passwordMatch = await bcrypt.compare(
      reqPassword.trim(),
      user.password
    );

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

    return res.status(200).json({ success: true });
    //
    // .json({ token: accessToken, username: user.username, id: user.id });
    //
  } catch (error) {
    console.error("Виникла помилка під час логіну:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

// profiles.sync({ force: true });
const profileInfo = async (req, res) => {
  const { reqUsername, reqFirstName, reqLastName, reqStatus } = req.body;
  try {
    const user = await users.findOne({ where: { username: reqUsername } });

    // const storedCode = await profiles.findOne({
    //     where: { user_id: user.id}
    //   });

    if (!user) {
      return res.status(400).json({ error: "Користувач не знайдений." });
    }

    // поки що тут перевірка чи верифікований користувач
    // пізніше замість цього буде перевірка чи цей користувач залогінився
    if (user.is_verified == false) {
      return res.status(409).json({ info: "Користувач не верифікований." });
    }

    const userProfile = await profiles.findOne({
      where: { user_id: user.id },
    });

    if (userProfile) {
      return res
        .status(400)
        .json({ error: "Профіль цього користувача вже заповнений" });
    }

    const whitespaceSym = /\s/;

    if (
      !reqFirstName.trim() || whitespaceSym.test(reqFirstName) ||
      !reqLastName.trim() || whitespaceSym.test(reqLastName) ||
      !reqStatus.trim() || whitespaceSym.test(reqStatus)
    ) {
      return res.status(400).json({ error: "Заповни всі поля" });
    }

    await profiles.create({
      user_id: user.id,
      first_name: reqFirstName,
      last_name: reqLastName,
      status: reqStatus,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Виникла помилка під час заповнення профілю:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};

module.exports = { register, validate, login, profileInfo };
