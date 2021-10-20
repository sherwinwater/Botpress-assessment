import LocalFileRepo from "./data/local-file-repo";
import FileService from "./domain/services/file-service";

const fileService = new FileService(new LocalFileRepo());

const events = fileService.watchFolders(['~/.config']);

events.forEach(observer => observer.subscribe(event => console.log(event)));

setTimeout(() => {

}, 200000);