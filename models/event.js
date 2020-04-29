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
  color: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  content: String,
  time_start: {
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number,
  },
  time_end: {
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
