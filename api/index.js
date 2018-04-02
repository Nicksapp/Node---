const router = require('express').Router();

const fetchData = require('./fetchData');

router.get('/doubanhome', fetchData.douHomeMain);
router.get('/mooc', fetchData.getMooc);


module.exports = router;