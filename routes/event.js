const express = require(`express`);
const router = express.Router();
const Event = require("../models/event");

// Create

router.post(`/`, (req, res, next) => {
  Event.create(req.body).then((dbRes) => {
    res.status(201).json(dbRes);
  });
});

// Show

router.get(`/:id`, (req, res, next) => {
  res.render(`event/show`, { id: req.params.id });
  console.log(`/event/${req.params.id}`);
});

// Update

router.post(`/:id`, (req, res, next) => {
  console.log(`Post: /event/${req.params.id}`);
});

// Destroy

router.delete(`/:id`, (req, res, next) => {
  console.log(`Delete: /event/${req.params.id}`);
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
