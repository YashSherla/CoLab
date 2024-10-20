const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/coLab";
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