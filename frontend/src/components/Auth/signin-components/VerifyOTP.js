import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { useAlert } from "react-alert";
const { sendOTP } = require("../../../redux/actions/authAction");

const VerifyOTP = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const email = useSelector((state) => state.email);
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const [isClicked, setisClicked] = useState(false);

  useEffect(()=>{
    if(email.email === '') {
      alert.error("Something went wrong. Please try Again.");
      navigate('/signup/verifyMail');
    }
  }, [])

  useEffect(() => {
    if (isClicked) {
      if (!auth.loading && auth.data.success) {
        alert.success(auth.data.message);
        navigate("/signup/sendDetails");
      } else if (!auth.loading && !auth.data.success) {
        alert.error(auth.data.message);
      }
    }
  }, [dispatch, alert, email, isClicked, auth]);

  const submitEmail = async (e) => {
    e.preventDefault();
    setisClicked(true);
    await dispatch(sendOTP(email.email, otp));
  };

  return (
    <>
      {auth.loading ? (
        <Loader />
      ) : (
        <form className="signin-box" onSubmit={(e) => submitEmail(e)}>
          <div className="signin-name">
            <input
              placeholder="Enter your 6 digit OTP"
              type="number"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
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

export default VerifyOTP;
