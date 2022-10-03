import { IUploadedFile } from "./interfaces";

export default function fileToObject<IUploadedFile>(file: FileList) {
  return {
    name: file[0].name,
    type: "file",
    info: file[0]
  }
}