const queryChainCode = require('./query').queryChaincode
const invokeChainCode = require('./invokeTransaction').invokeChaincode
const hospital = {
  peer: 'peer1',
  org: 'org1',
  channelName: 'mychannel',
  chaincode: 'mycc',
  userName: 'admin'
}
const queryIp = function (name) {
  return queryChainCode(hospital.peer, hospital.channelName, hospital.chaincode, name, 'queryIpByHospitalId', hospital.userName, hospital.org)
}
/**
 *
 * @param {*} args = [patientId, originHospitalId, targetHospitalId]
 */
const referralPatient = function* (args) {
  return invokeChainCode(hospital.peer, hospital.channelName, hospital.chaincodeName, 'transferTreatment', args, hospital.userName, hospital.org)
}
module.exports = {
  queryIp,
  referralPatient,
  hospital
}
