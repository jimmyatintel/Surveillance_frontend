import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Router from "./Router";

export default function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}
