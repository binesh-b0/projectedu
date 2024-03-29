import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { emphasize, makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { NoEncryption } from "@material-ui/icons";
import { Switch, Route, Redirect, withRouter,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {resetPublishExam} from "../../../actions/examActions"
import AddExam from './AddExam';
import ExamList from "./ExamList"; 
import ExamDetails from "./ExamDetails";
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

function Exams(props) {
  const classes = useStyles();
  const [clickedUserm, setClickedUser] = useState();
  const location = useLocation();
  const dispatch = useDispatch([]);

  useEffect(() => {
    dispatch(resetPublishExam())
    return () => {
    }
  }, [])

  return (
    <Container className={classes.root}>
      {ActiveLastBreadcrumb(false,location)}
      <div>
          
      </div>
      <Switch>
        <Route exact path="/app/exams" component={ExamList} />
        <Route exact path="/app/exams/add" component={AddExam} />
        <Route path="/app/exams/details/:id" component={ExamDetails} />
      </Switch>
    </Container>
  );
}
function ActiveLastBreadcrumb(exam,location) {
  const classes = useStyles();

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link className={classes.link} to="/app/exams">
        Exams
      </Link>
      {location.pathname.substring(location.pathname.lastIndexOf('/') + 1)!='exams`' && (
        <Link className={classes.link} color="textPrimary" aria-current="page">
          {location.pathname.substring(location.pathname.lastIndexOf('/') + 1)}
        </Link>
      )}
      {location.pathname=='/app/exams/add' && (
        <Link className={classes.link} color="textPrimary" aria-current="page">
            Add new exam
        </Link>
      )}
    </Breadcrumbs>
  );
}

export default withRouter(Exams)