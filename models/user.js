const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    name: {type:String, required: true}, 
    email: {type: String,required: true}, 
    password:String, 
    creation_time: {type: Date, default:Date.now()},
    role:{type:String, enum:["admin", "user"], default: "user"}, 
    image: {
        type: String,
        default: "https://images.pexels.com/photos/1736222/pexels-photo-1736222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User; 