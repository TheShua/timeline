const express = require(`express`);
const router = express.Router();
const Timeline = require("../models/timeline")

// Index

router.get(`/`, (req, res, next) => {
  res.render(`timeline/index`);
  console.log(`/timeline/index`);
});

// New

router.get(`/new`, (req, res, next) => {
res.render(`timeline/new`)
  console.log(`/timeline/new`);
});

// Create

router.post(`/`, (req, res, next) => {
  Timeline.create(req.body)
    .then((dbResult) => {
      res.redirect(`/timeline/${dbResult._id}/edit`)
  console.log(`Post: /timeline`);
})
});

// Show

router.get(`/:id`, (req, res, next) => {
  res.render(`timeline/show`, { id: req.params.id });
  console.log(`/timeline/${req.params.id}`);
});

// Edit

router.get(`/:id/edit`, (req, res, next) => {
  res.render(`timeline/edit`, { id: req.params.id });
  console.log(`/timeline/${req.params.id}/edit`);
});

// Update

router.post(`/:id`, (req, res, next) => {
  console.log(`Post: /timeline/${req.params.id}`);
});

// Destroy

router.delete(`/:id`, (req, res, next) => {
  console.log(`Delete: /timeline/${req.params.id}`);
});

module.exports = router;
