import React, { useContext } from "react";

import { IUploadedFile, IUploadedFilesFolder } from "../../utils/interfaces";
import { TableItem } from "..";
import "./FilesTable.scss";
import { Context } from "../../utils";

type Props = { filesObject: IUploadedFilesFolder | IUploadedFile | undefined };

function FilesTable({ filesObject }: Props) {
  const { pathObjectsArray, changePath } = useContext(Context);
  return (
    <div className="files--workspace">
      <div className="files--dirpath">
        {pathObjectsArray.map((item, key) => (
          <div key={key} className="files--dirpath--wrapper">
            <p className="files--dirpath--text" onClick={() => changePath(key)}>{item.name}</p>
            <p className="files--dirpath--delimiter">{">"}</p>
          </div>
        ))}
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
          <TableItem filesObject={filesObject} />
        </table>
      </div>
    </div>
  );
}

export default FilesTable;
