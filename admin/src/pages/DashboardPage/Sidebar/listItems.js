import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";

import AssignmentIcon from "@material-ui/icons/Assignment";
import SchoolIcon from "@material-ui/icons/School";

import { Link } from "react-router-dom";

export const userListItems = (roles,classes) => (
  <div>
    <ListSubheader inset>User access</ListSubheader>
    {true && (
      <ListItem button to="/app/users" component={"/app/users" && Link}>
        <ListItemIcon>
          <ShoppingCartIcon className={classes.menuButton}/>
        </ListItemIcon>
        <ListItemText primary="Users" className={classes.menuButton}/>
      </ListItem>
    )}
    {true && (
      <ListItem
        button
        component={"/app/interviews" && Link}
        to="/app/interviews"
      >
        <ListItemIcon>
          <PeopleIcon className={classes.menuButton}/>
        </ListItemIcon>
        <ListItemText primary="Interviews" className={classes.menuButton}/>
      </ListItem>
    )}

    {/* <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem> */}
  </div>
);

export const enrolmentsList = (roles,classes) => (
  <div>
    <ListSubheader inset>Enrollments</ListSubheader>
    {true && (
      <ListItem button component={"/app/students" && Link} to="/app/students">
        <ListItemIcon>
          <SchoolIcon className={classes.menuButton}/>
        </ListItemIcon>
        <ListItemText primary="Students" className={classes.menuButton}/>
      </ListItem>
    )}
    {true && (
      <ListItem button component={"/app/ad" && Link} to="/app/ad">
        <ListItemIcon>
          <AssignmentIcon className={classes.menuButton}/>
        </ListItemIcon>
        <ListItemText primary="Ad manager" className={classes.menuButton}/>
      </ListItem>
    )}
  </div>
);

export const examsList = (roles,classes) => (
  <div>
    <ListSubheader inset>Exams list</ListSubheader>
    {true && (
      <ListItem button component={"/app/exams" && Link} to="/app/exams">
        <ListItemIcon>
          <AssignmentIcon className={classes.menuButton}/>
        </ListItemIcon>
        <ListItemText primary="Exams" className={classes.menuButton}/>
      </ListItem>
    )}
  </div>
);
