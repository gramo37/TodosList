import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { sendVerificationLink } from "../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Navbar from "../../Navbar/Navbar";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isClicked, setisClicked] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isClicked) {
      if (!auth.loading && auth.data.success) {
        alert.success(auth.message);
        navigate("/api/v1/reset/password")
      } else if (!auth.loading && !auth.data.success) {
        alert.error(auth.data.message);
      }
    }
  }, [auth]);

  const onSubmit = (e) => {
    e.preventDefault();
    setisClicked(true);
    dispatch(sendVerificationLink(email));
  };

  return (
    <>
    <Navbar />
    <h3 style={{ color: "white",margin: "50px 10px", marginBottom: "0px", textAlign: "center"}}>
        We will send you a reset token from "pgramopadhye45@gmail.com email". Please copy paste that here.
      </h3>
      <div className="login-container">
        {auth.loading ? (
          <Loader />
        ) : (
          <form className="login-box" autoComplete="off" onSubmit={onSubmit}>
            <div className="login-name">
              <input
                placeholder="Enter email"
                type="email"
                autoComplete="new-password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="submit-button-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
