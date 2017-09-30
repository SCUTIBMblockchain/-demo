const queryIp = require('./hospital')
const invokeIp = require('./hospital')
const WebSocket = require('ws')
var ws

var referralRequest = function (msg) {
  if (!msg) {
    return
  }
  var hospitalmsg = JSON.parse(msg)
  ws.send('received')
  // query hospital ip
  queryIp(hospitalmsg.hospitalName).then((address) => {
    // 建立与目标医院的webSocket连接
    var h = new WebSocket(address)
    // 发送信息
    h.send = {
      patientId: msg.patientId,
      additionMsg: msg.additionMsg
    }
    // 接受返回信息
    h.onmessage = function (event) {
      var data = event.data
      console.log(data)
      var msg = JSON.parse(data)
      ws.send(msg)
    }
  })
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
  referralRequest,
  referralReply
}
