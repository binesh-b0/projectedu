import React, { useState, useRef } from "react";
import "./index.css";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon color="white" icon={faEye} />;
const eyeSlash = <FontAwesomeIcon color="white" icon={faEyeSlash} />;

const SignupForm = ({ onSubmit }) => {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const schema = yup.object().shape({
    email: yup.string().required("Enter valid email").email(),
    pass: yup
      .string()
      .required()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    pass2: yup
      .string()
      .required("Enter valid password")
      .oneOf([yup.ref("pass"), null], "Password mismatch"),
    terms: yup.bool().required("Incomplete form"),
  });
  const formRef = useRef(null);
  const handleReset = () => {
    if (userInfo) formRef.current.reset();
    if (loading === false && error) formRef.current.reset();  //TODO 
  };
  const submit = (a) => {
    // Do stuff here
    // On success or error:
    console.log(a, loading, error);
    handleReset();
    onSubmit(a);
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={submit}
      initialValues={{
        email: "",
        pass: "",
        pass2: "",
        terms: false,
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
        <Form ref={formRef} noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              isInvalid={!!errors.email}
              size="sm"
              type="email"
              placeholder="Enter email"
              required
            />

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
              Password must contain at least 8 characters, one uppercase, one
              number and one special case character
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
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
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
          <Button
            className="register-button"
            color="secondary"
            variant="contained"
            disableElevation={true}
            type="submit"
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
