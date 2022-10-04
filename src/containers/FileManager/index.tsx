import React, { useEffect, useState } from "react";
import _ from "lodash";

import { FileManager as FileManagerComponent } from "../../components";
import { fileListToStructObject, fileTobject } from "../../utils";
import { IUploadedFile, IUploadedFilesFolder } from "../../utils/interfaces";
import { Context } from "../../utils";

function FileManager() {
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<FileList>();
  const [filesObject, setFilesObject] = useState<
    IUploadedFilesFolder | IUploadedFile
  >();
  const [pathObjectsArray, setPathObjectsArray] = useState<
    IUploadedFilesFolder[]
  >([]);

  let defaultFolder;

  const uploadFile = (files: FileList | null) => {
    if (files && !_.isEqual(files, uploadFile)) {
      setUploadedFile(files);
      setFileSelected(true);
    }
  };

  const openFile = (file: IUploadedFilesFolder | IUploadedFile) => {
    if (file.type === "folder") {
      setPathObjectsArray([...pathObjectsArray, file]);
      setFilesObject(file);
    } else {
      console.log(file.info)
    }
  };

  const changePath = (level: number) => {
    const slicedArray = pathObjectsArray.slice(0, level+1)
    setPathObjectsArray(slicedArray)
    setFilesObject(slicedArray[slicedArray.length-1])
  };

  useEffect(() => {
    if (uploadedFile) {
      if (uploadedFile.length > 1) {
        fileListToStructObject(uploadedFile)
          .then((files) => {
            defaultFolder = files;
            setFilesObject(files);
            setPathObjectsArray([files]);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        defaultFolder = fileTobject(uploadedFile);
        setFilesObject(defaultFolder);
      }
    }
  }, [uploadedFile]);

  return (
    <Context.Provider
      value={{
        uploadFile,
        openFile,
        changePath,
        fileSelected,
        filesObject,
        pathObjectsArray,
      }}
    >
      <FileManagerComponent />
    </Context.Provider>
  );
}

export default FileManager;
