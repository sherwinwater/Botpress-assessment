import { useEffect, useState } from "react";
import SocketIOFileWatcher from "../../api/socketio-file-watcher";
import FileService from "../../domain/file-service";
import Folder from "../../domain/entities/folder";

export default function useFileChange() {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fileService = new FileService(new SocketIOFileWatcher());
    fileService.onFileEvents().subscribe((newFolderStructure) => {
      setFolders(newFolderStructure);
    });
  }, []);

  return folders;
}
