require('dotenv').config();
require('./config/mongodb');

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');

const app = express();

app.set('view engine', 'hbs');

app.use(
	sassMiddleware({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		sourceMap: true,
		debug: true,
		indentedSyntax: false,
	})
);

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 60000 * 60 * 24 }, // in millisec
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			ttl: 24 * 60 * 60, // 1 day
		}),
		saveUninitialized: true,
		resave: true,
	})
);

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(cookieParser());

function checkLoginStatus(req, res, next) {
	res.locals.user = req.session.currentUser ? req.session.currentUser : null;
	res.locals.isLoggedIn = Boolean(req.session.currentUser);
	next();
}

app.use(checkLoginStatus);

app.use('/', require('./routes/home'));
app.use('/timeline', require('./routes/timeline'));
app.use('/api/timeline', require('./routes/timeline.api'))
app.use('/event', require('./routes/event'));
app.use('/user', require('./routes/user'));
app.use('/api/user', require('./routes/user.api'));
app.use('/category', require('./routes/category'));

const port = process.env.PORT || 3000;
const listerner = app.listen(port, () => {
	console.log(`App started o/ go on : ${process.env.SITE_URL}:${port}`);
});
