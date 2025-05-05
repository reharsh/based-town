import type { OutgoingMessage } from "./types";
import type { User } from "./User";

export class RoomManager{
    rooms: Map<string,User[]> = new Map()
    static instance: RoomManager;
    private constructor(){}

    static getInstance(){
        if(!this.instance){
            this.instance = new RoomManager()
        }
        return this.instance;
    }

    public addUser(spaceId: string, userId: string){
        console.log(`user ${userId} is connected to space ${spaceId}`)
    }

    public broadcast(message: OutgoingMessage, user: User, roomId: string){
        if(!this.rooms.has(roomId)){
            return
        }
        this.rooms.get(roomId)?.forEach((u)=>{
            if(u.id!=user.id){
                u.send(message)
            }
        })
    }
}