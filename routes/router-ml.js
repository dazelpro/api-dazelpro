const router                = require('express').Router();
const mobileLegends         = require('../controllers').mobileLegends;

router.get('/hero', mobileLegends.getHero);

module.exports = router;