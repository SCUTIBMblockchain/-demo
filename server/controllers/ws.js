// ? might only for debugging
const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server
const wss = new WebSocketServer({port: 4000})
wss.on('connection', (ws) => {
  console.log('wss connected')
  ws.onmessage = function (event) {
    console.log('ws get message')
    console.log(event.data)
  }
  ws.send('message sent back from wss')
})
