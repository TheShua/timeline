const express = require(`express`);
const router = express.Router();

// Index

router.get(`/`, (req, res, next) => {
  res.render(`user/index`);
  console.log(`/user/index`);
});

// New

router.get(`/new`, (req, res, next) => {
  res.render(`user/new`);
  console.log(`/user/new`);
});

// Create

router.post(`/`, (req, res, next) => {
  console.log(`Post: /user`);
});

// Show

router.get(`/:id`, (req, res, next) => {
  res.render(`user/show`, { id: req.params.id });
  console.log(`/user/${req.params.id}`);
});

// Edit

router.get(`/:id/edit`, (req, res, next) => {
  res.render(`user/edit`, { id: req.params.id });
  console.log(`/user/${req.params.id}/edit`);
});

// Update

router.post(`/:id`, (req, res, next) => {
  console.log(`Post: /user/${req.params.id}`);
});

// Destroy

router.delete(`/:id`, (req, res, next) => {
  console.log(`Delete: /user/${req.params.id}`);
});

module.exports = router;
