import React, { useContext } from "react";

import { FilesTable, SearchPanel, EmptyFileList } from "../";
import { Context } from "../../utils";

import "./FileManager.scss";

function FileManager() {
  const { uploadFile, fileSelected, filesObject } = useContext(Context);

  return (
    <div className="files--content">
      <SearchPanel className="manager--header" />
      <div className="files--content--table">
        {fileSelected ? (
          <FilesTable filesObject={filesObject} />
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
