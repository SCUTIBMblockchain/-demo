const patient = require('../models/patient')

const getAllPatient = function* () {
  const hospitalName = this.request.body
  const result = yield patient.queryAllPatient(hospitalName)
  this.body = result
}

const getCasesByPatientId = function* () {
  const patientId = this.request.body
  const result = yield patient.queryByPatientId(patientId)
  this.body = result
}
module.exports = {
  getAllPatient,
  getCasesByPatientId
}
