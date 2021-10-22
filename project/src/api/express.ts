import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import LocalFileRepo from "../data/local-file-repo";
import FileService from "../domain/services/file-service";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const filePaths = process.argv.slice(2);
console.log(`watching files: `, filePaths);
const fileService = new FileService(filePaths, new LocalFileRepo());

io.on("connection", (socket) => {
  fileService
    .watchFolders()
    .subscribe((event) => socket.emit("file-event", event));
});

app.use(express.static(path.join(process.cwd(), "frontend", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend", "build", "index.html"));
});

export default function () {
  server.listen(3000, () => {
    console.log("Starting server at http://localhost:3000");
  });
}
