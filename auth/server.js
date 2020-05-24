const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


//const authRouter = require('../auth/auth-router.js');
//const usersRouter = require('../users/users-router.js');
//const ticketsRouter = require('../tickets/tickets-router.js');
//const authenticate = require('../auth/authenticate-middleware.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//server.use('/auth', authRouter);
// server.use('/users', authenticate, usersRouter);
// server.use('/tickets', authenticate, ticketsRouter);
server.get("/", (req, res) => {
    res.json({ api: "This DevDesk API is up and running" });
});

module.exports = server;