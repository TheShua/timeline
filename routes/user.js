const express = require(`express`);
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const isAuthenticated = require("./../middlewares/isAuthenticated");

// Index

router.get(`/`, (req, res, next) => {
  // console.log(`/user/index`);
  res.render(`user/index`);
});

// New

router.get(`/signup`, (req, res, next) => {
  // console.log(`/user/new`);
  res.render(`user/new`, {
    stylesheets: ["user-profile.css"],
  });
});

// Create

router.post(`/signup`, (req, res, next) => {
  // console.log(`Post: /user`);
  const { name, email, password } = req.body;
  const passwordConfirm = req.body.password_confirm;

  // Checking if all the fields are filled
  if (
    name === "" ||
    email === "" ||
    password === "" ||
    passwordConfirm === ""
  ) {
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

  // Checking if a user already exist with this email
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.render(`user/new`, {
          errorMessage: `Your email is already used ! If you already have an account, please <a href="/login">log in</a> !`,
        });
      } else {
        // Hashing the password
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        User.create({ name, email, password: hashPass })
          .then((dbResult) => {
            req.flash("created", `Account created ! Welcome ${name}`);
            res.redirect("/user/login");
          })
          .catch((dbError) => console.log(dbError));
      }
    })
    .catch((dbError) => {
      console.log(dbError);
    });
});

/**
 * GETTING ON LOGIN PAGE
 */
router.get(`/login`, (req, res, next) => {
  res.render(`user/login`, {
    stylesheets: ["user-profile.css"],
  });
});

/**
 * CHECKING LOGIN DATAS FOR AUTHENTIFICATION
 */
router.post(`/login`, (req, res, next) => {
  const { email, password } = req.body;

  // Check if both fields are empty
  if (email === "" || password === "") {
    res.render(`user/login`, {
      errorMessage: `Please make sure both fields are filled...`,
    });
    return;
  }

  // Check if we got this account on the database
  User.findOne({ email })
    .then((user) => {
      // Checking if we got an existing user
      if (!user) {
        res.render(`user/login`, {
          errorMessage: `Invalid credentials they said...`,
        });
        return;
      }

      // Checking if the passwords matchs
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        req.flash("success", `Welcome ${user.name} !`);
        res.redirect("/timeline");
      } else {
        res.render(`user/login`, {
          errorMessage: `Invalid credentials they said...`,
        });
      }
    })
    .catch((dbError) => next(dbError));
});

// Show

router.get(`/show`, isAuthenticated, (req, res, next) => {
  res.render(`user/show`, {
    user: req.session.currentUser,
    scripts: ["userEdit.js"],
    stylesheets: ["user-profile.css"],
  });
});

//using ajax

// // Edit

// router.get(`/:id/edit`, (req, res, next) => {
// 	res.render(`user/edit`, { id: req.params.id });
// 	console.log(`/user/${req.params.id}/edit`);
// });

// // Update

// router.post(`/:id`, (req, res, next) => {
// 	console.log(`Post: /user/${req.params.id}`);
// });

// Destroy

router.get(`/logout`, (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

router.post(`/:id/delete`, (req, res, next) => {
  User.findByIdAndDelete(req.params.id)

    .then((dbRes) => {
      res.redirect(`/user/signup`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
