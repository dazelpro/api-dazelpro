const router                = require('express').Router();
const requestIp             = require('request-ip');
const remlar                = require('../controllers').remlar;

router.use(requestIp.mw())
router.get('/', remlar.check);
router.get('/switch/:id', remlar.switch);

module.exports = router;