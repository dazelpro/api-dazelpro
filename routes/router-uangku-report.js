const router = require('express').Router();
const uangKu = require('../controllers').uangKu;

router.get('/main/:id', uangKu.getMainReport);

module.exports = router;