const queryIp = require('../models/hospital')

var ws

var referralRequest = function (msg) {
  if (!msg) {
    return
  }
  var hospitalmsg = JSON.parse(msg)
  //ws.send('received')
  // query hospital ip
  console.log('hospitalmsg.id is ',hospitalmsg.hospitalId);
  if(hospitalmsg.hospitalId !== undefined) {

    //建立连接所发送的第一条请求消息,应该忽略
    queryIp(hospitalmsg.hospitalId).then((address) => {
      // 建立与目标医院的webSocket连接
      var h = new WebSocket(address)
      // 发送信息
      h.send = {
        patientId: hospitalmsg.patientId,
        additionMsg: hospitalmsg.additionMsg
      }
      h.onmessage = function (event) {
        var data = event.data
        console.log('onmessage.data is ',data)
        var msg = JSON.parse(data)
        ws.send(msg)
      }
    })
  }
    // 接受返回信息
  }


module.exports = {
  referralRequest
}
