/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../actions/userActions';
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
    if (userInfo) {
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
    props.history.push("/signup");
  }


  return (
    <div className="container-fluid">
    <div className="contents">
      <div className="row my-auto card-container">
        <div className="col-lg-8 card-details">
          <Image className="card-image d-none d-lg-block" src='./images/undraw_certification_aif8.png'/>
          <p className="brand"> HSST portal</p>
          <Button onClick={() => goToLogin()} variant="contained"  className="signup-button" disableElevation>Already have an account? Login</Button>
        </div>  
        <div className="col-lg form-container">
          <div >
            <p className="welcome-text">Welcome</p>
            <p className="welcome-sub">Signin to your account</p>
            <SigninForm onSubmit={onSubmit} />
            <div style={{'textAlign':'center','margin':'16px'}}>
            <a className="privacy">privacy policy</a>
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