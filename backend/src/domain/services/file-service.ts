import { FileEvent } from "botpress-shared/lib/entities";
import { Observable } from "rxjs";
import FileRepo from "../repositories/file-repo";

export default class FileService {
  private fileEventStream?: Observable<FileEvent>;

  constructor(private folderPaths: string[], private fileRepo: FileRepo) {}

  public watchFolders(): Observable<FileEvent> {
    if (this.fileEventStream === undefined) {
      this.fileEventStream = this.fileRepo.watchFolder(this.folderPaths);
    }

    return this.fileEventStream;
  }
}
