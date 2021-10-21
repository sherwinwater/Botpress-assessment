import File from "../../domain/repositories/file";

type Props = {
  file: File;
};

export default function FileView({ file }: Props) {
  return <p>{file.name}</p>;
}
