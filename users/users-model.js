const db = require("../data/dbConfig.js");
module.exports = {
    add,
    findBy,
    findUser

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