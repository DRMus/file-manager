import React, { useContext } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./SearchPanel.scss"
import { Context } from "../../utils";

type Props = { className: string };

function SearchPanel({ className }: Props) {
  const {searchValue} = useContext(Context)

  return (
    <div className={className}>
      <div className="search-panel">
        <Input
          className="search-panel--input"
          prefix={<SearchOutlined className="search-panel--icon" />}
          placeholder="Поиск файла в директории"
          onChange={(e) => searchValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchPanel;
