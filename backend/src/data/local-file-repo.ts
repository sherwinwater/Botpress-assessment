import { Observable } from "rxjs";
import FileEvent from "../domain/entities/file-event";
import FileRepo from "../domain/repositories/file-repo";
import chokidar from 'chokidar';
import { FileEvents } from "../domain/entities/file-events";

export default class LocalFileRepo implements FileRepo {
	public watchFolder(folderUri: string): Observable<FileEvent> {
		return new Observable((sub) => {
			const fileWatcher = chokidar.watch(folderUri);

			fileWatcher.on("add", (path) => sub.next(new FileEvent(FileEvents.created, path)));
			fileWatcher.on("unlink", (path) => sub.next(new FileEvent(FileEvents.deleted, path)));
			fileWatcher.on("addDir", (path) => sub.next(new FileEvent(FileEvents.dirCreated, path)));
			fileWatcher.on("unlinkDir", (path) => sub.next(new FileEvent(FileEvents.dirRemoved, path)));
		});
	}
}