/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin,logout } from '../../actions/userActions';
import SimpleFooter from "../../components/SimpleFooter";
import SimpleHeader from "../../components/headers/SimpleHeader"
import SigninForm from "../../components/forms/SigninForm";
import styles from "./SigninPage.module.css";
import Cookie from 'js-cookie';

import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {  Image,} from "react-bootstrap";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function SigninPage(props) {

  const userSignin = useSelector(state => state.userSignin);
  const { loading,error, status } = userSignin;
  const dispatch = useDispatch();
  const [snk, setSnk] = useState({});
  const [open, setOpen] = React.useState(false);

  const onSubmit = ({email,pass}) => {
    console.log("hi",email,pass);
    dispatch(signin(email, pass));
  };
  
  const goToSignup = () =>{
    dispatch(logout);
    props.history.push("/signup");
  }

  useEffect(() => {
    if (status===200 && !loading) {
      if(Cookie.get("signRE"))
      props.history.push("/");
    }
    if (error) {
      if (status === "XXXXX") {      //already signed up
        // props.history.push("/signin");
      } else if (status === "xxx") {
        // props.history.push("/verify");  //pending verification  
      } else {
        setSnk({ sev: "error", msg: error.error });
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
       anchorOrigin={{vertical:"top",horizontal:"center"}}>
        <Alert onClose={handleClose} severity={snk.sev}>
          {snk.msg}
        </Alert>
      </Snackbar>
    );
  };
  return (
    <div className={styles.signin_page_container_fluid}>
          <div>{showSnackbar()}</div>
          <SimpleHeader goToLogin={goToSignup} loc="login"/>

    <div className={styles.signin_page_contents}>
      <div className={`row  ${styles.signin_page_card_container}`}>
        <div className={`col-lg-8 ${styles.signin_page_card_details}`}>
          <Image className={`${styles.signin_page_card_image} d-none d-lg-block`} src='./images/undraw_certification_aif8.png'/>
          <p className={styles.signin_page_brand}> HSST portal</p>
          <Button 
            onClick={() => goToSignup()} 
            variant="contained" 
            className={styles.signin_page_signup_button}
            disableElevation>
             Create new account
          </Button>
        </div>  
        <div className={`col-lg ${styles.form_container}`}>
          <div >
            <p className={styles.signin_page_welcome_text}>Welcome</p>
            <p className={styles.signin_page_welcome_sub}>Signin to your account</p>
            <SigninForm onSubmit={onSubmit} />
            <div style={{'textAlign':'center','margin':'16px'}}>
            <a className={styles.signin_page_privacy}>privacy policy</a>
            </div>
          </div>
        </div>
      </div>
      </div>
      <SimpleFooter />
    </div>
  )
}
export default SigninPage;