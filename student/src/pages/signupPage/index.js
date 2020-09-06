/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../actions/userActions";
import SimpleFooter from "../../components/SimpleFooter";
import "./index.css";

import Button from '@material-ui/core/Button';

import {  Form ,Image,} from "react-bootstrap";
import {Formik} from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon color='white' icon={faEye} />;
const eyeSlash = <FontAwesomeIcon color='white' icon={faEyeSlash} />;



function signupPage(props) {

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const [passwordShown, setPasswordShown] = useState(false);


  const schema = yup.object().shape({
    name: yup.string().required("Enter Full Name"),
    email: yup.string().required("Enter valid email").email(),
    pass: yup.string().required("Enter valid password").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    pass2: yup.string().required("Enter valid password").oneOf([yup.ref('pass'),null],"Password mismatch"),
    terms: yup.bool().required("Incomplete form"),
  });
  

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

  };

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (name,email,password) => {
  
    dispatch(register(name, email, password));
  };

  return (
    <div className="container-fluid">
    <div className="contents">
      <div className="row my-auto card-container">
        <div className="col-lg-8 card-details">
          <Image className="card-image" src='./images/undraw_certification_aif8.png'/>
          <p className="brand"> HSST portal</p>
          <Button  variant="contained"  className="login-button" disableElevation>Already have an account? Login</Button>
        </div>  
        <div className="col-lg form-container">
          <div >
            <p className="welcome-text">Welcome</p>
            {FormExample()}
          </div>
        </div>
      </div>
      </div>
      <SimpleFooter />
    </div>
  );
  
  function FormExample() {
    return (
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues = {{
          name:"",
          email:"",
          pass:"",
          pass2:"",
          terms:false
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
              

              <Form.Group controlId="formFullName" >
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  name="name"
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  size="sm" type="text" placeholder="Full Name"  />
                <Form.Control.Feedback type="invalid" tooltip>
                  Enter Name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  size="sm" type="email" placeholder="Enter email" required />
 
                <Form.Control.Feedback type="invalid" tooltip>
                  Enter valid email
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <i className="float-right" onClick={togglePasswordVisiblity}>
                  {passwordShown ? eye : eyeSlash}
                </i>
                <Form.Control
                 name="pass"
                  type={passwordShown ? "text" : "password"}
                  isInvalid={!!errors.pass}
                  onChange={handleChange}
                  placeholder="Password"
                  size="sm"

                />
                <Form.Text className="text-muted">
                Password must contain at least 8 characters, one uppercase, one number and one special case character
                </Form.Text>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.pass}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formPasswordConf">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                 name="pass2"
                 onChange={handleChange}
                  type={passwordShown ? "text" : "password"}
                  isInvalid={!!errors.pass2}
                  placeholder="Password"
                  size="sm"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                {errors.pass2}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
            <Form.Check
              custom
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              id="validationFormik0"
            />
          </Form.Group>
              <Button size="sm" className='register-button' color="secondary" variant="contained" disableElevation={true} type="submit">
                Register
              </Button>
            </Form>
        )}
      </Formik>
    );
  }
  
  
}
export default signupPage;