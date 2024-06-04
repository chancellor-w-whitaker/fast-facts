import ReactDOM from "react-dom/client";
import React from "react";

import { Wrapper } from "./components/Wrapper.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>
);
