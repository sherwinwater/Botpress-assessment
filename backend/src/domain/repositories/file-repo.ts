import { FileEvent } from "botpress-shared/lib/entities";
import { Observable } from "rxjs";

export default interface FileRepo {
  watchFolder(folderUri: string[]): Observable<FileEvent>;
}
