import "../index.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/router";
import { Provider } from "jotai";
import { ThemeProvider } from "../context/ThemeContext";
import { HashRouter } from "react-router-dom"; 

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider>
      <HashRouter>
        <AppRouter />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
