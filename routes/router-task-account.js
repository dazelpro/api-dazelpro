const router = require('express').Router();
const requestIp = require('request-ip');
const task = require('../controllers').task;

router.use(requestIp.mw())
router.get('/', task.getDataProfile);

module.exports = router;