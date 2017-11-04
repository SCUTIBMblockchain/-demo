const referral = require('../models/referral')
const patient = require('../models/patient')

// 请求所有发送的转诊单
const getSendReferrals = function* () {
  const hospitalId = this.params.hospitalId
  const result = yield referral.querySendReferrals(hospitalId)
  this.body = result
}

// 请求所有接收到的转诊单
const getReceiveReferrals = function* () {
  const hospitalId = this.params.hospitalId
  const result = yield referral.queryReceiveReferrals(hospitalId)
  this.body = result
}

// 请求所有接收到的转诊单
const getReferrals = function* () {
  const data = this.request.body
  const msg = {
    referralId: data.referralId,
    hospitalId: data.hospitalId
  }
  const result = yield referral.queryReferrals(msg)
  this.body = result
}

const getReferral = function* () {
  const patientId = this.params.patientId
  const referralId = referral.generateRefferralId(patientId)
  const patientString = yield patient.queryPatientByPatientId(patientId)
  var msg = JSON.parse(patientString)
  var ref = {
    'Id': referralId,
    'State': msg.State,
    'Date': msg.Date,
    'Name': msg.Name,
    'PIN': msg.PIN,
    'Gender': msg.Gender,
    'Age': msg.Age,
    'Resident': msg.Resident,
    'Phone': msg.Phone,
    'Birthplace': msg.Birthplace,
    'Nationality': msg.Nationality,
    'Occupation': msg.Occupation,
    'FromInfo': {
      'Section': null,
      'HospitalName': null,
      'Doctor': null,
      'Phone': null,
      'ReferralType': null,
      'RelationDemand': null,
      'PayWay': null,
      'IllnessState': null
    },
    'ToInfo': {
      'Section': null,
      'Doctor': null,
      'Phone': null,
      'RejectReason': null
    }
  }
  this.body = ref
}

module.exports = {
  getSendReferrals,
  getReceiveReferrals,
  getReferrals,
  getReferral
}
