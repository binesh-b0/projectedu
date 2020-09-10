/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin,logout } from '../../actions/userActions';
import SimpleFooter from "../../components/SimpleFooter";
import SigninForm from "../../components/forms/SigninForm";
import "./index.css";

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
    <div className="signin-page-container-fluid">
    <div className="signin-page-contents">
      <div className="row my-auto signin-page-card-container">
        <div className="col-lg-8 signin-page-card-details">
          <Image className="signin-page-card-image d-none d-lg-block" src='./images/undraw_certification_aif8.png'/>
          <p className="signin-page-brand"> HSST portal</p>
          <Button 
            onClick={() => goToLogin()} 
            variant="contained" 
            className="signin-page-signup-button"
            disableElevation>
             Create new account
          </Button>
        </div>  
        <div className="col-lg form-container">
          <div >
            <p className="signin-page-welcome-text">Welcome</p>
            <p className="signin-page-welcome-sub">Signin to your account</p>
            <SigninForm onSubmit={onSubmit} />
            <div style={{'textAlign':'center','margin':'16px'}}>
            <a className="signin-page-privacy">privacy policy</a>
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