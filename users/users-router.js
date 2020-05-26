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


//localhost:4000/users/ticket
// @desc GET User tickets
// @access Private
//localhost:4000/users/
router.get('/ticket', Restricted, (req, res) => {
    const userid = req.user.id;
    if (req.user.role === 'student') {
        Users.findStudent(userid)
            .then(tickets => {
                res.status(200).json(tickets)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Unable to get tickets!!" })
            })
    } else if (req.user.role === 'helper') {
        Users.findAssignedTickets(userid)
            .then(tickets => {
                res.status(200).json(tickets)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Unable to get tickets!!" })
            })
    } else res.status(400).json({ message: "Please specify the user role!!" });
})

//Restricted only to helpers
// make sure to place ticketid in the :id 2
// body will require "id": 7 for techid
//localhost: 4000 / users / ticket / 2 / assign

router.post('/ticket/:id/assign', (req, res) => {
    const techid = req.user.id;
    const { id } = req.params;
    req.user.role === 'helper' ? Users.findAssignedTicketById(id)
        .then(ticket => {
            if (!ticket) {
                Users.assignTicket(techid, id)
                    .then(tickets => {
                        Tickets.update(id, { assigned: true })
                        res.status(200).json(tickets);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: "Failed to assign ticket." })
                    })
            } else res.status(400).json({ message: "Ticket has already been assigned." })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error assigning the ticket." })
        }) :
        res.status(400).json({ message: "Ticket assignment restricted to helpers only." });
});


module.exports = router;