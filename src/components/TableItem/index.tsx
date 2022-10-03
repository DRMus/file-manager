import React from "react";
import { FileOutlined } from "@ant-design/icons";

import FolderIcon from "../../img/svg/Folder.svg";
import { IUploadedFile, IUploadedFilesFolder } from "../../utils/interfaces";
import "./TableItem.scss";

type Props = { filesObject: IUploadedFilesFolder | IUploadedFile | undefined };

function TableItem({ filesObject }: Props) {
  const folderFilesObject = filesObject as IUploadedFilesFolder;
  const oneFileObject = filesObject as IUploadedFile;
  return (
    <tbody>
      {filesObject ? (
        filesObject.type === "folder" ? (
          folderFilesObject.inner.map((item, key) => (
            <tr key={key}>
              <td>
                {item.type === "folder" ? (
                  <img src={FolderIcon} alt="" />
                ) : (
                  <FileOutlined className="file-icon" />
                )}
                <p>{item.name}</p>
              </td>
              <td>User</td>
              {"info" in item ? <td>{item.info.lastModified}</td> : null}
              {"info" in item ? <td>{item.info.size}</td> : null}
            </tr>
          ))
        ) : (
          <tr>
            <td>
              <FileOutlined className="file-icon" />
              <p>{oneFileObject.name}</p>
            </td>
            <td>User</td>
            <td>{oneFileObject.info.lastModified}</td>
            <td>{oneFileObject.info.size}</td>
          </tr>
        )
      ) : null}
    </tbody>
  );
}

export default TableItem;
