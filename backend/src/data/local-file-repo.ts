import { Observable } from "rxjs";
import FileEvent from "../domain/entities/file-event";
import FileRepo from "../domain/repositories/file-repo";
import * as fs from 'fs';
import { FileEvents } from "../domain/entities/file-events";

export default class LocalFileRepo implements FileRepo {
	public watchFolder(folderUri: string): Observable<FileEvent> {
		return new Observable((subscriber) => {
			fs.watch(folderUri, {persistent: true}, (event, fileName) => {
				console.log(event, fileName);

				subscriber.next(new FileEvent(
					FileEvents.modified,
					"/test",
					"testing"
				));
			});
		});
	}
}