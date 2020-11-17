const router = require('express').Router();
const uangKu = require('../controllers').uangKu;

router.get('/main', uangKu.getMainReport);

module.exports = router;