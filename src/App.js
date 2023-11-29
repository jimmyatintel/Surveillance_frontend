import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Router from "./Router";
import { MsalProvider } from "@azure/msal-react";
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";
import { InteractionType } from "@azure/msal-browser";

const msalConfiguration = {
  auth: {
      clientId: "8968542d-a5d2-499c-914e-de0bf20a91bd", // the only mandatory field in this object, uniquely identifies your app
      authority: 'https://login.microsoftonline.com/46c98d88-e344-4ed4-8496-4ed7712e255d'
      // here you'll add the other fields that you might need based on the Azure portal settings
  }
};

const pca = new PublicClientApplication(msalConfiguration);

export default function App() {
  return (
    <div className="App">
      {/* <MsalProvider instance={InteractionType.Redirect}> */}
        <Router />
      {/* </MsalProvider> */}
    </div>
  );
}
