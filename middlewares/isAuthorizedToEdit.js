const Timeline = require("../models/timeline.js");

module.exports = async function isAuthorizedToEdit(req, res, next) {
  try {
    if (req.session.currentUser) {
      const timeline = await Timeline.findById(req.params.id);
      if (req.session.currentUser._id == timeline.author._id) {
        next();
      } else {
        res.redirect("/timeline");
      }
    } else {
      res.redirect("/user/login");
    }
  } catch (err) {
    console.log(err);
  }
};
