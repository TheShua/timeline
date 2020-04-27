const mongoose = require("mongoose"); 


const categorySchema = new mongoose.Schema({
    title:String, 
    color:String,
    icon:String,
    image:String,
});

const Category = mongoose.model("Category", categorySchema); 
module.exports= Category;