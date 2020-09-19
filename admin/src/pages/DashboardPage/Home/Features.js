import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeFeatureCard from '../../../components/cards/HomeFeatureCard'

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
  
export default function Features({history,role}) {
    const classes = useStyles();
    const features = [{
      url:"https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083387__340.jpg",
      title:"Student Enrolment",
      link:'/app/students'
    },
    {
      url:"https://images.unsplash.com/photo-1524718730196-9b4aca2b5b8c",
      title:"Adverisement Board",
      link:'/app/ad'
    },
    {
      url:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      title:"Manage Users",
      link:'/app/users'
    },
    {
      url:"https://images.unsplash.com/photo-1547567667-1aa64e6f58dc",
      title:" Exams",
      link:'/app/exams'
    },
  ]
    return (
        <div className={classes.root}>
        {
          features.map((item)=>{
          return <HomeFeatureCard key={item.title} img={item.url} title={item.title} link={item.link} history={history}/>

          })
        }
        </div>
    )
}
