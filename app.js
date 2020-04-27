require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const path = require("path");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "hbs");
app.use(express.static("public"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(cookieParser());

app.use("/", require("./routes/home"));
app.use("/timeline", require("./routes/timeline"));
app.use("/event", require("./routes/event"));
app.use("/user", require("./routes/user"));
app.use("/category", require("./routes/category"));

const port = process.env.PORT || 3000;
const listerner = app.listen(port, () => {
  console.log(`App started o/ go on : ${process.env.SITE_URL}:${port}`);
});
