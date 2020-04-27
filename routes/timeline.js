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
  Timeline.findById(req.params.id) 
  .then((dbRes)=>{
res.render(`timeline/edit`, {
  timeline : dbRes 
});
  })
  .catch((err)=>console.log(err))

  // console.log(`/timeline/${req.params.id}/edit`);
});

// Update

router.post(`/:id`, (req, res, next) => {
  Timeline.findByIdAndUpdate(req.params.id, req.body)
  .then((dbRes)=>{
    res.redirect(`/timeline/${req.params.id}/edit`)
  })
  // console.log(`Post: /timeline/${req.params.id}`);
});

// Destroy

router.post(`/:id/delete`, (req, res, next) => {
  Timeline.findByIdAndDelete(req.params.id)
  .then((dbRes)=>{
    res.redirect(`/timeline`)
  })
  // console.log(`Delete: /timeline/${req.params.id}`);
});

module.exports = router;
