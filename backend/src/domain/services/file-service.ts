import { FileEvent } from "botpress-shared/lib/entities";
import {Observable} from 'rxjs';
import FileRepo from "../repositories/file-repo";

export default class FileService {
	constructor(private fileRepo: FileRepo) {}

	public watchFolders(folderNames: string[]): Observable<FileEvent>[] {
		return folderNames.map((folder) => this.fileRepo.watchFolder(folder));
	}
}