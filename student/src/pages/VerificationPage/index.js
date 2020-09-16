import React, { useEffect,useState } from "react";
import styles from "./VerificationPage.module.css";
import Cookie from "js-cookie";

import Image from "react-bootstrap/Image";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { resendEmail } from "../../actions/userActions";
import { getUserInfo } from "../../services/authService";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
export default function VerificationPage(props) {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading } = userRegister;

  const dispatch = useDispatch();
  const userInfo = getUserInfo();
   //for snack
   const [snk, setSnk] = useState({});
   // const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [done, setDone] = useState(false);
   const [error,setError] = useState();

  const resendClicked = () => {
    console.log("veripag", userInfo);
    try {
      if (userInfo) dispatch(resendEmail(userInfo.email, setError,setDone));
      else props.history.replace("/signup");
    } catch (err) {
      console.log("errr", err);
      props.history.push("/signup");
    }
  };
  useEffect(() => {
    if(loading){
      setSnk({ sev: 'info', msg: "Submitting" });
      setOpen(true);
    }
    if(!loading&&error){
      setSnk({ sev: 'error', msg: error });
      setOpen(true);
    }
    if(!loading&&done){
      setSnk({ sev: 'success', msg: "Mail sent" });
      setOpen(true);
    }
  },[loading] )

  useEffect(() => {
    Cookie.set("regRE", false);
    if (!userInfo.email) props.history.replace("/signup");
  });
      //snackbar close
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnk({});
        setOpen(false);
    };
  const showSnackbar = () => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={snk.sev}>
                {snk.msg}
            </Alert>
        </Snackbar>
    );
};
  return (
    <div className="container-fluid" style={{ paddingTop: "50px" }}>
    {showSnackbar()}
      <div className="row">
        <div
          className="card border-0 shadow-sm mb-5 bg-white rounded mx-auto  col-md-5 col-lg-4"
          style={{ width: "30rem", padding: "32px" }}
        >
          <Image className="card-img-top" src="/images/message_send.png" />
          <div className="card-body">
            <h5 className="card-title text-center">Verify Email</h5>
          </div>
          <p className="card-text">
            A veification link has been sent to your email address. Please
            verify to continue
          </p>
          <Button
            className={styles.resend_button}
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={resendClicked}
            disableElevation
          >
            Resend
          </Button>
        </div>
      </div>
    </div>
  );
}
