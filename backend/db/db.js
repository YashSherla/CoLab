const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin:admin@cluster0.osm2m7k.mongodb.net/coLab");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


