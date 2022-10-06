import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";

import { FileManager as FileManagerComponent } from "../../components";
import { fileListToStructObject, fileTobject, makeSearchArray } from "../../utils";
import { IUploadedFilesFolder, FileTypes, IUploadedFile } from "../../utils/interfaces";
import { Context } from "../../utils";

type Props = { fileFromSideBar: FileList | undefined };

function FileManager({ fileFromSideBar }: Props) {
  const [fileSelected, setFileSelected] = useState(false);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [searchPanelIsActive, setSearchPanelIsActive] = useState(false)

  const [uploadedFile, setUploadedFile] = useState<FileList>();
  const [searchArray, setSearchArray] = useState<IUploadedFile[]>()
  const [filesObject, setFilesObject] = useState<FileTypes>();
  const [previewFile, setPreviewFile] = useState<FileTypes>();
  const [pathObjectsArray, setPathObjectsArray] = useState<
    IUploadedFilesFolder[]
  >([]);

  const defaultFolder = useRef<FileTypes>();

  const uploadFile = (files: FileList | null) => {
    if (files && !_.isEqual(files, uploadedFile)) {
      setUploadedFile(files);
      setFileSelected(true);
    }
  };

  const downloadFile = (file: FileTypes | File) => {
    const data = new Blob(
      [
        JSON.stringify(file, [
          "name",
          "type",
          "info",
          "inner",
          "lastModified",
          "size",
          "webkitRelativePath",
        ]),
      ],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(data);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${file.name}.json`;
    document.body.append(anchor);
    anchor.style.display = "none";
    anchor.click();
    anchor.remove();
  };

  const openFile = (file: FileTypes) => {
    if (file.type === "folder") {
      setPathObjectsArray([...pathObjectsArray, file]);
      setFilesObject(file);
    } else {
      setModalIsActive(true);
      setPreviewFile(file);
    }
  };

  const openModalToDownload = (active: boolean, file?: FileTypes) => {
    setModalIsActive(active);
    if (file) {
      setPreviewFile(file);
    }
  };

  const openSearchPanel = (toogle: boolean) => {
    setSearchPanelIsActive(toogle)
  }

  const changePath = (level: number) => {
    const slicedArray = pathObjectsArray.slice(0, level + 1);
    setPathObjectsArray(slicedArray);
    setFilesObject(slicedArray[slicedArray.length - 1]);
  };

  const searchValue = (text: string) => {
    if (uploadedFile && text) {
      makeSearchArray(uploadedFile, text).then((result) => {
        setSearchArray(result)
      })
    } else {
      setSearchArray([])
    }
  };

  useEffect(() => {
    if (fileFromSideBar) {
      setUploadedFile(fileFromSideBar);
      setFileSelected(true);
    }
    if (uploadedFile) {
      if (uploadedFile.length > 1) {
        fileListToStructObject(uploadedFile)
          .then((files) => {
            defaultFolder.current = files;
            setFilesObject({ ...files });
            setPathObjectsArray([files]);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (uploadedFile) {
        defaultFolder.current = fileTobject(uploadedFile);
        setFilesObject(defaultFolder.current);
      }
    }
  }, [uploadedFile, fileFromSideBar]);

  return (
    <Context.Provider
      value={{
        uploadFile,
        openFile,
        changePath,
        openModalToDownload,
        downloadFile,
        searchValue,
        openSearchPanel,
        searchArray,
        fileSelected,
        filesObject,
        pathObjectsArray,
        modalIsActive,
        previewFile,
        searchPanelIsActive,
      }}
    >
      <FileManagerComponent />
    </Context.Provider>
  );
}

export default FileManager;