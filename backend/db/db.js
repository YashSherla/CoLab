const mongoose = require('mongoose');
// const url = "mongodb://localhost:27017/coLab"; // yash laptop
const url = "mongodb+srv://admin:admin@cluster0.osm2m7k.mongodb.net/coLab" // office laptop
const mogoConnect = async () => {
    try {
        let connect = await mongoose.connect(url);
        // console.log(connect);
        return connect
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    mogoConnect
}