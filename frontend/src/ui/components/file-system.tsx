import Folder from "../../domain/entities/folder";
import FolderView from "./folder-view";
import "./file-system.css";

type Props = {
  folders: Folder[];
};

export default function FileSystem(props: Props) {
  return (
    <section className="fileSystemContainer">
      {props.folders.map((folder) => (
        <section className="fileSystem">
          <FolderView folder={folder} />
        </section>
      ))}
    </section>
  );
}
