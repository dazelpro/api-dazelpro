const router = require('express').Router();
const uangKu = require('../controllers').uangKu;

router.get('/in', uangKu.getDataTransactionIn);
router.get('/out/:id', uangKu.getDataTransactionOut);
router.post('/insert-in', uangKu.insertTransactionIn);
router.post('/insert-out', uangKu.insertTransactionOut);
router.post('/update-in', uangKu.updateTransactionIn);
router.post('/update-out', uangKu.updateTransactionOut);
router.post('/delete-in', uangKu.deleteTransactionIn);
router.post('/delete-out', uangKu.deleteTransactionOut);

module.exports = router;