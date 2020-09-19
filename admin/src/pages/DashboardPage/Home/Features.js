import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeFeatureCard from '../../../components/cards/HomeFeatureCard'
import {useSelector} from 'react-redux'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display:"flex",
    flexWrap:"wrap",
    flexDirection:"row",
    padding:"24px",
    alignItems:"center",
  }
  });
  
export default function Features({history}) {
    const classes = useStyles();
    const userRole = useSelector((state) => state.userRole);
    const { roles } = userRole;
  //  try {
    const features = [{
      url:"https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083387__340.jpg",
      title:"Student Enrolment",
      link:'/app/students',
      show:!!roles.ENROLLMENTS.ALL_STUDENTS 
    },
    {
      url:"https://images.unsplash.com/photo-1524718730196-9b4aca2b5b8c",
      title:"Adverisement Board",
      link:'/app/ad',
      show:!!roles.ENROLLMENTS.ADVERTISEMENTS 
    },
    {
      url:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      title:"Manage Users",
      link:'/app/users',
      show:!!roles.USER_ACCESS.ALL_USERS 
    },
    {
      url:"https://images.unsplash.com/photo-1547567667-1aa64e6f58dc",
      title:" Exams",
      link:'/app/exams',
      show:!!roles.EXAMS_LISTING.ALL_EXAMS 

    },
  ]
  //  } catch (error) {
  //    console.log(error);
  //  }
    return (
        <div className={classes.root}>
        {console.log(features,"ne")}
        {
          features.map((item)=>{
            if(item.show)
          return <HomeFeatureCard key={item.title} img={item.url} title={item.title} link={item.link} history={history}/>

          })
        }
        </div>
    )
}
