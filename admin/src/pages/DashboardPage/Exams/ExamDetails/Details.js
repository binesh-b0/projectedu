import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Grid, Button } from "@material-ui/core";
import { useFormik } from "formik";
import Moment from 'moment';

const useStyles = makeStyles((theme) => ({
  grid:{
    marginTop:16,
    marginBottom:32,
    padding:4,
},
}));

export default function Details({ details, edit,onEdit }) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      Title: !!details ? details.Title : "",
      StartDate: !!details ?  Moment(details.StartDate).format('YYYY-MM-DD') : null,
      EndDate: !!details ?  Moment(details.EndDate).format('YYYY-MM-DD') : null,
      StartTime: !!details ? details.StartTime : null,
      EndTime: !!details ? details.EndTime : null,
      Duration: !!details ? details.Duration : 40,
    },
    onSubmit: (values) => {
      console.log(values)
      onEdit(values,"details")
    },
  });
  useEffect(() => {
    console.log("sf",Moment(details.EndDate).format('YYYY-MM-DD'))
    
  }, [])
  return (
    <div className={classes.root}>
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justify="space-between" className={classes.grid}>
            <TextField
              id="Title"
              name="Title"
              label="Name"
              multiline
              style={{ flex: ".8", marginRight: "16px" }}
              rowsMax={4}
              required={edit}
              inputProps={{ readOnly: !edit }}
              value={formik.values.Title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <TextField
              id="Title"
              name="Duration"
              label="Duration"
              type="number"
              style={{ flex: ".2", marginRight: "16px" }}
              required={edit}
              inputProps={{ readOnly: !edit }}
              value={formik.values.Duration}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid container justify="space-between" className={classes.grid}>
            <TextField
              margin="normal"
              label="Start date"
              required={edit}
              name="StartDate"
              type="date"
              inputProps={{ readOnly: !edit }}

              value={formik.values.StartDate}
              onChange={(event) => {
                console.log("event", event.target.value);
                formik.setFieldValue("StartDate", event.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              label="Start time"
              name="StartTime"
              type="time"
              required={edit}
              inputProps={{ readOnly: !edit }}
              value={formik.values.StartTime}
              onChange={(event) => {
                console.log("event", event.target.value);
                formik.setFieldValue("StartTime", event.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              label="End date"
              inputProps={{ readOnly: !edit }}
              name="EndDate"
              type="date"
              required={edit}
              format="MM/dd/yyyy"
              value={formik.values.EndDate}
              onChange={(event) => {
                console.log("event", event.target.value);
                formik.setFieldValue("EndDate", event.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              label="End time"
              name="EndTime"
              type="time"
              inputProps={{ readOnly: !edit }}
              required={edit}
              value={formik.values.EndTime}
              onChange={(event) => {
                console.log("event", event.target.value);
                formik.setFieldValue("EndTime", event.target.value);
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid container justify="flex-end">
          {edit && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              size="small"
              style={{margin:"8px"}}
            >
              Save
            </Button>
          )}{" "}
          </Grid>
        </form>
      </Paper>
    </div>
  );
}