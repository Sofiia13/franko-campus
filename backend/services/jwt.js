require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const generateToken = (user) => {
    user = user.toJSON();
    return jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "7d",
    });
}

const verifyToken = (req, res, next) => {
    const token = req.cookies["access-token"];
    if (!token) {
        return res.redirect("/auth/login")
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.redirect("/auth/login");
        }

        next();
    });
};



module.exports = { generateToken, verifyToken };