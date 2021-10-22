import * as path from "path";
import { FileEvent } from "botpress-shared/lib/entities";
import { Observable } from "rxjs";
import FileRepo from "../repositories/file-repo";

export default class FileService {
  private fileEventStream?: Observable<FileEvent>;
  private paths: string[];

  constructor(folderPaths: string[], private fileRepo: FileRepo) {
    this.paths = folderPaths.map((p) => path.resolve(path.normalize(p)));
  }

  public watchFolders(): Observable<FileEvent> {
    if (this.fileEventStream === undefined) {
      this.fileEventStream = this.fileRepo.watchFolder(this.paths);
    }

    return this.fileEventStream;
  }
}
