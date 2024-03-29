import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isLoggedIn } from "./services/authService";
import { Dashboard, Signin, NotFound, Reset } from "./pages";

function App() {
  const isAuthenticated = isLoggedIn();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app" />} />

        {/* <PrivateRoute authed={isLoggedIn()} path="/app" component={Dashboard} /> */}
        {/* <Route path="/login" 
        render={(props)=> isLoggedIn()===false?
         <Signin /> :
          <Redirect to='/app/dashboard'/>} /> */}
        <Route path="/app" component={Dashboard} />
        <Route path="/login" component={Signin} />
        <Route path="/reset/:token" component={Reset} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
  // return <Router />;
}
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}

export default App;
