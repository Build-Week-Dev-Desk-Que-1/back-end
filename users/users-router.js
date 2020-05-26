const router = require("express").Router();
const Users = require("./users-model.js");
const Tickets = require("../tickets/tickets-model.js");

const Restricted = require('../auth/authenticate-middleware.js');

// @route GET /users/
// @desc Get all users information
// @ access Private
//localhost:4000/users
router.get('/', (req, res) => {
    Users.findUser()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.json(err)
        })
});
// @route GET /users/getid/:id/4
// @desc Get user informatin by id
// @ access Private
//localhost:4000/users/getid/1
router.get('/getid/:id', Restricted, (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Could not get user", err })
        })
})


module.exports = router;