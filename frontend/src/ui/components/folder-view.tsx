import { useState } from "react";
import Folder from "../../domain/repositories/folder";
import FileView from "./file-view";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import "./folder-view.css";

type Props = {
  folder: Folder;
};

export default function FolderView({ folder }: Props) {
  const [opened, setOpen] = useState(false);

  return (
    <div>
      <p onClick={() => setOpen(!opened)}>
        <span className="folderIcon">
          {opened ? <FaFolderOpen /> : <FaFolder />}
        </span>
        {folder.name}
      </p>
      <section hidden={!opened} className="folderContent">
        {Array.from(folder.folders).map(([_, folder]) => (
          <FolderView folder={folder} key={folder.name} />
        ))}

        {folder.files.map((file) => (
          <FileView file={file} key={file.name} />
        ))}
      </section>
    </div>
  );
}
