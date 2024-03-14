const { users, verificationCodes } = require("../models");
const { generateAccessToken } = require("../services/jwt");

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
        const existingUser = await users.findOne({
            where: { username: reqUsername },
        });

        if (existingUser) {
            return res.status(400).json({ error: "Ім'я користувача вже зайняте." });
        }

        // перевірка чи правильно введена пошта
        if (!validateEmail(reqEmail)) {
            return res.status(500).json({ error: "Неправильно введена пошта." });
        }

        const hashedPassword = await bcrypt.hash(reqPassword, 10);

        await users.create({
            username: reqUsername,
            password: hashedPassword,
            email: reqEmail,
            university: reqUniversity,
            is_verified: false,
        });

        createdUser = await users.findOne({ where: { username: reqUsername } });

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
        const user = await users.findOne({ where: { username: reqUsername } });

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

        const user = await users.findOne({ where: { username: reqUsername } });

        if (!user) {
            return res.status(404).json({ error: "Такого користувача не існує." });
        }

        if (user.is_verified == false) {
            return res.status(401).json({ error: "Користувач не верифікований." });
        }

        const passwordMatch = await bcrypt.compare(reqPassword, user.password);

        if (!passwordMatch) {
            return res
                .status(400)
                .json({ error: "Неправильне ім'я користувача або пароль." });
        }

        const accessToken = generateAccessToken(user);
        res.cookie("access-token", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            expires: "7d"
        });

        return res.status(200).json({ success: true });
       
    } catch (error) {
        console.error("Виникла помилка під час логіну:", error);
        return res.status(500).json({ error: "Внутрішня помилка сервера." });
    }
};

module.exports = { register, validate, login };