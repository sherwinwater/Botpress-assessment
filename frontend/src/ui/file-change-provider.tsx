import FileSystem from "./components/file-system";
import useFileChange from "./hooks/file-change";

export default function FileChangeProvider() {
  const folders = useFileChange();

  return <FileSystem folders={folders} />;
}
