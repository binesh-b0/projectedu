import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { emphasize, makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { Switch, Route, Redirect, withRouter,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import StudentMail from "./StudentMail";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 24,
    backgroundColor:"white",
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

function Students(props) {
  const classes = useStyles();
  const [clickedUserm, setClickedUser] = useState();
  const location = useLocation();
  const dispatch = useDispatch([]);


  return (
    <Container className={classes.root}>
      {ActiveLastBreadcrumb(false,location)}
      <div>
          
      </div>
      <Switch>
        <Route exact path="/app/students" component={StudentList} />
        <Route exact path="/app/students/mail" component={StudentMail} />
        <Route path="/app/students/details/:id" component={StudentDetails} />
      </Switch>
    </Container>
  );
}
function ActiveLastBreadcrumb(exam,location) {
  const classes = useStyles();

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link className={classes.link} to="/app/students">
        Students
      </Link>
    
      {location.pathname=='/app/students/mail' && (
        <Link className={classes.link} color="textPrimary" aria-current="page">
           Send email
        </Link>
      )}
    </Breadcrumbs>
  );
}

export default withRouter(Students)