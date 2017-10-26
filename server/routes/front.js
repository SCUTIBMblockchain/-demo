const router = require('koa-router')()
const frontReq = require('../controllers/patientQuery')
  // 查询病人信息
router.get('/queryByPatientId/:patientId', frontReq.getPatientInfoByPatientId)

module.exports = router
