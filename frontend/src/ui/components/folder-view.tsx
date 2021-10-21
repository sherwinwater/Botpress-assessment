import Folder from "../../domain/repositories/folder";
import FileView from "./file-view";

type Props = {
  folder: Folder;
};

export default function FolderView({ folder }: Props) {
  return (
    <div>
      {folder.folders.map((folder) => (
        <FolderView folder={folder} />
      ))}

      {folder.files.map((file) => (
        <FileView file={file} />
      ))}
    </div>
  );
}
