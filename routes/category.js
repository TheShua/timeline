const express = require("express");
const router = express.Router();

/*

Note from Sam:

I created all of the category routes even though I know we probably won't use them. They're here if we need them, haha.

*/

// Index

router.get(`/`, (req, res, next) => {
  res.render(`category/index`);
  console.log(`/category/index`);
});

// New

router.get(`/new`, (req, res, next) => {
  res.render(`category/new`);
  console.log(`/category/new`);
});

// Create

router.post(`/`, (req, res, next) => {
  console.log(`Post: /category`);
});

// Show

router.get(`/:id`, (req, res, next) => {
  res.render(`category/show`, { id: req.params.id });
  console.log(`/category/${req.params.id}`);
});

// Edit

router.get(`/:id/edit`, (req, res, next) => {
  res.render(`category/edit`, { id: req.params.id });
  console.log(`/category/${req.params.id}/edit`);
});

// Update

router.post(`/:id`, (req, res, next) => {
  console.log(`Post: /category/${req.params.id}`);
});

// Destroy

router.delete(`/:id`, (req, res, next) => {
  console.log(`Delete: /category/${req.params.id}`);
});

module.exports = router;

module.exports = router;
