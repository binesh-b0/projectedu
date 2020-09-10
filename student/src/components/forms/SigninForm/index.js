import React,{useState,useRef} from 'react'
import styles from './SigninForm.module.css'
import { useSelector } from "react-redux";

import {  Form,Spinner } from "react-bootstrap";
import {Formik} from 'formik';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputBase from "@material-ui/core/InputBase";

import Alert from 'react-bootstrap/Alert';


const SigninForm=({onSubmit})=> {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, status, error } = userRegister;

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
 const renderAlert =(errors,touched) => {
  if(!!errors.email&&(!touched.email))
  return(   <Alert className={`${styles.custom_alert} mx-auto`} variant="danger" >{errors.email}</Alert>);
  if(!!errors.pass&&(!touched.pass))
  return(   <Alert className={`${styles.custom_alert} mx-auto`} variant="danger" >{errors.pass}</Alert>);
  if(!!errors.pass2&&(!touched.pass2))
  return(   <Alert className={`${styles.custom_alert} mx-auto`} variant="danger" >{errors.email}</Alert>);
}
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
          {renderAlert(errors,touched)}

              <Form.Group controlId="formBasicEmail">
              <InputLabel className={styles.label222} htmlFor="em">
              Email
            </InputLabel>
              <InputBase
                className={styles.form_input}
                id="em"
                fullWidth
                name="email"
                onChange={handleChange}
                type="email"
                required
              />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
              <InputLabel
              className={styles.label222}
              htmlFor="standard-adornment-password"
            >
              Password
            </InputLabel>
            <InputBase
              className={styles.form_input}
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
            <Form.Text className={styles.text_muted}>
              Password must contain at least 8 characters, one uppercase, one
              number and one special case character
            </Form.Text>
              </Form.Group>
              <Button
            className={styles.login_button}
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
            {loading? "":"Login"}
          </Button>
            </Form>
        )}
      </Formik>
    );
  }
  
  export default SigninForm;