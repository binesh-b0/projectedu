import React,{useState,useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ExcelReader from '../../../../../components/buttons/ExcelReader'

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 12,
  },
  input: {
    display: 'none',
  },
});
export default function Three({ handleNext, handleBack }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(data)

  }, [data])

  return (
    <div>
      <ExcelReader setData={setData}/>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="secodary"
          disableElevation
          style={{ marginRight: "16px" }}
          onClick={handleBack}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
