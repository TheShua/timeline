const express = require(`express`);
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

//AJAX TO EDIT THE PROFILE - Same page 
//prefixe /api/user

// Update
//need to hash password again and check if email exist

router.patch("/:id", (req, res) => {
    
 User.findByIdAndUpdate(req.params.id, req.body, {
                    new: true
                })
                .then((dbResult) => {
                    console.Log(dbResult);
                })
                .catch((dbErr) => {
                    console.log(dbErr);
                });

            }); 







module.exports = router;

