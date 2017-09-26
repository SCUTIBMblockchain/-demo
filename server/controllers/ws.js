const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const sendHospitalwss = new WebSocketServer({port:4000});

let obj;
let sender;
let receiver;

sendHospitalwss.on('connection',(ws)=> {
  console.log('an hospital was connected');
  ws.onmessage = function (event) {
    //send message to another hospital
    obj = event.data;
    // obj 是String 类型
    // console.log('obj type is ',typeof obj);
    //console.log('obj is ',obj);
    // 转化为json对象
    jsonobj = JSON.parse(obj);
    //console.log(jsonobj.operation,jsonobj.object);
    if(jsonobj.operation==="receive"){
      console.log('接收到 receive 的信息,信息实体是 ',jsonobj.object);
      receiver = ws;
    }else if(jsonobj.operation==="send"){
      console.log('接收到 send 的信息,信息实体是 ',jsonobj.object);
      sender = ws;
      ws.send('您已成功提交转诊请求');
      //receiver.send('有一个转诊信息待处理');
      jsonobj.operation="move";
      receiver.send(JSON.stringify(jsonobj));
    }
  }
});

// sendHospitalwss.on('connection',(ws)=> {
//   console.log('receive hospital wss connected');
//   console.log('在wss2中obj的值是',obj);
//   ws.onmessage = function (event) {
//     //send message to another hospital
//     ws.send('这是一条服务器发送给接受转诊的医院的消息');
//     ws.send(obj);
//   }
// });
