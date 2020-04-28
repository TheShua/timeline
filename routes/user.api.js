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
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const password = req.body.password;
    const hashPass = bcrypt.hashSync(password, salt);

    const updatedUser = {name: req.body.name, email: req.body.email, password: hashPass}; 
    console.log(updatedUser)
 User.findByIdAndUpdate(req.params.id, updatedUser, {
                    new: true
                })
                .then((dbResult) => {
                    
                    res.status(200).json(dbResult)
                   
                })
                .catch((dbErr) => {
                    res.status(500).json(dbErr)
                    
                });

            }); 







module.exports = router;

