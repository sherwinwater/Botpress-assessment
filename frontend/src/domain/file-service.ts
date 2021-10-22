import { FileEvents } from "botpress-shared/lib/entities";
import { Observable, Subject } from "rxjs";
import FileWatcherEndpoint from "./repositories/file-watcher-endpoint";
import Folder from "./repositories/folder";

export default class FileService {
  private folders: Folder[] = [];

  constructor(private fileWatcher: FileWatcherEndpoint) {}

  public onFileEvents(): Observable<Folder[]> {
    const newFoldersStream = new Subject<Folder[]>();

    this.fileWatcher.onFileEvent().subscribe((event) => {
      const paths = event.path.split("/");
      const rootFolder = paths.shift();
      // if rootFolder is undefined it's because the array was empty and
      // an invalid path was given
      if (rootFolder === undefined) {
        return;
      }

      let modifiedFolder = this.folders.find(
        (folder) => folder.name === rootFolder
      );
      if (!modifiedFolder) {
        if (event.event === FileEvents.dirCreated && paths.length === 0) {
          this.folders = [
            ...this.folders,
            new Folder(rootFolder, new Map(), []),
          ];
          newFoldersStream.next(this.folders);
          return;
        }

        if (event.event === FileEvents.created) {
          modifiedFolder = new Folder(rootFolder, new Map(), []);
        } else {
          return;
        }
      }

      switch (event.event) {
        case FileEvents.dirCreated:
          modifiedFolder.addFolder(paths);
          break;
        case FileEvents.dirRemoved:
          modifiedFolder.removeFolder(paths);
          break;
      }

      const filteredFolders = this.folders.filter(
        (folder) => folder.name !== modifiedFolder!.name
      );
      this.folders = [...filteredFolders, modifiedFolder];
      newFoldersStream.next(this.folders);
    });

    return newFoldersStream.asObservable();
  }
}
