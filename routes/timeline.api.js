const express = require(`express`);
const router = express.Router();
const Timeline = require("../models/timeline"); 


router.patch("/fav/:id", (req, res) =>{
    Timeline.findById(req.params.id)
    .then((dbRes)=>{
        let isFav = dbRes.favorite === undefined ? false : dbRes.favorite;

        Timeline.findByIdAndUpdate(req.params.id, {favorite: !isFav}, {new: true}) // !isFav car on veut l'opposer dans la db
        .then((dbRes)=>{
            res.status(200).json(dbRes);

        })
        .catch((err)=>{
            res.status(500).json({message: err})
        })
    })
    .catch((err)=>{console.log(err)})
})



module.exports = router;