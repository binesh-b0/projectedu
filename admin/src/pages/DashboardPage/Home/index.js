import React from "react";
import styles from "./Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Features from "./Features";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <p className={styles.welcome}>Welcome,admin!</p>
        <Grid container justify="space-around" spacing={2} alignItems="center">
          <Grid item>
            <Paper className={styles.paper} elevation={0}>
              <p className={styles.paperTitle}>Total enroled students</p>
              <p className={styles.paperContent}>360</p>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={styles.paper} elevation={0}>
              <p className={styles.paperTitle}>Upcomming Exams</p>
              <p className={styles.paperContent}>360</p>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={styles.paper} elevation={0} >
              <p className={styles.paperTitle}>Ads Published</p>
              <p className={styles.paperContent}>360</p>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Features history={props.history}/>
    </div>
  );
}
