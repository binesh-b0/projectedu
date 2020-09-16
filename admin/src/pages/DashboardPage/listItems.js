import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';

import AssignmentIcon from '@material-ui/icons/Assignment';
import SchoolIcon from '@material-ui/icons/School';

import {Link} from 'react-router-dom';

export const userListItems = (
  <div>
   <ListSubheader inset>User access</ListSubheader>

    <ListItem button to='/app/users' component={'/app/users' && Link}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
   
    <ListItem button  component={'/app/interviews' && Link} to='/app/interviews'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Interviews" />
    </ListItem>
   
    {/* <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem> */}
   
  </div>
);

export const enrolmentsList = (
  <div>
    <ListSubheader inset>Enrollments</ListSubheader>
    <ListItem button component={'/app/students' && Link} to='/app/students'>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItem>
    <ListItem button  component={'/app/ad' && Link} to='/app/ad'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Ad manager" />
    </ListItem>
  </div>
);

export const examsList = (
  <div>
    <ListSubheader inset>Exams list</ListSubheader>
    <ListItem button component={'/app/exams' && Link} to='/app/exams'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Exams" />
    </ListItem>
  </div>
);