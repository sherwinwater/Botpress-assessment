import File from "./file";

export default class Folder {
  constructor(
    public readonly name: string,
    public readonly folders: Folder[],
    public readonly files: File[]
  ) {}
}
