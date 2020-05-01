const express = require(`express`);
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const multer = require('multer');
const upload = multer();
const uploadCloud = require('../config/cloudinary.js');

//AJAX TO EDIT THE PROFILE - Same page 
//prefixe /api/user

// Update
//need to hash password again and check if email exist

router.patch("/:id", uploadCloud.single("photo"), async (req, res) => {


    try {
                // console.log(req.body)

                const findEmail = await User.findOne({ email: req.body.email })
                    .then((user) => {
                        if (user && user._id == req.params.id) {
                            return false
                        } else {
                            return true
                        }
                    })
                    .catch((err) => { console.log(err) });
        
        if (findEmail) {
            res.status(500).json({message: "Email already taken, sorry" })
                    }

                const salt = bcrypt.genSaltSync(bcryptSalt);
                const password = req.body.password;
                const hashPass = bcrypt.hashSync(password, salt);


                const updatedUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPass
                }

        if (req.file) { 
            updatedUser.image = req.file.secure_url;
        }
        
        console.log(req.file)



                User.findByIdAndUpdate(req.params.id, updatedUser, {
                        new: true
                    })
                    .then((dbResult) => {

                        res.status(200).json(dbResult)

                    })
                    .catch((dbErr) => {
                        res.status(500).json(dbErr)

                    });

            } catch (err) {
                console.log(err)
            }
})



        module.exports = router;