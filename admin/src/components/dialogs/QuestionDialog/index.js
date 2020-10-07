import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import {
  TextField,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  Slide,
  Grid,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    padding: 64,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuestionDialog({
  open,
  setOpen,
  question,
  setQuestion,
  addData,
  index
}) {
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setQuestion({})
    formik.resetForm({})
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      no: question.no,
      question: question.question,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      answer: question.answer,
      type: question.type,
      mark: question.mark,
      neg: question.neg,
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
      console.log(values);
      addData({...values,no:question.no},index)
      formik.resetForm({})
      handleClose();
    },
  });
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={formik.handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Question
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                Add
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.container}>
            <TextField
              label="Enter question"
              name="question"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              required
              onChange={formik.handleChange}
              value={formik.values.question}
            />
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ marginTop: "16px" }}
            >
              <TextField
                label="mark"
                name="mark"
                variant="outlined"
                type="number"
                required
                onChange={formik.handleChange}
                value={formik.values.mark}
              />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  label="Type"
                  required
                  alignItems="center"
                >
                  <MenuItem value={"aptitude"}>aptitude</MenuItem>
                  <MenuItem value={"communication"}>communication</MenuItem>
                  <MenuItem value={"logical"}>logical</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="neg"
                name="neg"
                variant="outlined"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.neg}
              />
            </Grid>
            <Grid container direction="column"  justify="center" style={{marginTop:"16px"}}
  alignItems="stretch">
          <TextField
              label="Option 1"
              name="option1"
              fullWidth
              variant="outlined"
              style={{marginTop:"16px"}}
              required
              onChange={formik.handleChange}
              value={formik.values.option1}
            />
          <TextField
              label="Option 2"
              name="option2"
              fullWidth
              variant="outlined"
              style={{marginTop:"16px"}}
              required
              onChange={formik.handleChange}
              value={formik.values.option2}
            />
          <TextField
              label="Option 3"
              name="option3"
              fullWidth
              variant="outlined"
              style={{marginTop:"16px"}}
              onChange={formik.handleChange}
              value={formik.values.option3}
            />
          <TextField
              label="Option 4"
              name="option4"
              fullWidth
              variant="outlined"
              style={{marginTop:"16px"}}
              onChange={formik.handleChange}
              value={formik.values.option4}
            />
          {/* <TextField
              label="Option 5"
              name="option5"
              fullWidth
              variant="outlined"
              style={{marginTop:"16px"}}
              onChange={formik.handleChange}
              value={formik.values.option5}
            /> */}
          <TextField
              label="Answer"
              name="answer"
              fullWidth
              variant="outlined"
              style={{marginTop:"16px"}}
              onChange={formik.handleChange}
              value={formik.values.answer}
            />
            </Grid>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
