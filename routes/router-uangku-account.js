const router = require('express').Router();
const requestIp = require('request-ip');
const uangKu = require('../controllers').uangKu;

router.use(requestIp.mw())
router.get('/', uangKu.getDataProfile);
router.get('/dashboard', uangKu.getDataDashboard);

module.exports = router;