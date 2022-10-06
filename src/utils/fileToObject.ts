import { IUploadedFile } from "./interfaces";

/**
 * Преобразует исходный файл в рабочий объект
 * 
 * 
 * @param file 
 * @returns object
 */

export default function fileToObject(file: FileList) {
  return {
    name: file[0].name,
    type: "file",
    priority: 2,
    info: file[0],
  } as IUploadedFile;
}
