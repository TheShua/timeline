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
    image: { type: String, default: "../public/medias/img/compass.jpeg"}, 
    favorite: Boolean
})

const Timeline = mongoose.model("Timeline", timelineSchema); 
module.exports = Timeline; 