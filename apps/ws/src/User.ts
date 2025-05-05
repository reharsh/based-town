import type WebSocket from "ws";
import { RoomManager } from "./RoomManager";
import type { OutgoingMessage } from "./types";
import { spawn } from "bun";

function generateRandomId(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

const spaceId = "12"
const userId = "23333"


export class User {
    public id: string;
    constructor(private ws: WebSocket) {
        this.ws = ws;
        this.id = generateRandomId()
    }
    
    initHandlers() {
        this.ws.on("message",(data) => {
            const parsedData = JSON.parse(data.toString());
            switch (parsedData.type) {
                case "join":
                    console.log("joining... with: ", parsedData);
                    RoomManager.getInstance().addUser(spaceId,userId)
                    this.send({
                        type: "space-joined",
                        payload: {
                            spawn: {
                                x: Math.floor(Math.random() * 20),
                                y: Math.floor(Math.random() * 20)
                            },
                            users: RoomManager.getInstance().rooms.get(spaceId)?.map((u)=>({id: u.id}))
                        }
                    })
                    break;
                case "move":
                    console.log("moved.... with: ", parsedData)
            }
        })
    }

    public send(payload: OutgoingMessage){
        this.ws.send(JSON.stringify(payload))
    }

}