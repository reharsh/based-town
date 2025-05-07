import { WebSocketServer } from 'ws';
import { WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const clients = new Map<string, WebSocket>();

wss.on('connection', (ws) => {
  ws.on('error', console.error);
  let clientId: string | null = null;


  ws.on('message', (message) => {
    const data = JSON.parse(message.toString())
    if(data.type === "join"){
      clientId = data.clientId;
      clients.set(clientId!, ws);
      console.log("joined with: ", clientId)
    }
    else if (data.type === "move") {
    for( const [otherId, client] of clients.entries()) {
      if(client.readyState === WebSocket.OPEN && otherId!=clientId){
        client.send(message)
      }
    }
   }
  });


  ws.on('close',()=>{
    if(clientId!=null){
      clients.delete(clientId)
    }
  })
});
