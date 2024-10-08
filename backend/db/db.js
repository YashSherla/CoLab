const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/coLab");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


