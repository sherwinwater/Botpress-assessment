import { Observable } from "rxjs";
import io from "socket.io-client";
import { FileEvent } from "botpress-shared/lib/entities";

export default class SocketIOFileWatcher {
  constructor() {}

  watchFileChanges(): Observable<FileEvent> {
    return new Observable((sub) => {
      const socket = io("localhost:3000");

      socket.on("event", (event) => {
        console.log(event);
      });
    });
  }
}
