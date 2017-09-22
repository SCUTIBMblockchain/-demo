const queryChainCode = require('./query').queryChaincode

var hospital = {
  peer: 'peer0',
  org: 'org1',
  channelName: 'myChannel',
  chaincode: 'mycc',
  userName: 'admin'
}
const queryIp = function* (name) {
  return queryChainCode(hospital.peer, hospital.channelName, hospital.chaincode, name, 'queryIp', hospital.userName, hospital.org)
}

module.exports = queryIp
