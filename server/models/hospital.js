const queryChainCode = require('./query').queryChaincode
const invokeChainCode = require('./invokeTransaction').invokeChaincode

var hospital = {
  peer: 'peer1',
  org: 'org1',
  channelName: 'mychannel',
  chaincode: 'mycc',
  userName: 'admin'
}
const queryIp = function (name) {
  return queryChainCode(hospital.peer, hospital.channelName, hospital.chaincode, name, 'query', hospital.userName, hospital.org)
}

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
