const patient = require('../models/patient')

const getAllPatient = function* () {
  const hospitalName = this.params.hospitalName
  const result = yield patient.queryAllPatient(hospitalName)
  this.body = result
}

const getCasesByPatientId = function* () {
  const patientId = this.params.patientId
  const result = yield patient.queryCasesByPatientId(patientId)
  this.body = result
}
module.exports = {
  getAllPatient,
  getCasesByPatientId
}
