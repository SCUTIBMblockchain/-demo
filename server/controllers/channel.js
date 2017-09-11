var log4js = require('log4js')
var logger = log4js.getLogger('SampleWebApp')
var channels = require('../models/channel.js')
var getErrorMessage = require('../models/tool').getErrorMessage

function* createChannel () {
  logger.info('<<<<<<<<<<<<<<<<< C R E A T E  C H A N N E L >>>>>>>>>>>>>>>>>')
  logger.debug('End point : /channels')
  var channelName = this.request.body.channelName
  var channelConfigPath = this.request.body.channelConfigPath
  logger.debug('Channel name : ' + channelName)
  logger.debug('channelConfigPath : ' + channelConfigPath) // ../artifacts/channel/mychannel.tx
  if (!channelName) {
    this.response.body = JSON.stringify(getErrorMessage('\'channelName\''))
    return
  }
  if (!channelConfigPath) {
    this.response.body = JSON.stringify(getErrorMessage('\'channelConfigPath\''))
    return
  }

  this.body = yield channels.createChannel(channelName, channelConfigPath, this.request.body.username, this.request.body.orgName)
}
function* joinChannel() {
  logger.info('<<<<<<<<<<<<<<<<< J O I N  C H A N N E L >>>>>>>>>>>>>>>>>')
  var channelName = this.request.params.channelName
  var peers = this.request.request.body.peers
  logger.debug('channelName : ' + channelName)
  logger.debug('peers : ' + peers)
  if (!channelName) {
    JSON.stringify(getErrorMessage('\'channelName\''))
    return
  }
  if (!peers || peers.length == 0) {
    res.json(getErrorMessage('\'peers\''))
    return
  }
  join.joinChannel(channelName, peers, req.username, req.orgname)
    .then(function (message) {
      res.send(message)
    })
}
exports.createChannel = createChannel
