import express from "express";
import dotenv from "dotenv";
import router from "./router";
import bodyParser from 'body-parser';
import { createServer } from "http";
import { Server } from "socket.io";
import handleEvents from "./handleEvents";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

io.on('connection', async (socket) => {
    await socket.join('Gustavo\'s Room');
    handleEvents(socket, io);
});

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);