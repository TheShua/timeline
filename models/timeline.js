const mongoose = require("mongoose"); 

const timelineSchema = new mongoose.Schema({
    title:{type:String, required:true}, 
    creation_date: {type:Date, default: Date.now()}, 
    date_edited: {
        type: Date,
        default: Date.now()
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    editors: [{ type: mongoose.Schema.Types.ObjectId,ref: "User"}],
    scope: {type:String, enum:["private", "public"]},
    template: {type: String,enum: ["vertical_gantt", "vertical_flat", "horizontal"]},
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    description: String,
    unit: {
        type: String,
        enum: ["minutes", "days", "months", "years"]
    }, 
    image: {
        type: String,
        default: "https://images.pexels.com/photos/697662/pexels-photo-697662.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
    },
    favorite: Boolean
})

const Timeline = mongoose.model("Timeline", timelineSchema); 
module.exports = Timeline; 