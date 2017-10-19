const queryChainCode = require('./query').queryChaincode
const invokeChainCode = require('./invokeTransaction').invokeChaincode
<<<<<<< HEAD
=======

>>>>>>> f90d35421536f0d9b1794d5ec3bf5dc89080746b
var hospital = {
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
  referralPatient
}
<<<<<<< HEAD
=======

var hospitalB = {
  peersUrls: 'peer0',   // ! mistake here
  channelName: 'myChannel',
  chaincodeName: 'mycc',
  userName: 'admin',
  org: 'org2'
}
const invokeIp = function* (name) {
  return invokeChainCode(hospitalB.peersUrls, hospitalB.channelName, hospitalB.chaincodeName, 'invokeIp', name, hospitalB.userName, hospitalB.org)
}
//* var invokeChaincode = function* (peersUrls, channelName, chaincodeName, fcn, args, username, org)

module.exports = queryIp
module.exports = invokeIp
>>>>>>> f90d35421536f0d9b1794d5ec3bf5dc89080746b
