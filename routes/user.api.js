const express = require(`express`);
const router = express.Router();
const User = require('../models/user');

//AJAX TO EDIT THE PROFILE - Same page 
//prefixe /api/user

// Update

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

//delete

router.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
         .then((dbResult) => {
                 console.Log(dbResult);
             })
             .catch((dbErr) => {
                 console.log(dbErr);
             });
});




module.exports = router;

