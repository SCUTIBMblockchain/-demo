var referral = function (msg) {
  const genReferral = require('../models/referral')
  const WebSocket = require('ws')
  // const webSocket = require('./')
  if (msg.includes('@')) {
    return
  }
  if (!msg) {
    return
  }
  var message = JSON.parse(msg)
  if (message.operation === 'send') {
     // queryIp([message.hospitalId]).then((address) => {
      // 建立与目标医院的webSocket连接
    //* 在区块链中生成转诊单
    genReferral.generateReferralByPatientId(msg)
    var h = new WebSocket('ws://' + 'localhost:8889' + '/referral/host')
    // 发送信息
    var sendmsg = {
      operation: 'send',
      patientId: message.patientId,
      additionMsg: message.referralProfile
    }
    this.ws.referralMsg = sendmsg
    h.on('open', function open () {
      h.send(JSON.stringify(sendmsg))
    })
    var wss = this.wss
    h.on('message', function incoming (data) {
      var message = JSON.parse(data)
      if (message.operation === 'accept' || message.operation === 'reject') {
        var reply = {
          operation: message.operation
        }
        wss.sendMessage('/referral', JSON.stringify(reply))
      }
    })
      // 接受返回信息
    // })
  }
  if (message.operation === 'accept') {
    // 若使用fabric请去掉注释
    // referralPatient([this.ws.referralmsg.patientId, 'hospital01', this.ws.referralmsg.hospitalId]).then(() => {
      // 同意转诊
    // TODO 认为需要invoke改变转诊单状态以便查询
    var reply = {
      operation: message.operation,
      referralProfile: message.referralProfile
    }
    this.wss.sendMessage('/referral/host', JSON.stringify(reply))
    // })
  }
  if (message.operation === 'reject') {
    // 拒绝转诊
    reply = {
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
  if (message.operation === 'send') {
    var reply = {
      operation: 'receive',
      patientId: message.patientId,
      additionMsg: message.additionMsg

    }
    this.wss.sendMessage('/referral', JSON.stringify(reply))
  }
}

module.exports = {
  referral,
  referralHost
}
