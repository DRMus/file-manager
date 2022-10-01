import React from "react";

import IconFileManager from "../../img/svg/Icon.svg";
import "./SiteIcon.scss";

type Props = { className: string };

const SiteIcon = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className="sidebar--header">
        <img
          src={IconFileManager}
          alt="Header Icon"
          className="sidebar--header--icon"
        />
        <h2 className="sidebar--header--name">File Manager</h2>
      </div>
    </div>
  );
};

export default SiteIcon;
