const router = require('express').Router();
const requestIp = require('request-ip');
const task = require('../controllers').task;

router.use(requestIp.mw())
router.post('/', task.auth);

module.exports = router;