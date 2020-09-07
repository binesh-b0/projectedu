import React from "react";
import './index.css';

import Image from "react-bootstrap/Image";
import Button from "@material-ui/core/Button";


export default function VerificationPage(props) {

    const resendClicked = ( )=>{
        props.history.push('/signup');
    }


  return (
    <div className="container" style={{ margin: "50px" }}>
      <div className="card mx-auto" style={{ width: "30rem", padding: "32px" }}>
        <Image className="card-img-top" src="/images/message_send.png" />
        <div className="card-body">
          <h5 className="card-title">Verify Email</h5>
        </div>
        <p className="card-text">
          A veification link has been sent to your mail.
        </p>
        <Button 
            className="resend-button" 
            variant="contained" 
            color="primary" 
            onClick={resendClicked}
            disableElevation >
          Resend
        </Button>
      </div>
    </div>
  );
}
