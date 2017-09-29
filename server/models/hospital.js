const queryChainCode = require('./query').queryChaincode

var hospital = {
  peer: 'peer1',
  org: 'org1',
  channelName: 'mychannel',
  chaincode: 'mycc',
  userName: 'admin'
}
const queryIp = function (hospitalId) {
  console.log(hospitalId);
  return queryChainCode(hospital.peer, hospital.channelName, hospital.chaincode, hospitalId, 'queryIpByHospitalId', hospital.userName, hospital.org)
}

module.exports = queryIp
