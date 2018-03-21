const router = require('express').Router();

const fetchData = require('./fetchData');

router.get('/doubanhome', fetchData.douHomeMain);


module.exports = router;