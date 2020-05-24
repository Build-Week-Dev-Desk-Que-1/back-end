const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ----> npm i jsonwebtoken

const Users = require("../users/users-model.js");
const secrets = require("../api/secrets.js");




function generateToken(user) {
    // the data
    const payload = {
        userId: user.id,
        username: user.username,
        role: user.role
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;