import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter, Routes } from "react-router-dom";
import App from "./App";
import SelectLabels from "./Pages/KVM_selector"
import Uploads from "./Pages/upload"
import ResponsiveAppBar from "./nav"
const rootElement = document.getElementById("root");
ReactDOM.render(
  <App />,
  rootElement
);
