import React from "react";

import { SideBar, FileManager } from "../../components";
import "./Home.scss";

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
