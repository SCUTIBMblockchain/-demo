const query = require('./query')
const patient = require('./patient').patient
const invokeChainCode = require('./invokeTransaction').invokeChaincode

//* 生成转诊单
var generateReferralProfile = function (msg) {
  return invokeChainCode(patient.peer, patient.channelName, patient.chaincode, [msg.Id, msg.PatientId, msg.ReferralType, msg.RelationDemand, msg.PayWay,
    msg.IllnessState, msg.ToInfo.HospitalId, msg.ToInfo.Section, msg.ToInfo.Doctor, msg.ToInfo.Phone, msg.FromInfo.HospitalId, msg.FromInfo.Section, msg.FromInfo.Doctor,
    msg.fromInfo.phone], 'CreateReferralProfile', patient.adminName, patient.org)
}
var ReferralReturn = function (msg) {
  return invokeChainCode(patient.peer, patient.channelName, patient.chaincode, [msg.Id, msg.ToInfo.HospitalId, msg.State, msg.ToInfo.Section, msg.ToInfo.Doctor, msg.ToInfo.Phone], 'transferReturn', patient.adminName, patient.org)
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
  generateReferralProfile,
  querySendReferrals,
  queryReceiveReferrals,
  queryReferrals,
  generateRefferralId,
  ReferralReturn
}
