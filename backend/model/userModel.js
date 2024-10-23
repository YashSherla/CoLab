const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    active: {
        type: Boolean,
        default: false,  // True means active, false means inactive
    },
},{timestamps:true})
const User = new mongoose.model('User',userSchema);
module.exports = {
    User,
}