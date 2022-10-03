import React from "react";

import { Home } from "./pages";
import "./App.scss";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

function App() {
  return (
    <div className="wrapper">
      <Home></Home>
    </div>
  );
}

export default App;
