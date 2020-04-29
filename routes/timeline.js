const express = require(`express`);
const router = express.Router();
const Timeline = require("../models/timeline");
const Event = require("../models/event");

// Index

router.get(`/`, async (req, res, next) => {
  const yourTimelines = await Timeline.find({
    author: req.session.currentUser._id,
  });
  console.log(yourTimelines);
  let othersTimelines;
  if (req.session.currentUser.role === "user") {
    othersTimelines = await Timeline.find({
      author: { $ne: req.session.currentUser._id },
    });
  }
  
    res.render(`timeline/index`, {
      yourTimelines: yourTimelines,
      othersTimelines: othersTimelines,
      stylesheets: ["dashboard.css"]
    });
  });


// New

router.get(`/new`, (req, res, next) => {
  res.render(`timeline/new`, {
    stylesheets: ["form.css", "editing.css"]
  });
});

// Create

router.post(`/`, (req, res, next) => {
  timeline = JSON.parse(JSON.stringify(req.body));
  timeline.author = req.session.currentUser;
  Timeline.create(timeline).then((dbResult) => {
    res.redirect(`/timeline/${dbResult._id}/edit`);
  });
});

// Show

router.get(`/:id`, async (req, res, next) => {
  try {
    let events = await Event.find({ timeline: req.params.id });
    const timeline = await Timeline.findById(req.params.id);
    events = JSON.parse(JSON.stringify(events));
    setDates(events);
    const minDate = getMinDate(events);
    const maxDate = getMaxDate(events);
    const unit = setUnit(events, minDate, maxDate);
    setRows(events, unit, minDate);
    res.render(`timeline/show`, {
      events: events,
      timeline: timeline,
      scripts: ["timelineView.js"],
      stylesheets: ["style-01.css"],
      minDate: minDate,
      maxDate: maxDate,
      unit: unit,
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
  console.log("delete");
  Timeline.findByIdAndDelete(req.params.id).then((dbRes) => {
    res.redirect(`/timeline`);
  });
});

// Module Export

module.exports = router;

// Functions

function setDates(events) {
  events.forEach((event, index) => {
    event.time_start.date = new Date(
      event.time_start.year,
      event.time_start.month - 1,
      event.time_start.day,
      event.time_start.hour,
      event.time_start.minute,
      null,
      null
    );
    if (event.time_end.year) {
      event.time_end.date = new Date(
        event.time_end.year,
        event.time_end.month - 1,
        event.time_end.day,
        event.time_end.hour,
        event.time_end.minute,
        null,
        null
      );
    }
  });
}

function getMinDate(events) {
  let minDate = events[0].time_start.date;
  events.forEach(function (event) {
    if (event.time_start.date < minDate) {
      minDate = event.time_start.date;
    }
  });
  return minDate;
}

function getMaxDate(events) {
  let maxDate = events[0].time_start.date;
  events.forEach(function (event) {
    if (event.time_start.date > maxDate) {
      maxDate = event.time_start.date;
    }
    if (event.time_end.date > maxDate) {
      maxDate = event.time_end.date;
    }
  });
  return maxDate;
}

function setRows(events, unit, minDate) {
  events.forEach((event) => {
    let startRow = event.time_start.date - minDate;
    startRow = convertMilliseconds(startRow, unit);
    event.startRow = Math.floor(startRow) + 1;
    if (event.time_end.date) {
      let endRow = event.time_end.date - event.time_start.date;
      endRow = convertMilliseconds(endRow, unit);
      event.endRow = Math.floor(startRow) + Math.floor(endRow);
    }
  });
}

function convertMilliseconds(milliseconds, unit) {
  switch (unit) {
    case "minutes":
      milliseconds /= 60 * 1000;
      break;
    case "hours":
      milliseconds /= 60 * 60 * 1000;
      break;
    case "days":
      milliseconds /= 24 * 60 * 60 * 1000;
      break;
    case "months":
      milliseconds /= 30 * 24 * 60 * 60 * 1000;
      break;
    case "years":
      milliseconds /= 12 * 30 * 24 * 60 * 60 * 1000;
      break;
    case "centuries":
      milliseconds /= 100 * 365.25 * 24 * 60 * 60 * 1000;
      break;
  }
  return milliseconds;
}

function setUnit(events, minDate, maxDate) {
  unit = "years";
  const spread = maxDate.getTime() - minDate.getTime();
  if (spread > 1000 * 60 * 1000) {
    unit = "hours";
  }
  if (spread > 1000 * 60 * 60 * 1000) {
    unit = "days";
  }
  if (spread > 1000 * 24 * 60 * 60 * 1000) {
    unit = "months";
  }
  if (spread > 1000 * 30 * 24 * 60 * 60 * 1000) {
    unit = "years";
  }
  if (spread.getFullYear - 1970 > 1000) {
    unit = "centuries";
  }
  // events.forEach(function (event) {
  //   if (unit === "years" && (event.time_start.month || event.time_end.month)) {
  //     unit = "months";
  //   }
  //   if (unit === "months" && (event.time_start.day || event.time_end.day)) {
  //     unit = "days";
  //   }
  //   if (unit === "days" && (event.time_start.hour || event.time_end.hour)) {
  //     unit = "hours";
  //   }
  //   if (
  //     unit === "hours" &&
  //     (event.time_start.minutes || event.time_end.minutes)
  //   ) {
  //     unit = "minutes";
  //   }
  // });
  return unit;
}
