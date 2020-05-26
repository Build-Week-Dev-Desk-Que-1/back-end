const db = require("../data/dbConfig.js");
module.exports = {
    add,
    findBy,
    findUser,
    findStudent,
    findAssignedTickets


};

function add(user) {
    return db('users').insert(user, "id").then(ids => { const [id] = ids; return findById(id); }).catch(error => {
        return res.status(500).json({ message: 'failed to add new user' });
    });
}

function findBy(filter) {
    return db("users").where(filter);
}

function findUser() {
    return db('users').select('id', 'username', 'email', 'role');
}

function findById(id) {
    return db('users')
        .select('id', 'username', 'role').where({ id }).first();
}

function findStudent(id) {
    return db('stud_tickets as st')
        .where('studentid', id)
        .join('tickets as t', 'st.ticketid', 't.id')
        .select('st.ticketid', 't.title', 't.description', 't.tried', 't.category', 'solution');
}
function findAssignedTickets(id) {
    return db('asg_tickets as at')
        .where('techid', id)
        .join('tickets as t', 'at.ticketid', 't.id')
        .select(
            'at.ticketid',
            't.title',
            't.description',
            't.tried',
            't.category',
            'solution'
        );
}