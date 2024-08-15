const mongoose = require('mongoose');

let dbClient = null;

function connect() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            dbClient = mongoose.connection; 
        })
        .catch(err => console.error('Failed to connect to MongoDB', err));
}

function getDbClient() {
    return dbClient;
}

module.exports = { connect, getDbClient };
