const express = require(`express`);
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

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
	User.find({ email: email })
		.then((dbResult) => {
			console.log('allo');
			console.log(dbResult);
			if (dbResult) {
				console.log('There is one');
			} else {
				console.log('There is not');
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
