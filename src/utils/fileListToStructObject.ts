import { IUploadedFilesFolder, IUploadedFile, IInnerArray } from "./interfaces";

function fileListToStructObject(
  constObject: IInnerArray,
  file: File,
  pathArray: string[],
  iterator = 1
) {
  const foundFolder = constObject.find(
    (item) => item.name === pathArray[iterator]
  );

  if (foundFolder) {
    if (pathArray.length - iterator > 2) {
      const tempFolder = foundFolder as IUploadedFilesFolder;
      fileListToStructObject(tempFolder.inner, file, pathArray, iterator + 1);
    } else {
      const fileObject: IUploadedFile = {
        name: pathArray[iterator + 1],
        type: "file",
        info: file,
      };
      const tempFolder = foundFolder as IUploadedFilesFolder;
      tempFolder.inner.push(fileObject);
    }
  } else {
    const folderObject: IUploadedFilesFolder = {
      name: pathArray[iterator],
      type: "folder",
      inner: [],
    };
    constObject.push(folderObject);
    fileListToStructObject(constObject, file, pathArray, iterator);
  }
}

export default (files: FileList) => {
  return new Promise<IUploadedFilesFolder>((resolve, reject) => {
    if (files) {
      const uploadedFilesObject: IUploadedFilesFolder = {
        name: files[0].webkitRelativePath.split("/")[0],
        type: "folder",
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
            info: files[i],
          };
          uploadedFilesObject.inner.push(fileObject);
        }
      }
      resolve(uploadedFilesObject);
    } else {
      reject("Empty FileList");
    }
  });
};
