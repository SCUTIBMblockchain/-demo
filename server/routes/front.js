// const router = require('koa-router')()
const frontReq = require('../controllers/patientQuery')

var routers = {
  // 查询病人信息
  '/queryByPatientId/:PatientId': frontReq.getPatientInfoByPatientId
}

module.exports = routers
