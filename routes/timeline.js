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

router.get(`/:id`, (req, res, next) => {
  res.render(`timeline/show`, { id: req.params.id });
});

// Edit

router.get(`/:id/edit`, async (req, res, next) => {
  Event.find({ timeline: req.params.id }).then((res) => {
    console.log(res);
  });
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
