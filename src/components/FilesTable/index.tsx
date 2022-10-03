import React from "react";

import { IUploadedFile, IUploadedFilesFolder } from "../../utils/interfaces";
import { TableItem } from "..";
import "./FilesTable.scss";

type Props = { filesObject: IUploadedFilesFolder | IUploadedFile | undefined };


// TODO: Сделать dirpath, доработать отображение файлов

function FilesTable({filesObject}: Props) {
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
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Автор</th>
              <th scope="col">Дата создания</th>
              <th scope="col">Размер</th>
            </tr>
          </thead>
          <TableItem filesObject={filesObject}/>
        </table>
      </div>
    </div>
  );
}

export default FilesTable;
