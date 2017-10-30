const query = require('./query')
const patient = require('./patient').patient

//* 生成转诊单
var generateReferralByPatientId = function* (msg) {
  const referralProfile = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [msg.Id, msg.patientId, msg.referralType, msg.relationDemand, msg.payWay,
    msg.IllnessState, msg.toInfo.hospitalId, msg.toInfo.section, msg.toInfo.doctor, msg.toInfo.phone, msg.fromInfo.hospitalId, msg.fromInfo.section, msg.fromInfo.doctor,
    msg.fromInfo.phone], 'CreateReferralProfile', patient.adminName, patient.org)
  return referralProfile
}

var refId = []
var count = 0
var generateRefferralId = function (patientId) {
  //* 生成转诊单号
  var len = count
  if (len < 10) {
    len = '0' + len
  }
  const refToken = 'referral' + len
  for (var key in refId) {
    if (key === patientId) {
      return null
    }
  }
  count++
  refId[patientId] = refToken
  var referralId = refId[patientId]
  return referralId
}

var querySendReferrals = function* (hospitalId) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [hospitalId], 'queryReferralsAsSenderByHospitalId', patient.adminName, patient.org)
  return Case
}

var queryReceiveReferrals = function* (hospitalId) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [hospitalId], 'queryReferralsAsSenderByHospitalId', patient.adminName, patient.org)
  return Case
}

var queryReferrals = function* (msg) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [msg.referralId, msg.hospitalId], 'queryReferralByReferralIdAndHospitalId', patient.adminName, patient.org)
  return Case
}

module.exports = {
  generateReferralByPatientId,
  querySendReferrals,
  queryReceiveReferrals,
  queryReferrals,
  generateRefferralId
}
