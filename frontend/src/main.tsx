import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import "./index.css";
import spinner from "./assets/spinner-of-doom.gif";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={Router}
      fallbackElement={<img src={spinner} alt="loading..." />}
    />
  </React.StrictMode>
);
