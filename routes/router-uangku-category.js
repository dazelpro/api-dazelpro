const router = require('express').Router();
const uangKu = require('../controllers').uangKu;

router.get('/', uangKu.getDataCategory);
router.post('/insert', uangKu.insertCategory);

module.exports = router;