import React, { useState, useRef } from "react";
import "./index.css";
import { useSelector } from "react-redux";

import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputBase from "@material-ui/core/InputBase";

import {
  Form,
  OverlayTrigger,
  Tooltip,
  
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const SignupForm = ({ onSubmit }) => {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, status, error } = userRegister;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const schema = yup.object().shape({
    email: yup.string().required("Enter valid email").email(),
    pass: yup
      .string()
      .required("")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    pass2: yup
      .string()
      .required("")
      .oneOf([yup.ref("pass"), null], "Password mismatch"),
    terms: yup.bool().required("Incomplete form"),
  });
  const formRef = useRef(null);
  //reset form with ref
  const handleReset = () => {
    formRef.current.reset();
    if (loading === false && error) formRef.current.reset(); //TODO
  };

  const submit = (a) => {
    // Do stuff here
    // On success or error:
    console.log("form", a, loading, error);
    // handleReset();
    onSubmit(a);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        if (loading === false && status === 511){
          resetForm({
            values: {
              email: "",
              pass: "",
              pass2: "",
              terms: false,
            },
          });
          handleReset()
          }
        submit(values, resetForm);
      }}
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
            <InputLabel className="label222" htmlFor="em">
              Email
            </InputLabel>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <InputBase
                className="form-input form-control"
                id="em"
                fullWidth
                name="email"
                onChange={handleChange}
                type="email"
                required
                error={!!errors.email}
              />
            </OverlayTrigger>
            <Form.Control.Feedback type="invalid" tooltip>
                  Enter valid email
                </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <InputLabel
              className="label222"
              htmlFor="standard-adornment-password"
            >
              Password
            </InputLabel>
            <InputBase
              className="form-input"
              id="standard-adornment-password"
              name="pass"
              error={touched.pass && !errors.pass}
              type={passwordShown ? "text" : "password"}
              onChange={handleChange}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisiblity}
                  >
                    {passwordShown ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Form.Text className={true ? "text-muted" : "d-none"}>
              Password must contain at least 8 characters, one uppercase, one
              number and one special case character
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formPasswordConf">
            <InputLabel className="label222" htmlFor="pconf">
              Confirm password
            </InputLabel>
            <InputBase
              className="form-input"
              id="pconf"
              name="pass2"
              error={!!errors.pass2}
              type={passwordShown ? "text" : "password"}
              onChange={handleChange}
              fullWidth
            />
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
            className="signupform-comp-register-button"
            color="secondary"
            variant="contained"
            disabled={loading}
            disableElevation={true}
            type="submit"
          >
            <Spinner
                className={loading? "my-auto":"d-none"}
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {loading? "":"Register"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
