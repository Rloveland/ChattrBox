var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [""];

console.log('websockets server started');

ws.on('connection', function (socket) {
  console.log('client connection established');

  messages.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on('message', function (data) {
    if(data.substring(0,6)=="/topic"){
        console.log("***Topic has been changed to  '" + data.substring(7) +"'");
        messages[0] = "*** Topic is '" + data.substring(7) + "'";
        ws.clients.forEach(function (clientSocket) {
          clientSocket.send("***Topic has been changed to  '" + data.substring(7) +"'")
        });
    }
    else{
        console.log('message received: ' + data);
        messages.push(data);
        ws.clients.forEach(function (clientSocket) {
          clientSocket.send(data)
        });
    }
  });
});