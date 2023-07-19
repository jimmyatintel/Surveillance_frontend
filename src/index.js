import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import SelectLabels from "./KVM_selector"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <SelectLabels />
  </StrictMode>,
  rootElement
);
