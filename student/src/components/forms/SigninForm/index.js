import React,{useState,useRef} from 'react'
import './index.css'

import Button from '@material-ui/core/Button';

import {  Form } from "react-bootstrap";
import {Formik} from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon color='white' icon={faEye} />;
const eyeSlash = <FontAwesomeIcon color='white' icon={faEyeSlash} />;


const SigninForm=({onSubmit})=> {
  
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const schema = yup.object().shape({
    email: yup.string().required("Enter valid email").email(),
    pass: yup.string().required(),
  });
  const formRef = useRef(null);
  const handleReset = () => {
    formRef.current.reset();
  };
  const submit = (a) => {
    // Do stuff here
    // On success or error:
    console.log(a)
    handleReset();
    onSubmit(a)
 }
    return (
      <Formik
        validationSchema={schema}
        onSubmit={submit}
        initialValues = {{
          email:"",
          pass:"",

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
          <Form ref={formRef}  noValidate onSubmit={handleSubmit}>
              

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
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.pass}
                </Form.Control.Feedback>
              </Form.Group>
  
              <Button className='login-button' color="secondary" variant="contained" disableElevation={true} type="submit">
                Login   
              </Button>
            </Form>
        )}
      </Formik>
    );
  }
  
  export default SigninForm;