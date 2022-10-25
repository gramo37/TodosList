import React, { useState } from "react";
import SendDetails from "./SendDetails";
import VerifyMail from "./VerifyMail";
import VerifyOTP from "./VerifyOTP";
import "./css/signin.css";
import Navbar from "../../Navbar/Navbar";

const Signin = (props) => {
  
  return (
    <>
    <Navbar />
      <div className="signin-container">
        {props.currentForm === 'verifyMail' && <VerifyMail />}
        {props.currentForm === 'verifyOTP' && <VerifyOTP />}
        {props.currentForm === 'sendDetails' && <SendDetails />}
      </div>
    </>
  );
};

export default Signin;
