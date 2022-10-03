import React, { useEffect, useState } from "react";
import _ from "lodash";

import { FilesTable, SearchPanel, EmptyFileList } from "../";
import { fileListToStructObject, fileOTobject } from "../../utils";
import { IUploadedFile, IUploadedFilesFolder } from "../../utils/interfaces";
import "./FileManager.scss";

type Props = {};

function FileManager({}: Props) {
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<FileList>();
  const [filesObject, setFilesObject] = useState<
    IUploadedFilesFolder | IUploadedFile
  >();

  const uploadFile = (files: FileList | null) => {
    if (files && !_.isEqual(files, uploadFile)) {
      setUploadedFile(files);
      setFileSelected(true);
    }
  };
  useEffect(() => {
    if (uploadedFile) {
      if (uploadedFile.length > 1) {
        fileListToStructObject(uploadedFile)
          .then((files) => {
            setFilesObject(files);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setFilesObject(fileOTobject(uploadedFile));
      }
    }

    console.log(filesObject)
  }, [uploadedFile]);
  return (
    <div className="files--content">
      <SearchPanel className="manager--header" />
      <div className="files--content--table">
        {fileSelected ? (
          <FilesTable filesObject={filesObject}/>
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
