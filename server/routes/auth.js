const auth = require('../controllers/user.js'); 
const router = require('koa-router')();

router.get('/usr', auth.getQuery);
router.post('/user', auth.postUserAuth);

module.exports = router;