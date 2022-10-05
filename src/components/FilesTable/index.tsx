import React, { useContext } from "react";

import { FileTypes } from "../../utils/interfaces";
import { TableItem, ModalWindow } from "..";
import "./FilesTable.scss";
import { Context } from "../../utils";

type Props = { filesObject: FileTypes | undefined };

function FilesTable({ filesObject }: Props) {
  const {
    changePath,
    openModalToDownload,
    downloadFile,
    pathObjectsArray,
    previewFile,
    modalIsActive,
  } = useContext(Context);
  return (
    <div className="files--workspace">
      <div className="files--dirpath">
        {pathObjectsArray.map((item, key) => (
          <div key={key} className="files--dirpath--wrapper">
            <p className="files--dirpath--text" onClick={() => changePath(key)}>
              {item.name}
            </p>
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
      <div className="files--footer">
        <button
          className="files--footer--btn--download"
          onClick={() => openModalToDownload(true, filesObject as FileTypes)}
        >
          Скачать
        </button>
      </div>
      {previewFile && (
        <ModalWindow
          file={previewFile}
          modalIsActive={modalIsActive}
          openModalToDownload={openModalToDownload}
          downloadFile={downloadFile}
        ></ModalWindow>
      )}
    </div>
  );
}

export default FilesTable;
