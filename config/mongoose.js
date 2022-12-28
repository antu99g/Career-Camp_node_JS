const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:test@cluster0.rkdmm44.mongodb.net/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connecting to db'));

db.once('open', () => {console.log('Successfully connceted to mongodb')});

module.exports = db;