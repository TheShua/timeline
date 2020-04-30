const Timeline = require("../models/timeline.js");

module.exports = async function isAuthorizedToEdit(req, res, next) {
  try {
    const timeline = await Timeline.findById(req.params.id);
    console.log(req.session.currentUser._id);
    console.log(timeline.author._id);
    if (req.session.currentUser._id == timeline.author._id) {
      next();
    } else {
      res.redirect("/timeline");
    }
  } catch (err) {
    console.log(err);
  }
};
