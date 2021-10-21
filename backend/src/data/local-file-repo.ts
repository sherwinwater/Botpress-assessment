import { Observable } from "rxjs";
import { FileEvent, FileEvents } from "botpress-shared/lib/entities";
import FileRepo from "../domain/repositories/file-repo";
import chokidar from "chokidar";

export default class LocalFileRepo implements FileRepo {
  public watchFolder(folderUris: string[]): Observable<FileEvent> {
    return new Observable((sub) => {
      const fileWatcher = chokidar.watch(folderUris);

      fileWatcher.on("add", (path) =>
        sub.next(new FileEvent(FileEvents.created, path))
      );
      fileWatcher.on("unlink", (path) =>
        sub.next(new FileEvent(FileEvents.deleted, path))
      );
      fileWatcher.on("addDir", (path) =>
        sub.next(new FileEvent(FileEvents.dirCreated, path))
      );
      fileWatcher.on("unlinkDir", (path) =>
        sub.next(new FileEvent(FileEvents.dirRemoved, path))
      );
    });
  }
}
