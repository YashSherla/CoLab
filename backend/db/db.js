const mongoose = require('mongoose');
const url = "mongodb+srv://admin:admin@cluster0.osm2m7k.mongodb.net/coLab";
const mogoConnect = async () =>{
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