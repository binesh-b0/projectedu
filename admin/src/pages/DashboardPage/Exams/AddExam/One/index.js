import React from "react";
import { useFormik } from "formik";
import MaterialTable from "material-table";
import * as Yup from 'yup';
import { makeStyles } from "@material-ui/core/styles";
import { Button,TextField } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop:32,
    "& .MuiTextField-root": {
      width: "25ch",
    },
  },
  grid:{
      marginTop:16,
      marginBottom:32,
  }
}));

export default function One({handleNext}) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: "",
      startd:null,
      endd:null,
      startt:null,
      endt:null,
      duration:20,
      
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      handleNext()
    },
  });

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
      <Grid container justify="space-between" className={classes.grid} >
      <TextField
          id="title"
          name="title"
          label="Name"
          multiline
          style={{flex:".8",marginRight:"16px"}}
          rowsMax={4}
          required
          value={formik.values.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
                    <TextField
          id="title"
          name="duration"
          label="Duration"
          type="number"
          style={{flex:".2",marginRight:"16px"}}
          required
          value={formik.values.duration}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        /> 
        </Grid>
        <Grid container justify="space-between" className={classes.grid}>
        <TextField
          margin="normal"
          label="Start date"
          required
          name="startd"
          type="date"
          format="MM/dd/yyyy"
          value={formik.values.startd}
          onChange={(event) => {
                        console.log('event', event.target.value);
                        formik.setFieldValue('startd', event.target.value);
                    }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          label="Start time"
          name="startt"
          type="time"
          required
          value={formik.values.startt}
          onChange={(event) => {
                        console.log('event', event.target.value);
                        formik.setFieldValue('startt', event.target.value);
                    }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          label="End date"
          name="endd"
          type="date"
          format="MM/dd/yyyy"
          value={formik.values.endd}
          onChange={(event) => {
                        console.log('event', event.target.value);
                        formik.setFieldValue('startd', event.target.value);
                    }}
          InputLabelProps={{ shrink: true }}
        />
                <TextField
          margin="normal"
          label="End time"
          name="endt"
          type="time"
          value={formik.values.endt}
          onChange={(event) => {
                        console.log('event', event.target.value);
                        formik.setFieldValue('endt', event.target.value);
                    }}
          InputLabelProps={{ shrink: true }}
        />
 
        </Grid>
        <Button type="submit" variant="contained" color="primary" disableElevation>Next</Button>
      </form>
    </div>
  );
}
