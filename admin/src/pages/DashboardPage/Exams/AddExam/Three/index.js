import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
  Divider,
} from "@material-ui/core";
import ExcelReader from "../../../../../components/buttons/ExcelReader";
import Add from "@material-ui/icons/Add";
import QuestionDialog from "../../../../../components/dialogs/QuestionDialog";
import QuestionListItem from "../../../../../components/list/QuestionListItem";
import { useDispatch, useSelector } from "react-redux";
import { getExamQuestions } from "../../../../../actions/examActions";
import index from "../../ExamDetails";

const useStyles = makeStyles({
  root: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 24,
  },
  input: {
    display: "none",
  },
  insert: {
    textTransform: "none",
    marginLeft: 32,
  },
  paper: {
    padding: 8,
  },
});
export default function Three({ handleNext, handleBack }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState({});
  const publishExam = useSelector((state) => state.publishExam);
  const { questions } = publishExam;
  const dispatch = useDispatch([]);
  useEffect(() => {
    setData(questions);
  }, []);
  useEffect(() => {
    dispatch(getExamQuestions(data));
  }, [data]);
  const addData = (values) => {
    let index = -1;
    try {
      data.map((val, i) => {
        if (val.no == values.no) index = i;
      });
      if (index === -1) {
        setData((data) => data.concat(values));
      } else {
        let items = [...data];
        items[index] = values;
        setData(items);
      }
    } catch (error) {}
  };
  const onEdit = (item) => {
    setQuestion(item);
    setOpen(true);
  };
  const onDelete = (item) => {
    var index = data.findIndex((x) => x.no == item.no);
    setData((data) => data.filter((item, j) => index !== j));
  };
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="body2">
        Dolore commodo incididunt incididunt dolore adipisicing magna.
      </Typography>
      <Grid
        direction="row"
        container
        spacing={2}
        alignItems="center"
        style={{ margin: "16px" }}
      >
        <ExcelReader setData={setData} />
        <Typography variant="subtitle1" style={{ marginLeft: "32px" }}>
          - or -
        </Typography>
        <Button
          className={classes.insert}
          size="small"
          variant="outlined"
          onClick={() => {
            setQuestion({ no: data.length + 1 });
            setOpen(true);
          }}
        >
          <Add />
          Insert Question
        </Button>
      </Grid>
      <Paper className={classes.paper}>
        {open && question.no && (
          <QuestionDialog
            open={open}
            setOpen={setOpen}
            question={question}
            setQuestion={setQuestion}
            addData={addData}
            index={question.no - 1}
          />
        )}
        {data.length === 0 && (
          <Typography variant="subtitle2" style={{ textAlign: "center" }}>
            No Questions added
          </Typography>
        )}
        {data.map((item, index) => (
          <QuestionListItem
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
          />
        ))}
      </Paper>
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
          disabled={data.length === 0}
          onClick={() => {
            dispatch(getExamQuestions(data));
            handleNext();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
