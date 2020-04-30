const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    name: {type:String, required: true}, 
    email: {type: String,required: true}, 
    password:String, 
    creation_time: {type: Date, default:Date.now()},
    role:{type:String, enum:["admin", "user"], default: "user"}, 
    image: {
        type: String,
        default:"",
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User; 