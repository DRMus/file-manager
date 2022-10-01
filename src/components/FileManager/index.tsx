import React, { useEffect, useState } from "react";
import { Empty, Button, Upload } from "antd";
import _ from "lodash";

import { FilesTable, SearchPanel } from "../";
import "./FileManager.scss";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string; // remember to make these attributes optional....
    webkitdirectory?: string;
  }
}

type Props = {};

function FileManager({}: Props) {
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const uploadFile = (files: FileList | null) => {
    console.log(files);
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
            <Empty
              description={
                <span className="empty--description">Файл не выбран</span>
              }
            >

              {/* TODO: Доработать добавление файла */}
              <label className="empty--upload-file">
                Выберите папку
                <input
                  hidden
                  type="file"
                  directory=""
                  webkitdirectory=""
                  onChange={(info) => uploadFile(info.target.files)}
                />
              </label>
            </Empty>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileManager;
