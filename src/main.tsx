import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';

// firebase test용
// import app from "./firebase";
// console.log("app", app);

ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
      <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>

);
