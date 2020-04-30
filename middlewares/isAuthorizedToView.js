const Timeline = require("../models/timeline.js");

module.exports = function isAuthorizedToView(req, res, next) {
  Timeline.findById(req.params.id)
    .then((dbRes) => {
      if (dbRes.scope == "public") {
        next();
      } else if (dbRes.scope == "private") {
        if (req.session.currentUser) {
          if (req.session.currentUser._id == dbRes.author._id) {
            next();
          } else {
            res.redirect("/timeline");
          }
        } else {
          res.redirect("/user/login");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
