const router                = require('express').Router();
const mobileLegends         = require('../controllers').mobileLegends;

router.get('/hero', mobileLegends.getHero);
router.get('/hero/:id', mobileLegends.getHeroById);

module.exports = router;