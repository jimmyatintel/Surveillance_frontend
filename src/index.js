import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter, Routes } from "react-router-dom";
import App from "./App";
import SelectLabels from "./Pages/KVM_selector"
import Uploads from "./Pages/upload"
import ResponsiveAppBar from "./nav"
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const config = {
  auth: {
    clientId: "8968542d-a5d2-499c-914e-de0bf20a91bd", // the only mandatory field in this object, uniquely identifies your app
    authority: 'https://login.microsoftonline.com/46c98d88-e344-4ed4-8496-4ed7712e255d'
  }
};

const publicClientApplication = new PublicClientApplication(config);


const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <MsalProvider instance={publicClientApplication}>
        <App />
    </ MsalProvider>
    </StrictMode>,
  rootElement
);
