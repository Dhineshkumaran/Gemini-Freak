import express from 'express';
import path from 'path';
import { createServer } from "node:http";
import { Server } from "socket.io";
import messageRoute from './routes/messageRoute';

const app = express();
const filepath = path.resolve('dist', 'styles');
app.use(express.static(filepath));

const server = createServer(app);
const io = new Server(server);

async function make_request(message: string): Promise<string> {
    const response = await fetch(`http://localhost:3000/message/${message}`);
    const result = await response.json();
    return result.message;
}

io.on('connection', (socket) => {
    socket.broadcast.emit("new", "A new friend is connected!");

    socket.on('message', async (msg) => {
        console.log('message:', msg);
        
        try {
            const reply = await make_request(msg);
            socket.emit("newMessage", reply);
        } catch (error) {
            console.error("Error fetching response:", error);
            socket.emit("errorMessage", "Could not process your message.");
        }
    });
});

app.get('/', (req, res) => {
    const filepath = path.resolve('public', 'index.html');
    res.sendFile(filepath);
});

app.use('/message', messageRoute);

server.listen(3000, () => {
    console.log("Server has started!");
});

export default app;
