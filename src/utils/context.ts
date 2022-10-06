import React from "react";

import { IUploadedFile, IUploadedFilesFolder, FileTypes } from "./interfaces";


interface IContextProvider {
  uploadFile: (files: FileList | null) => void;
  openFile: (file: FileTypes) => void;
  downloadFile: (file: FileTypes | File) => void;
  changePath: (level: number) => void;
  openModalToDownload: (active: boolean, file?: FileTypes) => void;
  searchValue: (text: string) => void;
  openSearchPanel: (toggle: boolean) => void;
  filesObject: FileTypes | undefined;
  pathObjectsArray: IUploadedFilesFolder[];
  previewFile: FileTypes | undefined;
  searchArray: IUploadedFile[] | undefined;
  fileSelected: boolean;
  modalIsActive: boolean;
  searchPanelIsActive: boolean;
}

const Context = React.createContext<IContextProvider>({
  uploadFile: () => {},
  openFile: () => {},
  downloadFile: () => {},
  changePath: () => {},
  openModalToDownload: () => {},
  searchValue: () => {},
  openSearchPanel: () => {},
  filesObject: undefined,
  searchArray: [],
  pathObjectsArray: [],
  previewFile: undefined,
  modalIsActive: false,
  fileSelected: false,
  searchPanelIsActive: false
});

export default Context;
