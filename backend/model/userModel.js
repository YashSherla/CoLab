const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['Admin', 'Manager', 'Contributor'], 
        default:'Contributor'
    },
    avatar:{
        type:String,
        default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=1380&t=st=1728277785~exp=1728278385~hmac=cd69347b4cb84e600bcaf71dfb34e00eb404aaf15728c9f21e22041b46a7560a"
    }
},{timestamps:true})
const User = new mongoose.model('User',userSchema);
module.exports = {
    User,
}