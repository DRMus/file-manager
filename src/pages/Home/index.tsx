import React, { useState } from "react";

import { SideBar } from "../../components";
import { FileManager } from "../../containers";
import "./Home.scss";


const Home: React.FC = () => {
  const [uploadedFile, setUploadFile] = useState<FileList>();

  const uploadFile = (file: FileList | null) => {
    if (file) {
      setUploadFile(file);
    }
  };

  return (
    <section className="main">
      <div className="main--content">
        <SideBar uploadFile={uploadFile}></SideBar>
        <FileManager fileFromSideBar={uploadedFile}></FileManager>
      </div>
    </section>
  );
};

export default Home;
