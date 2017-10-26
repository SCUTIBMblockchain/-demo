const patient = require('../models/patient')
const referral = require('../models/referral')

// 返回医院下的所有病人
const getAllPatient = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryAllPatient(hospitalName)
  this.body = result
}
// 返回病人的病例
const getCasesByPatientId = function* () {
  const patientId = this.params.patientId
  const result = yield patient.queryCasesByPatientId(patientId)
  this.body = result
}
// 返回病人信息
const getPatientInfoByPatientId = function* () {
  const patientId = this.params.patientId
  const result = yield patient.queryPatientByPatientId(patientId)
  this.body = result
}
// 返回生成的转诊单
const getReferralByPatientId = function* () {
  const patientId = this.params.patientId
  const result = yield referral.generateReferralByPatientId(patientId)
  this.body = result
}

module.exports = {
  getAllPatient,
  getCasesByPatientId,
  getPatientInfoByPatientId,
  getReferralByPatientId
}
