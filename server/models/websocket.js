const ws = require('ws')
const queryIp = require('./hospital')
const WebSocketServer = ws.Server

function createWebSocketServer (server, onConnection, onMessage, onClose, onError) {
  let wss = new WebSocketServer({
    server: server
  })
  wss.broadcast = function broadcast (data) {
    wss.clients.forEach(function each (client) {
      client.send(data)
    })
  }
  onConnection = onConnection || function () {
    console.log('[WebSocket] connected.')
  }
  onMessage = onMessage || function (msg) {
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
      
    })
  }
  onClose = onClose || function (code, message) {
    console.log(`[WebSocket] closed: ${code} - ${message}`)
  }
  onError = onError || function (err) {
    console.log('[WebSocket] error: ' + err)
  }
  wss.on('connection', function (ws, req) {
    ws.on('message', onMessage)
    ws.on('close', onClose)
    ws.on('error', onError)
    ws.wss = wss
    onConnection.apply(ws)
  })
  console.log('WebSocketServer was attached.')
  return wss
}

module.exports = createWebSocketServer
