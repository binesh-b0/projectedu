import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signin,resetPassword } from "../../actions/userActions";
import SimpleAlert from "../../components/alerts/SimpleAlert";
import PasswordResetDialog from '../../components/dialogs/PasswordResetDialog';
import AdornedButton from '../../components/buttons/AdornedButton';
import Cookies from 'js-cookie'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignIn(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading } = userSignin;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [alert, setAlert] = useState(false);
  
  // useEffect(() => {
  //   Cookies.remove("tk")
  // }, )

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const resetPasswordOnSubmit=(email,setDone,setError)=>{
    dispatch(resetPassword(email,setDone,setError));
  }
  
  useEffect(() => {
    if (error) {
      setAlert(true);
    } else setAlert(false);
  }, [loading]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(signin(values.username, values.password,props.history,setError));
    },
  });

  const showAlert = () => {
    if (alert) return <SimpleAlert severity="error" msg={error} />;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <PasswordResetDialog
        resetPasswordOnSubmit={resetPasswordOnSubmit}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={openDialog}
      />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {showAlert()}
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            disabled={loading}
            label="Username"
            name="username"
            autoComplete="email"
            error={!!formik.errors.username && formik.touched.username}
            helperText={
              formik.touched.username && !!formik.errors.username
                ? !!formik.errors.username
                : ""
            }
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            disabled={loading}
            label="Password"
            type="password"
            error={formik.touched.password && !!formik.errors.password}
            helperText={
              formik.touched.password && !!formik.errors.password
                ? formik.errors.password
                : ""
            }
            onChange={formik.handleChange}
            id="password"
            value={formik.values.password}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <AdornedButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            color={loading?'secondary':'primary'}
            // disabled={loading}
            loading={loading}
            className={classes.submit}
          >
            Sign In
          </AdornedButton>
          <Grid container>
            <Grid item xs>
              <Button style={{textTransform:"none"}} onClick={()=>setOpenDialog(true)} >
                Forgot password?
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
