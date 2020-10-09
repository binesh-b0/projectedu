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
      <Paper className={classes.paper}>
        <Typography className={classes.title} color="secondary">Jobs of the week</Typography>
        <Grid container direction="row">
          <Grid item xs>
          <Grid container direction="row">
            <Typography className={classes.label}>Company Name :</Typography>
            <Typography className={classes.value}>{item.company}</Typography>
          </Grid>
          <Grid container direction="row">
            <Typography className={classes.label}>Designation :</Typography>
            <Typography className={classes.value}>{item.designation}</Typography>
            </Grid>
            <Grid container direction="row">
            <Typography className={classes.label}>Experience :</Typography>
            <Typography className={classes.value}>{item.exp}</Typography>
            </Grid>
            <Grid container direction="row">
            <Typography className={classes.label}>Domain :</Typography>
            <Typography className={classes.value}>{item.domain}</Typography>
            </Grid>
          </Grid>
          <Grid item xs>
          <Grid container direction="row">
            <Typography className={classes.label}>Phone no. :</Typography>
            <Typography className={classes.value}>{item.phone}</Typography>
            </Grid>
            <Grid container direction="row">
            <Typography className={classes.label}>Email :</Typography>
            <Typography className={classes.value}>{item.email}</Typography>
            </Grid>
            <Grid container direction="row">
            <Typography className={classes.label}>Skills :</Typography>
            <Typography className={classes.value}>{item.skills}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
