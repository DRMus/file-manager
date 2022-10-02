import React from "react";
import { Empty } from "antd";

import "./EmptyFileList.scss";

type Props = {
  uploadFile: (files: FileList | null) => void;
};

function EmptyFileList({ uploadFile }: Props) {
  return (
    <Empty
      description={<span className="empty--description">Файл не выбран</span>}
    >
      <div className="empty--upload">
        <label className="empty--upload-file">
          Выбрать файл
          <input
            hidden
            type="file"
            onChange={(info) => uploadFile(info.target.files)}
          />
        </label>
        <label className="empty--upload-file">
          Выбрать папку
          <input
            hidden
            type="file"
            directory=""
            webkitdirectory=""
            onChange={(info) => uploadFile(info.target.files)}
          />
        </label>
      </div>
    </Empty>
  );
}

export default EmptyFileList;
