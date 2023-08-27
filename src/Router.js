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

const Router = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Signin} />
      <Route path="/:name" component={ResponsiveAppBar} />
      <Switch>
        <Route exact path="/player/:device" component={Player} />
        <Route exact path="/edit/:device" component={Edit} />
        <Route exact path="/monitor" component={Monitor} />
        <Route exact path="/mapping" component={SelectLabels} />
        <Route exact path="/upload" component={Uploads} />
        <Route exact path="/spy/:project" component={Spy} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;