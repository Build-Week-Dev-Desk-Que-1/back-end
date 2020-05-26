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


module.exports = router;