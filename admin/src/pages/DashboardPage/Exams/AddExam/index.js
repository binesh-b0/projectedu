import React, { useEffect } from "react";
import {
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import One from "./One";
import Three from "./Three";
import Two from "./Two";
import { useDispatch, useSelector } from "react-redux";
import { resetPublishExam,createExam } from "../../../../actions/examActions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 32,
    "& .MuiTextField-root": {
      width: "25ch",
    },
  },
  grid: {
    marginTop: 16,
    marginBottom: 32,
  },
  resetContainer:{
    marginTop:16,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function AddExam() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const publishExam = useSelector((state) => state.publishExam);
  const { loading } = publishExam;
  const dispatch = useDispatch([]);

  useEffect(() => {
    dispatch(resetPublishExam());
    return () => {};
  }, []);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePublish = () => {
    dispatch(createExam())
  };

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={1}>
          <StepLabel>Exam details</StepLabel>
          <StepContent>
            <One handleNext={handleNext} />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Instructions</StepLabel>
          <StepContent>
            <Two handleBack={handleBack} handleNext={handleNext} />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Questions</StepLabel>
          <StepContent>
            <Three handleBack={handleBack} handleNext={handleNext} />
          </StepContent>
        </Step>
        {activeStep === 3 && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography style={{marginBottom:"8px"}}>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleBack} className={classes.button}>
              previous
            </Button>
            <Button
              onClick={handlePublish}
              className={classes.button}
              color="primary"
              variant="contained"
            >
              Publish Exam
            </Button>
          </Paper>
        )}
      </Stepper>
    </div>
  );
}
