import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./css/login.css";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
const { loginUser } = require("../../../redux/actions/authAction");

const Login = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [isClicked, setisClicked] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isClicked) {
      if (!auth.loading && auth.data.success) {
        alert.success(auth.message);
        navigate("/");
      } else if (!auth.loading && !auth.data.success) {
        alert.error(auth.data.message);
      }
    }
  }, [auth]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setisClicked(true);
    await dispatch(loginUser(email, password));
  };

  return (
    <>
      <Navbar />
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
            <div className="login-name">
              <input
                placeholder="Enter password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="forgotPasswordContainer">
              <Link to="/forgotPassword">Forgot Password ?</Link>
            </div>
            <div className="forgotPasswordContainer">
              <Link to="/signup/verifyMail">New User ?</Link>
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

export default Login;
