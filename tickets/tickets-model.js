const db = require('../data/dbConfig.js');
module.exports = {
    find,
    findBy
    
};

function find(filter) {
    return db('tickets').where(filter);
}

function findBy() {
    return db('tickets');
}

