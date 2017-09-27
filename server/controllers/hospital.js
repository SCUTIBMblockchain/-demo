const queryIp = require('./hospital')

var ws

var referralRequest = function (msg) {
  var hospitalmsg = JSON.parse(msg)
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

module.exports = {
  referralRequest
}
