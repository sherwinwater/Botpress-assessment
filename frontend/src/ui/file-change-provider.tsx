import { useContext } from "react";
import SocketIOFileWatcher from "../api/socketio-file-watcher";
import FileService from "../domain/file-service";
import { fileContext } from "../file-context";
import FileSystem from "./components/file-system";

export default function FileChangeProvider() {
  const context = useContext(fileContext);

  const fileService = new FileService(new SocketIOFileWatcher());
  fileService.onFileEvents();

  return (
    <>
      {context.map((folder) => (
        <FileSystem folder={folder} />
      ))}
    </>
  );
}
