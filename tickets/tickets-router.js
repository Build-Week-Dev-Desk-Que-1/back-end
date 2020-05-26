const express = require('express');
const Tickets = require('./tickets-model.js');
const router = express.Router();

// @route GET /tickets/
// @desc get all tickets 
// @access Private
// helper can see them all *****
//localhost: 4000 / tickets / open
// student can see their own ***
router.get('/', (req, res) => {
    Tickets.findBy()
        .then(tickets => {
            res.json(tickets)
        })
        .catch(err => {
            res.json(err)
        })
});

// @route GET /tickets/open
// @desc get OPEN tickets not assigned
// @access Private
router.get('/open', (req, res) => {
    Tickets.find({ assigned: false })
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});
module.exports = router;