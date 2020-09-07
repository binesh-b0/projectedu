/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../actions/userActions";
import SimpleFooter from "../../components/SimpleFooter";
import SignupForm from "../../components/SignupForm";
import "./index.css";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

//style for snack
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
//for alert in snack
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignupPage(props) {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error, status } = userRegister;
  const dispatch = useDispatch();
  //for snack
  const [snk, setSnk] = useState({});
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //form onsubmit
  const onSubmit = ({ email, pass2 }) => {
    console.log("hi", email, pass2);
    dispatch(register(email, pass2));
  };

  //if userInfo is changed
  useEffect(() => {
    if (userInfo) {
      setSnk({sev:"success",msg:"Submitted"})
      setOpen(true);
      props.history.push("/");
    }
    return () => {
      //
    };
  }, [userInfo]);
//if submit status is changed
  useEffect(() => {
    if (error) {
      if (status == "XXXXX") {      //already signed up
        props.history.push("/signin");
      } else if (status == "xxx") {
        props.history.push("/verify");  //pending verification  
      } else {
        setSnk({ sev: "error", msg: error });
        setOpen(true);
      }
    }
    if (loading) {
      setSnk({ sev: "info", msg: "Submitting" });
      setOpen(true);
    }
    return () => {
      //
    };
  }, [loading, error, status]);

  
  //snackbar close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnk({});
    setOpen(false);
  };
  const showSnackbar = () => {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snk.sev}>
          {snk.msg}
        </Alert>
      </Snackbar>
    );
  };

  const goToLogin = () => {
    console.log("niknas");
    props.history.push("/signin");
  };

  return (
    <div className="container-fluid">
      <div>{showSnackbar()}</div>
      <div className="contents">
        <div className="row my-auto card-container">
          <div className="col-lg-8 card-details">
            <Image
              className="card-image d-none d-lg-block"
              src="./images/undraw_certification_aif8.png"
            />
            <p className="brand"> HSST portal</p>
            <Button
              onClick={() => goToLogin()}
              variant="contained"
              className="signin-button"
              disableElevation
            >
              Already have an account? Login
            </Button>
          </div>
          <div className="col-lg form-container">
            <div>
              <p className="welcome-text">Welcome</p>
              {/* {SignupForm()} */}
              <SignupForm onSubmit={onSubmit} />
              <div style={{display:"flex",alignContent:"center",justifyContent:"center",margin:"16px"}}>
              <Link className="toc">Terms and conditions</Link></div>
            </div>
          </div>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
}
export default SignupPage;
