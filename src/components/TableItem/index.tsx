import React, { useContext } from "react";
import { FileOutlined } from "@ant-design/icons";

import FolderIcon from "../../img/svg/Folder.svg";
import { IUploadedFile, IUploadedFilesFolder } from "../../utils/interfaces";
import { Context, convertUnixToDate, formatBytes } from "../../utils";
import "./TableItem.scss";

type Props = { filesObject: IUploadedFilesFolder | IUploadedFile | undefined };

function TableItem({ filesObject }: Props) {
  const folderFilesObject = filesObject as IUploadedFilesFolder;
  const oneFileObject = filesObject as IUploadedFile;
  const { openFile } = useContext(Context);
  return (
    <tbody>
      {filesObject ? (
        filesObject.type === "folder" ? (
          folderFilesObject.inner.map((item, key) => (
            <tr key={key} onClick={() => openFile(item)}>
              <td className="table--row-header">
                {item.type === "folder" ? (
                  <img src={FolderIcon} alt="" />
                ) : (
                  <FileOutlined className="file-icon" />
                )}
                <p>{item.name}</p>
              </td>
              <td>User</td>
              <td>
                {"info" in item
                  ? convertUnixToDate(item.info.lastModified)
                  : "-"}
              </td>
              <td>{"info" in item ? formatBytes(item.info.size) : "-"}</td>
            </tr>
          ))
        ) : (
          <tr onClick={() => openFile(oneFileObject)}>
            <td className="table--row-header">
              <FileOutlined className="file-icon" />
              <p>{oneFileObject.name}</p>
            </td>
            <td>User</td>
            <td>{convertUnixToDate(oneFileObject.info.lastModified)}</td>
            <td>{oneFileObject.info.size}</td>
          </tr>
        )
      ) : null}
    </tbody>
  );
}

export default TableItem;
