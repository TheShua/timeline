var hbs = require("hbs");

hbs.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});
