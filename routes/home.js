const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index');
});

// Exemples of layouts
router.get('/layout-01', (req, res, next) => {
	res.render('user/login', {
		layout: 'layout-try01',
	});
});

module.exports = router;
