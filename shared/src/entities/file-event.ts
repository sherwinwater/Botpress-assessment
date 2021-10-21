import { FileEvents } from "./file-events";

export default class FileEvent {
	constructor(
		public readonly event: FileEvents,
		public readonly path: string,
	) {}
}