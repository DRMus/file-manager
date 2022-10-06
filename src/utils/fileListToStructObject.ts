import { IUploadedFilesFolder, IUploadedFile, IInnerArray } from "./interfaces";
import _ from "lodash";

/**
 * Преобразует поступивший файл в удобный для работы объект в котором:
 * {name: string [имя файла],
 * type: "folder" | "file" [тип файла],
 * priority: number [приоритет (используется для отображения директорий выше файлов)],
 * info | inner: {} [содержание файла (директории)]}
 *
 *
 * @param constObject
 * @param file
 * @param pathArray
 * @param iterator
 */

function fileListToStructObject(
  constObject: IInnerArray,
  file: File,
  pathArray: string[],
  iterator = 1
) {
  const foundFolder = constObject.find(
    (item) => item.name === pathArray[iterator]
  ) as IUploadedFilesFolder;

  if (foundFolder) {
    if (pathArray.length - iterator > 2) {
      fileListToStructObject(foundFolder.inner, file, pathArray, iterator + 1);
    } else {
      const fileObject: IUploadedFile = {
        name: pathArray[iterator + 1],
        type: "file",
        priority: 2,
        info: file,
      };
      foundFolder.inner.push(fileObject);
    }
  } else {
    const folderObject: IUploadedFilesFolder = {
      name: pathArray[iterator],
      type: "folder",
      priority: 1,
      inner: [],
    };
    constObject.push(folderObject);
    fileListToStructObject(constObject, file, pathArray, iterator);
  }
}

/**
 * Сортирует массив по приоритету
 *
 * @param constObject
 * @returns object
 */

function folderSorter(constObject: IInnerArray) {
  constObject = _.orderBy(constObject, ["priority"], ["asc"]);
  constObject.map((item) => {
    if (item.type === "folder") {
      item.inner = folderSorter(item.inner);
    }
    return item;
  });
  return constObject;
}

/**
 * Создает удобный для работы объект (см. внутренний fileListToStructObject())
 *
 * @param files
 * @returns Promise
 */

const exp = (files: FileList) => {
  return new Promise<IUploadedFilesFolder>((resolve, reject) => {
    if (files) {
      const uploadedFilesObject: IUploadedFilesFolder = {
        name: files[0].webkitRelativePath.split("/")[0],
        type: "folder",
        priority: 1,
        inner: [],
      };

      for (let i = 0; i < files.length; i++) {
        const filePathArray = files[i].webkitRelativePath.split("/");

        if (filePathArray.length > 2) {
          fileListToStructObject(
            uploadedFilesObject.inner,
            files[i],
            filePathArray
          );
        } else {
          const fileObject: IUploadedFile = {
            name: filePathArray[1],
            type: "file",
            priority: 2,
            info: files[i],
          };
          uploadedFilesObject.inner.push(fileObject);
          uploadedFilesObject.inner = _.sortBy(
            uploadedFilesObject.inner,
            "priority"
          );
        }
      }
      uploadedFilesObject.inner = folderSorter(uploadedFilesObject.inner);
      resolve(uploadedFilesObject);
    } else {
      reject("Empty FileList");
    }
  });
};

export default exp;
