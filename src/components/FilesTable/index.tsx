import React from "react";

import FolderIcon from "../../img/svg/Folder.svg";
import "./FilesTable.scss";

type Props = {};

function FilesTable({}: Props) {
  return (
    <div className="files--workspace">
      <div className="files--dirpath">
        <p className="files--dirpath--text">My Folder</p>
        <p className="files--dirpath--delimiter">{">"}</p>
        <p className="files--dirpath--text">New Folder</p>
      </div>
      <div className="files-table">
        <table>
          <thead>
            <th>Название</th>
            <th>Автор</th>
            <th>Дата создания</th>
            <th>Размер</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={FolderIcon} alt="" />
                <p>My Folder</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FilesTable;
