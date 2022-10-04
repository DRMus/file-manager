import React from "react";

import { IUploadedFile, IUploadedFilesFolder } from "./interfaces";

interface IContextProvider {
  uploadFile: (files: FileList | null) => void;
  openFile: (file: IUploadedFilesFolder | IUploadedFile) => void;
  changePath: (level: number) => void;
  fileSelected: boolean;
  filesObject: IUploadedFilesFolder | IUploadedFile | undefined;
  pathObjectsArray: IUploadedFilesFolder[];
}

const Context = React.createContext<IContextProvider>({
  uploadFile: () => {},
  openFile: () => {},
  changePath: () => {},
  fileSelected: false,
  filesObject: undefined,
  pathObjectsArray: []
});

export default Context;
