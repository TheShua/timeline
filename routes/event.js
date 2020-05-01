const express = require(`express`);
const router = express.Router();
const Event = require("../models/event");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../config/cloudinary.js");

// Create

router.post(`/`, (req, res, next) => {
  timeline = JSON.parse(JSON.stringify(req.body));
  timeline.author = req.session.currentUser;
  Event.create(timeline).then((dbRes) => {
    res.status(201).json(dbRes);
  });
});

// Show

router.get(`/:id`, (req, res, next) => {
  res.render(`event/show`, { id: req.params.id });
  console.log(`/event/${req.params.id}`);
});

// Update

router.post(`/:id/image`, uploadCloud.single("image"), (req, res, next) => {
  timeline = {};
  if (req.file) {
    console.log(req.file.url);
    console.log(req.params.id);
    // timeline.image = req.file.url;
    Event.findByIdAndUpdate(
      req.params.id,
      { image: req.file.url },
      {
        new: true,
      }
    )
      .then((dbRes) => {
        res.status(201).json(dbRes);
        console.log(dbRes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(201);
  }
});

router.post(`/:id`, (req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((dbRes) => {
      res.status(201).json(dbRes);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Destroy

router.delete(`/:id`, (req, res, next) => {
  Event.findByIdAndDelete(req.params.id)
    .then((dbRes) => {
      res.status(201).json(dbRes);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(`Delete: /event/${req.params.id}`);
});

/*

Unnecessary routes:

// Index

router.get(`/`, (req, res, next) => {
  res.render(`event/index`);
  console.log(`/event/index`);
});

// New

router.get(`/new`, (req, res, next) => {
  res.render(`event/new`);
  console.log(`/event/new`);
});

// Edit

router.get(`/:id/edit`, (req, res, next) => {
  res.render(`event/edit`, { id: req.params.id });
  console.log(`/event/${req.params.id}/edit`);
});


*/

module.exports = router;
