const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("All of our timelines");
});

module.exports = router;
