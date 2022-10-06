import React from "react";
import classnames from "classnames";

import { FileTypes } from "../../utils/interfaces";
import "./ModalWindow.scss";

type Props = {
  modalIsActive: boolean;
  file: FileTypes;
  openModalToDownload: (active: boolean) => void;
  downloadFile: (file: FileTypes | File) => void
};

function ModalWindow({ modalIsActive, file, openModalToDownload, downloadFile }: Props) {
  return (
    <>
      {modalIsActive ? (
        <div
          className={classnames("modal--window", {
            "modal--active": modalIsActive,
          })}
          onClick={() => openModalToDownload(false)}
        >
          <div
            className="modal--window--content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal--window--header">
              <h2>Выгрузка файла {file.name}</h2>
            </div>

            <div className="modal--window--body">
              <pre>{JSON.stringify(file, ["name", "type", "info", "inner", "lastModified", "size", "webkitRelativePath"], 2)}</pre>
            </div>

            <div className="modal--window--footer">
              <button className="modal--btn cancel" onClick={() => openModalToDownload(false)}>Отмена</button>
              <button className="modal--btn submit" onClick={() => downloadFile(file)}>Скачать</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ModalWindow;
