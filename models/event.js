const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  timeline: { type: mongoose.Schema.Types.ObjectId, ref: "Timeline" },
  creation_date: { type: Date, default: Date.now() },
  date_edited: { type: Date, default: Date.now() },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  image: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  content: String,
  time_start: Date,
  time_end: Date,
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
