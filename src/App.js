import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Router from "./Router";
import { MsalProvider } from "@azure/msal-react";
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";
import { InteractionType } from "@azure/msal-browser";


export default function App() {
  return (
    <div className="App">
        <Router />
    </div>
  );
}
