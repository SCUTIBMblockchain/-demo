var referral = function (msg) {
  const queryIp = require('../models/hospital')
  const referralPatient = require('../models/hospital').referralPatient
  const WebSocket = require('ws')
  // const webSocket = require('./')
  if (!msg) {
    return
  }
  var message = JSON.parse(msg)
  if (message.operation === 'send') {
    // queryIp([message.hospitalId]).then((address) => {
      // 建立与目标医院的webSocket连接
      var h = new WebSocket('ws://' + 'localhost:8889' + '/referral/host')
      // 发送信息
      var sendmsg = {
        operation: 'send',
        patientId: message.patientId,
        additionMsg: message.additionMsg
      }
      this.ws.referralMsg = sendmsg
      h.send = JSON.stringify(sendmsg)
      // 接受返回信息
    // })
  }
  if (message.operation === 'accept') {
    // 若使用fabric请去掉注释
    // referralPatient([this.ws.referralmsg.patientId, 'hospital01', this.ws.referralmsg.hospitalId]).then(() => {
      // 同意转诊
      var reply = {
        operation: 'accept'
      }
      this.wss.sendMessage('/referral/host', JSON.stringify(reply))
    // })
  }
  if (message.operation === 'reject') {
    // 拒绝转诊
    var reply = {
      operation: 'reject' // 置accept为假
    }
    this.wss.sendMessage('/referral/host', JSON.stringify(reply))
  }
}

var referralHost = function (msg) {
  if (!msg) {
    return
  }
  var message = JSON.parse(msg)
  if (message.operation === 'accept' || message.operation === 'reject') {
    var reply = {
      operation: message.operation
    }
    this.wss.sendMessage('/referral', JSON.stringify(reply))
  }
  if (message.operation === 'send') {
    reply = {
      operation: 'receive',
      patientId: msg.patientId,
      additionMsg: msg.additionMsg

    }
    this.wss.sendMessage('/referral', JSON.stringify(reply))
  }
}

module.exports = {
  referral,
  referralHost
}
