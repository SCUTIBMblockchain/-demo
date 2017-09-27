const WebSocket = require('ws')
// const queryIp = require('./hospital')
const WebSocketServer = WebSocket.Server

const queryChainCode = require('./query').queryChaincode
var hospital = {
  peer: 'peer1',
  org: 'org1',
  channelName: 'myChannel',
  chaincode: 'mycc',
  userName: 'admin'
}
const queryIp = function (name) {
  return queryChainCode(hospital.peer, hospital.channelName, hospital.chaincode, name, 'query', hospital.userName, hospital.org)
}

function createWebSocketServer (server) {
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
    ws.on('message', function (msg, req) {
      var hospitalmsg = JSON.parse(msg)
      // query hospital ip
      queryChainCode(hospital.peer, hospital.channelName, hospital.chaincode, hospitalmsg.hospitalName, 'query', hospital.userName, hospital.org).then((address) => {
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
  console.log('WebSocketServer was attached.')
  return wss
}

module.exports = createWebSocketServer
