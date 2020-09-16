import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Users from "./Users";
import Exams from "./Exams";
import Home from "./Home";

function Routing() {
  return (
    <div>
      <Switch>
        <Route path='/app'>
          <Redirect to="/app/dashboard"/>
        </Route>
        <Route path="/app/dashboard" component={Home} />
        <Route path="/app/user" component={Users} />
        <Redirect
          to={{
            state: { error: true },
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(Routing)
