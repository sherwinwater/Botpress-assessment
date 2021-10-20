import FileEvent from "../entities/file-event";
import {Observable} from 'rxjs';

export default interface FileRepo {
	watchFolder(folderUri: string): Observable<FileEvent>;
}