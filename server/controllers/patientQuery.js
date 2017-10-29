const patient = require('../models/patient')
const referral = require('../models/referral')

function count (obj) {
  var objType = typeof obj
  if (objType === 'string') {
    return obj.length
  } else if (objType === 'object') {
    var objLen = 0
    for (var i in obj) {
      objLen++
    }
    return objLen
  }
  return false
}

// 返回医院下的所有病人
const getAllPatient = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryAllPatient(hospitalName)
  this.body = result
}
// 返回医院下的所有normal病人
const getNormalPatient = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryUndealPatient(hospitalName)
  var msg = JSON.parse(result)
  var con = count(msg)
  for (var i = 0; i < con; i++) {
    var state = msg[i].State.Referral
    if (state !== 'normal') {
      msg.splice(i, 1)
    }
  }
  this.body = msg
}
// 返回医院下的所有accept病人
const getAcceptPatient = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryTodealPatient(hospitalName)
  var msg = JSON.parse(result)
  var con = count(msg)
  for (var i = 0; i < con; i++) {
    var state = msg[i].State.Referral
    if (state !== 'accept') {
      msg.splice(i, 1)
    }
  }
  this.body = msg
}
// 返回医院下的所有reject病人
const getRejectPatient = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryDealedPatient(hospitalName)
  var msg = JSON.parse(result)
  var con = count(msg)
  for (var i = 0; i < con; i++) {
    var state = msg[i].State.Referral
    if (state !== 'reject') {
      msg.splice(i, 1)
    }
  }
  this.body = msg
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
  getReferralByPatientId,
  getNormalPatient,
  getAcceptPatient,
  getRejectPatient
}
