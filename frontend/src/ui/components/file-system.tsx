import Folder from "../../domain/repositories/folder";
import FolderView from "./folder-view";

type Props = {
  folder: Folder;
};

export default function FileSystem(props: Props) {
  return (
    <section>
      <FolderView folder={props.folder} />
    </section>
  );
}
