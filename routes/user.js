const express = require(`express`);
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// Index

router.get(`/`, (req, res, next) => {
	res.render(`user/index`);
	console.log(`/user/index`);
});

// New

router.get(`/signup`, (req, res, next) => {
	res.render(`user/new`);
	console.log(`/user/new`);
});

// Create

router.post(`/signup`, (req, res, next) => {
	console.log(`Post: /user`);
	const { name, email, password } = req.body;
	const passwordConfirm = req.body.password_confirm;

	// Checking if all the fields are filled
	if (name === '' || email === '' || password === '' || passwordConfirm === '') {
		res.render(`user/new`, {
			errorMessage: `You must fill all the fields of the form, pretty please...`,
		});
		return;
	}

	// Verification if the password are matching
	if (password !== passwordConfirm) {
		res.render(`user/new`, {
			errorMessage: `Your password are not matching together man !`,
		});
		return;
	}
	console.log("for now it's ok");
	User.findOne({ email })
		.then((dbResult) => {
			if (dbResult) {
				res.render(`user/new`, {
					errorMessage: `Your email is already used ! If you already have an account, please <a href="/login">log in</a> !`,
				});
			} else {
				const salt = bcrypt.genSaltSync(bcryptSalt);
				const hashPass = bcrypt.hashSync(password, salt);
				User.create({ name, email, hashPass })
					.then((dbResult) => {
						req.flash('created', `Account created ! Welcome ${name}`);
						res.redirect('/user/login');
					})
					.catch((dbError) => console.log(dbError));
			}
		})
		.catch((dbError) => {
			console.log(dbError);
		});
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
