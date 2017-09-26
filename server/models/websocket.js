//* receive and solve webSocket things
const ws = require('ws')
const WebSocketServer = ws.Server
const queryIp = require('./hospital')
const invokeIp = require('./hospital')

function createWebSocketServer (server) {
  // create websocket server instance
  let wss = new WebSocketServer({
    server: server
  })
  wss.broadcast = function broadcast (data) {
    wss.clients.forEach(function each (client) {
      client.send(data)
    })
  }
  wss.on('connection', function (ws, req) {
    // 发送转诊请求
    ws.on('message', function (msg) {
      // query hospital ip
      queryIp(msg.HospitalName).then((address) => {
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
    })
  })
  //* solve reply from B
  wss.on('reply', function (ws, accept) {
    // B give reply message
    if (accept) {
      ws.on('message', function (msg) {
        // query hospital ip
        invokeIp(msg.HospitalName).then((address) => {
          // build websocket with target hospital
          var h = new WebSocket(address)
          // send back patientID as well as additional message
          h.send = {
            accept: accept,
            patientId: msg.patientId,
            additionMsg: msg.additionMsg
          }
        })
      })
    }
  })
  console.log('WebSocketServer was attached.')
  return wss
}

module.exports = createWebSocketServer
