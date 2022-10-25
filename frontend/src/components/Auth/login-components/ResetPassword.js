import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
import { resetPassword } from "../../../redux/actions/authAction";
import Navbar from "../../Navbar/Navbar";
import {useNavigate} from "react-router-dom"

const ResetPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth);
  const [isClicked, setisClicked] = useState(false);
  // const { resetToken } = useParams();
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [resetToken, setresetToken] = useState("");

  useEffect(() => {
    if (isClicked) {
      if (!auth.loading && auth.data.success) {
        alert.success(auth.message);
        navigate("/login")
      } else if (!auth.loading && !auth.data.success) {
        alert.error(auth.data.message);
      }
    }
  }, [auth]);

  const onSubmit = (e) => {
    e.preventDefault();
    setisClicked(true);
    dispatch(resetPassword(password, confirmPassword, resetToken));
  };

  return (
    <>
    <Navbar />
      <div className="login-container">
        {auth.loading ? (
          <Loader />
        ) : (
          <form className="login-box" autoComplete="off" style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} onSubmit={onSubmit}>
            <div className="signin-name">
              <input
                placeholder="Copy Paste reset token"
                type="password"
                autoComplete="new-password"
                value={resetToken}
                onChange={(e) => setresetToken(e.target.value)}
              />
            </div>
            <div className="signin-name">
              <input
                placeholder="Enter Password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="signin-name">
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
            <div className="submit-button-container">
              <button type="submit">Submit</button>
            </div>
            <div><Link style={{textDecoration: "none", color: "white"}} to="/forgotPassword">Click here if you don't have reset token.</Link></div>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
