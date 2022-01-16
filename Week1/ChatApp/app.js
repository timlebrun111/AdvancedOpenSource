var WebSocketServer = require('ws').Server
wss = new WebSocketServer({port:3000}),
clients = [],
messages = []

wss.on('connection', function(ws){
    var index = clients.push(ws) -1;
    console.log(wss.clients);
    var msgText = messages.join('<br>')
    ws.send(msgText)

    ws.on('message', function(message){
        messages.push(message);
        console.log('recieved from ', message, index);

        wss.clients.forEach(function(conn){
            conn.send(message.toString())   
        });
    })

})

console.log("Connected on port 3000")