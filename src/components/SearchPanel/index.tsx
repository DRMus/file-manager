import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./SearchPanel.scss"

type Props = { className: string };

function SearcPanel({ className }: Props) {
  return (
    <div className={className}>
      <div className="search-panel">
        <Input
          className="search-panel--input"
          prefix={<SearchOutlined className="search-panel--icon" />}
          placeholder="Поиск файла в директории"
        />
      </div>
    </div>
  );
}

export default SearcPanel;
