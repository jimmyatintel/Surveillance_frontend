import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ResponsiveAppBar from "./nav";
import Player from "./Pages/player";
import SelectLabels from "./Pages/KVM_selector";
import Uploads from "./Pages/upload";
import Signin from "./Pages/Signin";
import Monitor from "./Pages/monitor";
import Edit from "./Pages/edit";
import Spy from "./Pages/spy";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

const Router = () => (
  <BrowserRouter>
  {/* <UnauthenticatedTemplate>
    <Route exact path="/" component={Signin} />
  </UnauthenticatedTemplate>
  <AuthenticatedTemplate>
  <Route path="/" component={ResponsiveAppBar} />
      <Switch>
        <Route exact path="/player/:device" component={Player} />
        <Route exact path="/edit/:device" component={Edit} />
        <Route exact path="/" component={Monitor} />
        <Route exact path="/monitor" component={Monitor} />
        <Route exact path="/mapping" component={SelectLabels} />
        <Route exact path="/upload" component={Uploads} />
        <Route exact path="/spy/:project" component={Spy} />
      </Switch>
  </AuthenticatedTemplate> */}
  <Route path="/" component={ResponsiveAppBar} />
      <Switch>
        <Route exact path="/player/:device" component={Player} />
        <Route exact path="/edit/:device" component={Edit} />
        <Route exact path="/" component={Monitor} />
        <Route exact path="/monitor" component={Monitor} />
        <Route exact path="/mapping" component={SelectLabels} />
        <Route exact path="/upload" component={Uploads} />
        <Route exact path="/spy/:project" component={Spy} />
      </Switch>
  </BrowserRouter>
);

export default Router;