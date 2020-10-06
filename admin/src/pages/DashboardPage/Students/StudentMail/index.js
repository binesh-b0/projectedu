import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Grid, TextField, Icon,Backdrop,CircularProgress,Snackbar,Paper  } from "@material-ui/core";
import { useFormik } from "formik";
import api from '../../../../api/api'
import MuiAlert from '@material-ui/lab/Alert';
import {getCredentials} from '../../../../services/authService'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default function StudentMail({ selected, setSelected }) {
    const [loading, setLoading] = useState(false)
    const [complete, setComplete] = useState(false)
    const [open, setOpen] = useState(false)
  const handleDelete = (email) => () => {
    setSelected((chips) =>
      chips.filter((chip) => chip!== email)
    );
  };
  const sendEmail= async(selected,values)=>{
      setLoading(true)
      new Promise((resolve,reject)=>{
        api.post(
            '/admin/sendEmail',
            {emails:selected,message:values.message,subject:values.subject},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getCredentials()}`,
                },
            },
            {timeout:1000}
        ).then((res)=>{
          console.log("res",res)
          setLoading(false)
          resolve()
          setComplete(true)
          setOpen(true)
          })
        .catch((err)=>{
            setLoading(false)
            reject()
            setComplete(false)
            setOpen(true)
        })
      })

    
}

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setComplete(false);
  };
  const formik = useFormik({
    initialValues: {
      message: "",
      subject: "",
    },
    onSubmit: (values) => {
      sendEmail(selected,values)
    },
  });
  return (
    <div>
    {loading &&(
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )}
    {open && (   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={complete?"success":"error"}>
         {complete? "Email success fully send":"Error"}
        </Alert>
      </Snackbar>)}
      <div>
        {selected.map((email) => {
          let icon;
          return (
            <li key={email}>
              <Chip
                icon={icon}
                label={email}
                onDelete={() => handleDelete(email)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </div>
      <form>
        <TextField
          label="Outlined"
          variant="outlined"
          name="subject"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.subject}
          disabled={loading}
        />
        <TextField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          name="message"
          label="Multiline"
          multiline
          rows={4}
          variant="outlined"
          disabled={loading}
        />
        <Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            endIcon={<Icon>send</Icon>}
          >
            send
          </Button>
        </Grid>
      </form>
    </div>
  );
}
