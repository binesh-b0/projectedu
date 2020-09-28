import React from "react";
import { useFormik } from "formik";
import MaterialTable from "material-table";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Grid from "@material-ui/core/Grid";

import { KeyboardDatePicker } from "@material-ui/pickers";
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
}));

export default function AddExam(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
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
      </Stepper>
    </div>
  );
}
