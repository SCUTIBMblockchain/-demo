const query = require('./query')
const patient = require('./patient').patient

//* 生成转诊单
var generateReferralByPatientId = function* (msg) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [msg], 'CreateReferralProfile', patient.adminName, patient.org)
  return Case
}

var querySendReferrals = function* (hospitalId) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [hospitalId], 'queryReferralsAsSenderByHospitalId', patient.adminName, patient.org)
  return Case
}
var queryReceiveReferrals = function* (hospitalId) {
  const Case = yield query.queryChaincode(patient.peer, patient.channelName, patient.chaincode, [hospitalId], 'queryReferralsAsSenderByHospitalId', patient.adminName, patient.org)
  return Case
}

module.exports = {
  generateReferralByPatientId,
  querySendReferrals,
  queryReceiveReferrals
}
