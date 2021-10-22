import {Observable} from 'rxjs';
import {FileEvent} from 'botpress-shared/lib/entities'

export default interface FileWatcherEndpoint {
	onFileEvent(): Observable<FileEvent>;
}