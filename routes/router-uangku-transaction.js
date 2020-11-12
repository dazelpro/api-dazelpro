const router = require('express').Router();
const uangKu = require('../controllers').uangKu;

// router.get('/', uangKu.getDataCategory);
router.post('/insert-in', uangKu.insertTransactionIn);
router.post('/insert-out', uangKu.insertTransactionOut);

module.exports = router;