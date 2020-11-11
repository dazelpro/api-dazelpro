const router = require('express').Router();
const uangKu = require('../controllers').uangKu;

router.get('/', uangKu.getDataCategory);
router.post('/insert', uangKu.insertCategory);
router.post('/update', uangKu.updateCategory);

module.exports = router;