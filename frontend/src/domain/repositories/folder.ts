import File from "./file";

export default class Folder {
  constructor(
    public readonly name: string,
    public readonly folders: Map<string, Folder>,
    public readonly files: File[]
  ) {}

  private findDeepestFolder(folder: Folder, paths: string[]): Folder {
    const tmpFolder = folder.folders.get(paths[0]);

    if (tmpFolder === undefined) {
      return folder;
    }

    if (paths.length === 1) {
      return tmpFolder;
    }
    return this.findDeepestFolder(tmpFolder, paths.slice(1));
  }

  private getPathNames(path: string): string[] {
    return path.split("/");
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

    const folder = this.folders.get(paths[0]);
    if (!folder) {
      throw new Error("Invalid Path");
    }

    const endFolderReference = this.findDeepestFolder(folder, paths);
    endFolderReference.folders.delete(folderToRemove!);
  }

  public addFolder(path: string[]) {
    if (path.length < 1) {
      return;
    }

    const nextFolderName = path.shift()!;
    const folder = this.folders.get(nextFolderName);

    if (folder === undefined) {
      const newFolderName = path.pop();
      let folderMap = new Map<string, Folder>();

      if (newFolderName !== undefined) {
        const newFolders = this.createFolder(newFolderName, path);
        folderMap.set(newFolderName, newFolders);
      }

      this.folders.set(
        nextFolderName,
        new Folder(nextFolderName, folderMap, [])
      );
      return;
    }

    folder.addFolder(path);
  }
}
