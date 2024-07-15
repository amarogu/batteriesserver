import express from "express";
import dotenv from "dotenv";
import router from "./router";
import bodyParser from 'body-parser';
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

io.on('connection', (s) => {
    s.on('battery', (batteryLevel) => {
        console.log('Battery level:', batteryLevel);
    });
});

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);