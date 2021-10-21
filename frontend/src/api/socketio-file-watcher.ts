import { Observable } from "rxjs";
import io from "socket.io-client";
import { FileEvent } from "botpress-shared/lib/entities";
import FileWatcherEndpoint from "../domain/repositories/file-watcher-endpoint";

export default class SocketIOFileWatcher implements FileWatcherEndpoint {
  constructor() {}

  onFileEvent(): Observable<FileEvent> {
    return new Observable((sub) => {
      const socket = io("localhost:3000");

      socket.on("file-event", (event) => {
        sub.next(event);
      });
    });
  }
}
