import File from "./file";

export default class Folder {
  constructor(
    public readonly name: string,
    public readonly folders: Map<string, Folder>,
    public readonly files: File[]
  ) {}

  private findDeepestFolder(folder: Folder, paths: string[]): Folder {
    if (paths.length === 0) {
      return folder;
    }

    const nextFolderName = paths.shift();
    if (!nextFolderName) {
      return folder;
    }

    const nextFolder = folder.folders.get(nextFolderName);
    if (!nextFolder) {
      return folder;
    }

    return this.findDeepestFolder(nextFolder, paths);
  }

  private createFolder(folderName: string, path: string[]): Folder {
    const newFolder = new Folder(folderName, new Map(), []);
    return path.reduceRight(
      (prev, name) => new Folder(name, new Map([[prev.name, prev]]), []),
      newFolder
    );
  }

  public removeFolder(paths: string[]) {
    const folderToRemove = paths.pop();
    if (!folderToRemove) return;

    const endFolderReference = this.findDeepestFolder(this, paths);
    endFolderReference.folders.delete(folderToRemove);
  }

  public addFolder(paths: string[]) {
    const newFolderName = paths.pop();
    if (!newFolderName) return;

    const folder = this.findDeepestFolder(this, paths);
    if (!folder) return;

    const newFolders = this.createFolder(newFolderName, paths);
    folder.folders.set(newFolderName, newFolders);
    return;
  }

  public removeFile(paths: string[]) {
    const fileToRemove = paths.pop();
    if (!fileToRemove) return;

    const folder = this.findDeepestFolder(this, paths);
    if (!folder) return;

    const folderIndex = folder.files.findIndex(
      (folder) => folder.name == fileToRemove
    );
    folder.files.splice(folderIndex, 1);
  }

  public addFile(paths: string[]) {
    const newFileName = paths.pop();
    if (!newFileName) return;

    const folder = this.findDeepestFolder(this, paths);
    if (!folder) return;

    const newFile = new File(newFileName);
    folder.files.push(newFile);
  }
}
