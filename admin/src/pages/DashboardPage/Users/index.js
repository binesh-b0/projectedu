import React, { useState, useEffect } from "react";
import UserTable from "../../../components/tables/UserTable";
import Container from "@material-ui/core/Container";
import { emphasize, makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { NoEncryption } from "@material-ui/icons";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import UserItemDetails from "./UserItemDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 24,
  },
  link: {
    color: theme.palette.grey[800],
    fontSize:14,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      textDecoration: "none",
      color: theme.palette.primary,
    },
  },
}));
function Users() {
  const classes = useStyles();
  const [clickedUserm, setClickedUser] = useState();

  return (
    <Container className={classes.root}>
      {ActiveLastBreadcrumb()}
      <Switch>
        <Route exact path="/app/users" component={UserTable} />
        <Route path="/app/users/:id" component={UserItemDetails} />
      </Switch>
    </Container>
  );
}
function ActiveLastBreadcrumb(user) {
  const classes = useStyles();

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link className={classes.link} to="/app/users">
        All Users
      </Link>
      {user && (
        <Link className={classes.link} color="textPrimary" aria-current="page">
          {user}
        </Link>
      )}
    </Breadcrumbs>
  );
}

export default withRouter(Users)