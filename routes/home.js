const express = require('express');
const router = express.Router();
const Timeline = require("../models/timeline")
const Event = require("../models/event")

router.get('/', (req, res, next) => {
	res.render('index', {		
		stylesheets: ['index-page.css'],
		scripts: ['home-page.js']
				
	});
});
	


// Add lastTimeLine 

// router.get('/lastTimeline', (req, res) => {

// 	Timeline.find().sort({
// 		creation_date: -1
// 	})
// 		.then((dbRes) => {
// 			const timeline = dbRes[0]
// 			Event.find({ timeline: timeline._id })
// 				.then((dbRes) => {

// 				res.status(200).json({
// 					lastTimeline: timeline,
// 					events: dbRes
// 				})
// 			})
			
// 			})
// 		})


// Exemples of layouts
router.get('/layout-01', (req, res, next) => {
	res.render('user/login', {
		layout: 'layout-try01',
	});
});

module.exports = router;
