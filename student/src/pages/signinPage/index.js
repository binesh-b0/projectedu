/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin,logout } from '../../actions/userActions';
import SimpleFooter from "../../components/SimpleFooter";
import SigninForm from "../../components/forms/SigninForm";
import styles from "./SigninPage.module.css";

import Button from '@material-ui/core/Button';

import {  Image,} from "react-bootstrap";


function SigninPage(props) {

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo!=null)
    if (userInfo.verify) {
      props.history.push("/verify");
    }
    return () => {
      //
    };
  }, [userInfo]);
  const onSubmit = ({name,email,pass2}) => {
    console.log("hi",name,email,pass2);
    dispatch(signin(email, pass2));

  };
  
  const goToLogin = () =>{
    dispatch(logout);
    props.history.push("/signup");
  }


  return (
    <div className={styles.signin_page_container_fluid}>
    <div className={styles.signin_page_contents}>
      <div className={`row my-auto ${styles.signin_page_card_container}`}>
        <div className={`col-lg-8 ${styles.signin_page_card_details}`}>
          <Image className={`${styles.signin_page_card_image} d-none d-lg-block`} src='./images/undraw_certification_aif8.png'/>
          <p className={styles.signin_page_brand}> HSST portal</p>
          <Button 
            onClick={() => goToLogin()} 
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