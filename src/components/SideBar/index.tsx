import React from "react";

import { SiteIcon } from "../";
import "./SideBar.scss";

type Props = { uploadFile: (file: FileList | null) => void };

function SideBar({ uploadFile }: Props) {
  return (
    <div className="sidebar">
      <SiteIcon className="manager--header"></SiteIcon>
      <div className="sidebar--choice-file">
        <label>
          Выбрать новый файл
          <input
            hidden
            type="file"
            directory=""
            webkitdirectory=""
            onChange={(info) => uploadFile(info.target.files)}
          />
        </label>
      </div>
    </div>
  );
}

export default SideBar;
