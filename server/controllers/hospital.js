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
    var h = new WebSocket('ws://' + 'localhost:9000' + '/referral/host')
      // 发送信息
    var sendmsg = {
      operation: 'send',
      patientId: message.patientId,
      additionMsg: message.additionMsg
    }
    this.ws.referralMsg = sendmsg
      .send( JSON.stringify(sendmsg))
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

var referralReply = function (msg) {
  if (!msg) {
    return
  }
  var hospitalmsg = JSON.parse(msg)
  ws.send('received')
    // B 医院回复
  ws.on('message', (address) => {
    if (hospitalmsg.accept) { // accept为真，接收转诊
        // invoke 改变状态
      invokeIp(hospitalmsg.HospitalName).then(() => {
      // 回复转诊医院
        var h = new WebSocket(address)
        // send back patientID as well as additional message
        h.send = {
          accept: hospitalmsg.accept,
          patientId: hospitalmsg.patientId,
          additionMsg: hospitalmsg.additionMsg
        }
      }
      )
    }
    else {     // accept为假，不接收转诊
      var h = new WebSocket(address)
      h.send = {
        accept: false,             // 置accept为假
        patientId: hospitalmsg.patientId,
        additionMsg: hospitalmsg.additionMsg
      }
    }
  })
}

module.exports = {
  referral,
  referralHost
}
