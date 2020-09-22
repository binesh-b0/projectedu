import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {toggleSidebar } from '../../actions/layoutActions'
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";

export default function DashboardPage(props) {
  var classes = useStyles();

  const sidebar = useSelector((state) => state.sidebar);
  const { isSidebarOpened } = sidebar;
  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              {/* <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} /> */}
              {/* <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} /> */}
            </Switch>
          </div>
        </>
    </div>
  )
}
