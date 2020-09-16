import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

export default function routing() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/user" component={User} />
        <Redirect
          to={{
            state: { error: true },
          }}
        />
      </Switch>
    </div>
  );
}
