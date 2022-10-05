import React from "react";

import { IUploadedFile, IUploadedFilesFolder, FileTypes } from "./interfaces";


interface IContextProvider {
  uploadFile: (files: FileList | null) => void;
  openFile: (file: FileTypes) => void;
  downloadFile: (file: FileTypes | File) => void;
  changePath: (level: number) => void;
  openModalToDownload: (active: boolean, file?: FileTypes) => void;
  searchValue: (text: string) => void;
  filesObject: FileTypes | undefined;
  pathObjectsArray: IUploadedFilesFolder[];
  previewFile: FileTypes | undefined;
  fileSelected: boolean;
  modalIsActive: boolean;
}

const Context = React.createContext<IContextProvider>({
  uploadFile: () => {},
  openFile: () => {},
  downloadFile: () => {},
  changePath: () => {},
  openModalToDownload: () => {},
  searchValue: () => {},
  filesObject: undefined,
  pathObjectsArray: [],
  previewFile: undefined,
  modalIsActive: false,
  fileSelected: false,
});

export default Context;
