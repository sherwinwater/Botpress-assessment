import FileWatcherEndpoint from "./repositories/file-watcher-endpoint";

export default class FileService {
	constructor(private fileWatcher: FileWatcherEndpoint) {}

	public onFileEvents() {
		this.fileWatcher.onFileEvent().subscribe(event => {
			console.log(event.event);
		})
	}
}