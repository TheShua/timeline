const express = require(`express`);
const router = express.Router();
const Timeline = require("../models/timeline");
const Event = require("../models/event");

// Index

router.get(`/`, (req, res, next) => {
  Timeline.find({}).then((dbRes) => {
    res.render(`timeline/index`, { timelines: dbRes });
  });
});

// New

router.get(`/new`, (req, res, next) => {
  res.render(`timeline/new`);
});

// Create

router.post(`/`, (req, res, next) => {
  Timeline.create(req.body).then((dbResult) => {
    res.redirect(`/timeline/${dbResult._id}/edit`);
  });
});

// Show

router.get(`/:id`, async (req, res, next) => {
  try {
    const events = await Event.find({ timeline: req.params.id });
    const timeline = await Timeline.findById(req.params.id);
    const unit = getSmallestUnit(events);
    console.log(unit);
    res.render(`timeline/show`, {
      events: events,
      timeline: timeline,
      scripts: ["timelineView.js"],
      stylesheets: ["style-01.css"],
    });
  } catch (err) {
    console.log(err);
  }
});

// Edit

router.get(`/:id/edit`, async (req, res, next) => {
  try {
    const events = await Event.find({ timeline: req.params.id });
    const timeline = await Timeline.findById(req.params.id);
    console.log(events);
    res.render(`timeline/edit`, {
      events: events,
      timeline: timeline,
      scripts: ["timelineEdit.js"],
      stylesheets: ["timeline-edit.css"],
    });
  } catch (err) {
    console.log(err);
  }
});

// Update

router.post(`/:id`, (req, res, next) => {
  Timeline.findByIdAndUpdate(req.params.id, req.body).then((dbRes) => {
    res.redirect(`/timeline/${req.params.id}/edit`);
  });
});

// Destroy

router.post(`/:id/delete`, (req, res, next) => {
  Timeline.findByIdAndDelete(req.params.id).then((dbRes) => {
    res.redirect(`/timeline`);
  });
});

module.exports = router;

// Functions

function getSmallestUnit(events) {
  let unit = "years";
  events.forEach(function (event) {
    console.log(event);
    if (unit === "years" && (event.time_start.month || event.time_end.month)) {
      unit = "months";
    }
    if (unit === "months" && (event.time_start.day || event.time_end.day)) {
      unit = "days";
    }
    if (unit === "days" && (event.time_start.hour || event.time_end.hour)) {
      unit = "hours";
    }
    if (
      unit === "hours" &&
      (event.time_start.minutes || event.time_end.minutes)
    ) {
      unit = "minutes";
    }
  });
  return unit;
}
