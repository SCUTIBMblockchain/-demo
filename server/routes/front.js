const frontReq = require('../controllers/patientQuery')

var routers = {
  // 查询病人信息
  '/patient/queryByPatientId/:PatientId': frontReq.getAllPatient
}

module.exports = routers
