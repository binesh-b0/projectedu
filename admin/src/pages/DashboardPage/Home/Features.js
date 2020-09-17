import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display:"flex",
    flexWrap:"wrap",
    flexDirection:"row",
    padding:"24px",
    justifyContent:"space-between"
  },
  card:{
    borderRadius:10,
    padding:10,
    minHeight:"200px",
    minWidth:"350px",
    backgroundColor:"blue",
  },
  cardHeading:{
    color:"white",

  }
  });
  
export default function Features({history}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
             <Card className={classes.card} variant="outlined" onClick={()=>{history.push('/app/users')}}>
             <CardActionArea>

             <Typography className={classes.cardHeading} variant="h5" component="h2">
               Manage Users
             </Typography>
             </CardActionArea>
             </Card>
        </div>
    )
}
