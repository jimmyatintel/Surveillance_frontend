import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ResponsiveAppBar from "./nav";
import Player from "./Pages/player";
import SelectLabels from "./Pages/KVM_selector";
import Uploads from "./Pages/upload";


const Router = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Player} />
      <Route path="/:name" component={ResponsiveAppBar} />
      <Switch>
        <Route exact path="/player" component={Player} />
        <Route exact path="/mapping" component={SelectLabels} />
        <Route exact path="/upload" component={Uploads} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;