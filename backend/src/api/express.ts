import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server)

io.on("connection", (socket) => {
	console.log("userConnection");
})

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/files/index.html');
});


export default function() {
	server.listen(3000, () => {
		console.log("Starting server on port 3000");
	})
};
