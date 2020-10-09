import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
   width:"100%",
   marginTop:16,
  },
  paper:{
      padding:8,
  },
  title:{
    fontWeight:600,
    textAlign:"center",
  },
  label:{
    fontWeight:500,
    color:"#2764c4"
},
value:{
    
}
}));

export default function Adview({ item }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    {console.log("item",item)}
      <Paper className={classes.paper} variant="outlined">
        <Typography className={classes.title} color="secondary">Jobs of the week</Typography>
        <Grid container direction="row">
          <Grid item xs>
          <Grid container direction="row">
            <Typography className={classes.label}>Company Name :</Typography>
            <Typography className={classes.value}>{item.CompanyName}</Typography>
          </Grid>
          <Grid container direction="row">
            <Typography className={classes.label}>Designation :</Typography>
            <Typography className={classes.value}>{item.Designation}</Typography>
            </Grid>
            <Grid container direction="row">
            <Typography className={classes.label}>Experience :</Typography>
            <Typography className={classes.value}>{item.Experience}</Typography>
            </Grid>
            <Grid container direction="row">
            <Typography className={classes.label}>Domain :</Typography>
            <Typography className={classes.value}>{item.Domain}</Typography>
            </Grid>
          </Grid>
          <Grid item xs>
          <Grid container direction="row">
            <Typography className={classes.label}>Phone no. :</Typography>
            <Typography className={classes.value}>{item.PhoneNo}</Typography>
            </Grid>
            <Grid container direction="row">
            <Typography className={classes.label}>Email :</Typography>
            <Typography className={classes.value}>{item.Email}</Typography>
            </Grid>
            <Grid container direction="row">
            <Typography className={classes.label}>Skills :</Typography>
            <Typography className={classes.value}>{item.Skills}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
