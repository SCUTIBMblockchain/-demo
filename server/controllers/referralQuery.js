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
const getReferralsAsReceiverByHospitalId = function* () {
  const msg = this.params.hospitalId
  const result = yield referral.queryReferralProfileInfoAsReceiverByHospitalId(msg)
  const referralsTodeal = JSON.parse(result)
  const referralsDealed = referralsTodeal
  let backReferrals = {
    'todealReferralProfileInfo': null,
    'dealedReferralProfileInfo': null
  }
  var con1 = count(referralsTodeal)
  var con2 = count(referralsDealed)
  for (var i = 0; i < con1; i++) {
    var state = referralsTodeal[i].State
    if (state !== 'undeal') {
      referralsTodeal.splice(i, 1)
      i--
      con1--
    }
  }
  for (var j = 0; j < con2; j++) {
    state = referralsDealed[j].State
    if (state === 'undeal') {
      referralsDealed.splice(j, 1)
      j--
      con2--
    }
  }
  backReferrals.todealReferralProfileInfo = referralsTodeal
  backReferrals.dealedReferralProfileInfo = referralsDealed
  this.body = backReferrals
}
module.exports = {
  getSendReferrals,
  getReceiveReferrals,
  getReferrals,
  getReferral,
  getReferralsAsReceiverByHospitalId
}
