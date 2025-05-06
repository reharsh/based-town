import { WebSocketServer } from 'ws';
import { WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let clientId = 0;
const clients = new Map<number, WebSocket>();

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  const id = clientId++;
  clients.set(id, ws);

  ws.on('message', (message) => {
    for( const [clientId, client] of clients.entries()) {
      if(client.readyState === WebSocket.OPEN && clientId!=id){
        client.send(message)
      }
    }
  });


  ws.on('close',()=>{
    clients.delete(id)
  })

  ws.send('something');
});
