import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
import Navbar from "../../Navbar/Navbar";
const { getOTP, storeEmail } = require("../../../redux/actions/authAction");

const VerifyMail = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const auth = useSelector((state) => state.auth);
  const [isClicked, setisClicked] = useState(false);

  useEffect(() => {
    if(isClicked) {
      if (!auth.loading && auth.data.success) {
        alert.success(auth.data.message);
        dispatch(storeEmail(email));
        navigate("/signup/verifyOTP");
      } else if (!auth.loading && !auth.data.success) {
        alert.error(auth.data.message);
      }
    }
  }, [dispatch, alert, email, isClicked, auth]);

  const submitEmail = async (e) => {
    e.preventDefault();
    setisClicked(true);
    await dispatch(getOTP(email));
  };

  return (
    <>
    
    <h3 style={{ color: "white",margin: "50px 10px", textAlign: "center"}}>
        We will send you an OTP from "pgramopadhye45@gmail.com" email.
      </h3>
      {auth.loading ? (
        <Loader />
      ) : (
        <form className="signin-box" onSubmit={(e) => submitEmail(e)}>
          <div className="signin-name">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="submit-button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </>
  );
};

export default VerifyMail;
