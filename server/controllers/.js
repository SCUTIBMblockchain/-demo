const invokeChainCode = require('../models/invokeTransaction').invokeChaincode

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

module.exports = invokeIp
