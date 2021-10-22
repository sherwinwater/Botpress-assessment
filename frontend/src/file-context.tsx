import { createContext } from "react";
import Folder from "./domain/repositories/folder";

export const defaultValues = {
  folders: [] as Array<Folder>,
  setFolders(folders: Array<Folder>) {
    this.folders = folders;
  },
};

export const fileContext = createContext(defaultValues);
