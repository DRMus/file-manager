import React from "react";

import { SideBar } from "../../components";
import { FileManager } from "../../containers";
import "./Home.scss";

// TODO: Сделать поиск, модальные окна для загрузки нового файла и создания файла на выгрузку

const Home: React.FC = () => {
  return (
    <section className="main">
      <div className="main--content">
        <SideBar></SideBar>
        <FileManager></FileManager>
      </div>
    </section>
  );
};

export default Home;
