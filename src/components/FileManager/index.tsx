import React, { useEffect, useState } from "react";

import { FilesTable, SearchPanel, EmptyFileList } from "../";
import "./FileManager.scss";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

type Props = {};
interface IUploadedFilesFolder {
  name: string;
  type: string;
  inner: Array<IUploadedFilesFolder | IUploadedFile>;
}
interface IUploadedFile {
  name: string;
  type: string;
  info: File;
}


// TODO: Доработать структуризацию файлов

function fileListToStructObject(
  constObject: Array<IUploadedFilesFolder | IUploadedFile>,
  file: File,
  pathArray: string[],
  iterator = 1,
) {
  const foundFolder = constObject.find(
    (item) => item.name == pathArray[iterator]
  );

  if (foundFolder) {
    if (pathArray.length - iterator > 2) {
      const tempFolder = foundFolder as IUploadedFilesFolder;
      fileListToStructObject(tempFolder.inner, file, pathArray, iterator + 1);
    } else {
      const fileObject: IUploadedFile = {
        name: pathArray[iterator+1],
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
    constObject.push(folderObject)
    fileListToStructObject(constObject, file, pathArray)
  }
}

function FileManager({}: Props) {
  const [fileSelected, setFileSelected] = useState(false);
  // const [uploadedFile, setUploadedFile] = useState(null);

  const uploadFile = (files: FileList | null) => {
    if (files) {
      const uploadedFilesObject: IUploadedFilesFolder = {
        name: files[0].webkitRelativePath.split("/")[0],
        type: "folder",
        inner: [],
      };

      for (let i = 0; i < files.length; i++) {
        const filePathArray = files[i].webkitRelativePath.split("/");

        if (filePathArray.length > 2) {
          fileListToStructObject(uploadedFilesObject.inner, files[i], filePathArray);
        } else {
          const fileObject: IUploadedFile = {
            name: filePathArray[1],
            type: "file",
            info: files[i],
          };
          uploadedFilesObject.inner.push(fileObject);
        }
      }
      console.log(uploadedFilesObject);
    }
  };

  // useEffect(() => {
  //   console.log(uploadedFile)
  // }, [uploadedFile]);
  return (
    <div className="files--content">
      <SearchPanel className="manager--header" />
      <div className="files--content--table">
        {fileSelected ? (
          <FilesTable />
        ) : (
          <div className="files--content--empty">
            <EmptyFileList uploadFile={uploadFile} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FileManager;
