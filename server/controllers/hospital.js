
var referralRequest = function (msg) {
  const queryIp = require('../models/hospital')
  //const webSocket = require('./')
  if (!msg) {
    return
  }
  var hospitalmsg = JSON.parse(msg)
  this.ws.send('received')
  // query hospital ip
  queryIp([hospitalmsg.hospitalId]).then((address) => {
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

module.exports = {
  referralRequest
}
