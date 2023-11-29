import React from "react";
import MicrosoftLogin from "react-microsoft-login";

export default function Oauth(props){
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return (
    <MicrosoftLogin clientId={"pX~8Q~mbYXSTpKebmwSfdVhjWr8krdhMDwLoibo-"} authCallback={authHandler} />
  );
};