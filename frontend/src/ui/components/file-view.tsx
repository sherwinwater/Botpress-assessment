import File from "../../domain/entities/file";
import { FaFile } from "react-icons/fa";
import "./file-view.css";

type Props = {
  file: File;
};

export default function FileView({ file }: Props) {
  return (
    <div className="file">
      <FaFile /> {file.name}
    </div>
  );
}
