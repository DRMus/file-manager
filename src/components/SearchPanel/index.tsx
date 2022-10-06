import React, { useContext } from "react";
import { Input } from "antd";
import { SearchOutlined, FileOutlined } from "@ant-design/icons";

import "./SearchPanel.scss";
import { Context } from "../../utils";
import classNames from "classnames";

type Props = { className: string };

function SearchPanel({ className }: Props) {
  const {
    searchValue,
    openSearchPanel,
    openFile,
    searchArray,
    searchPanelIsActive,
  } = useContext(Context);

  return (
    <div className={className}>
      {searchPanelIsActive && (
        <div
          className="search-panel--out-handler"
          onClick={() => openSearchPanel(false)}
        ></div>
      )}
      <div className="search-panel" onClick={() => openSearchPanel(true)}>
        <Input
          className={classNames("search-panel--input", {
            "search-panel--input--open": searchPanelIsActive,
          })}
          prefix={<SearchOutlined className="search-panel--icon" />}
          placeholder="Поиск файла в директории"
          onChange={(e) => searchValue(e.target.value)}
        />
        {searchPanelIsActive && (
          <div className="search-panel--answer">
            {searchArray && searchArray?.length > 0 ? (
              searchArray.map((item, key) => (
                <div
                  key={key}
                  className="search-panel--answer--item"
                  onClick={() => openFile(item)}
                >
                  <FileOutlined className="file-icon" />
                  <p>{item.name}</p>
                </div>
              ))
            ) : (
              <div className="search-panel--answer--empty">
                <p>Ничего не найдено</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPanel;
