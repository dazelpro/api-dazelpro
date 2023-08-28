const router = require('express').Router();
const requestIp = require('request-ip');
const uangKu = require('../controllers').uangKu;

router.use(requestIp.mw())
router.post('/', uangKu.auth);

module.exports = router;