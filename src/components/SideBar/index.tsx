import React from "react";

import {SiteIcon} from "../"
import "./SideBar.scss";

type Props = {};

function SideBar({}: Props) {
  return (
    <div className="sidebar">
      <SiteIcon className="manager--header"></SiteIcon>
      <div className="sidebar--choice-file">
        <p>Выбрать новый файл</p>
      </div>
    </div>
  );
}

export default SideBar;
