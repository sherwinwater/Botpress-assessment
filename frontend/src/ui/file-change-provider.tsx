import FileSystem from "./components/file-system";
import useFileChange from "./hooks/file-change";

export default function FileChangeProvider() {
  const folders = useFileChange();

  return (
    <>
      {folders.map((folder) => (
        <FileSystem folder={folder} key={folder.name} />
      ))}
    </>
  );
}
