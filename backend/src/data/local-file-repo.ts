import { Observable } from "rxjs";
import { FileEvent, FileEvents } from "botpress-shared/lib/entities";
import FileRepo from "../domain/repositories/file-repo";
import chokidar from "chokidar";

export default class LocalFileRepo implements FileRepo {
  private getWatchedRoot(watchedUris: string[], changedPath: string): string {
    const changedRootIndex = watchedUris.findIndex((uri) =>
      changedPath.startsWith(uri)
    );
    if (changedRootIndex === -1) {
      throw new Error("unexpected file change");
    }

    const changeRoot = watchedUris[changedRootIndex].split("/").reverse()[0];
    const relativePath = changedPath.replace(
      watchedUris[changedRootIndex],
      `[${changedRootIndex}] ${changeRoot}`
    );

    console.log(relativePath);
    return relativePath;
  }

  public watchFolder(folderUris: []): Observable<FileEvent> {
    return new Observable((sub) => {
      const fileWatcher = chokidar.watch(folderUris);

      fileWatcher.on("add", (path) =>
        sub.next(
          new FileEvent(
            FileEvents.created,
            this.getWatchedRoot(folderUris, path)
          )
        )
      );
      fileWatcher.on("unlink", (path) =>
        sub.next(
          new FileEvent(
            FileEvents.deleted,
            this.getWatchedRoot(folderUris, path)
          )
        )
      );
      fileWatcher.on("addDir", (path) =>
        sub.next(
          new FileEvent(
            FileEvents.dirCreated,
            this.getWatchedRoot(folderUris, path)
          )
        )
      );
      fileWatcher.on("unlinkDir", (path) =>
        sub.next(
          new FileEvent(
            FileEvents.dirRemoved,
            this.getWatchedRoot(folderUris, path)
          )
        )
      );
    });
  }
}
