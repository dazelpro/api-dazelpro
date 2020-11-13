const router = require('express').Router();
const uangKu = require('../controllers').uangKu;

router.get('/in', uangKu.getDataTransactionIn);
router.get('/out', uangKu.getDataCategory);
router.post('/insert-in', uangKu.insertTransactionIn);
router.post('/insert-out', uangKu.insertTransactionOut);

module.exports = router;