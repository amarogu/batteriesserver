import { Server, Socket } from "socket.io";
import batteryLevelPosted from "./actions/batteryLevelPosted";

export default function handleEvents(socket: Socket, io: Server) {
    socket.on('battery level posted', (data) => {
        batteryLevelPosted(data, io, socket);
    });
}