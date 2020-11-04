const router                = require('express').Router();
const requestIp             = require('request-ip');
const mobileLegends         = require('../controllers').mobileLegends;

router.use(requestIp.mw())
router.get('/hero', mobileLegends.getHero);
router.get('/hero/:id', mobileLegends.getHeroById);
router.get('/role', mobileLegends.getHeroRole);
router.get('/specially', mobileLegends.getHeroSpecially);

module.exports = router;