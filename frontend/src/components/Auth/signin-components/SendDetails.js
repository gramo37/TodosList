import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
import {useNavigate} from "react-router-dom";
const { signinUser } = require("../../../redux/actions/authAction");

const SendDetails = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const email = useSelector((state) => state.email);
  const [isClicked, setisClicked] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(()=>{
    if(email.email === '') {
      alert.error("Something went wrong. Please try Again.");
      navigate('/signup/verifyMail');
    }
  }, [])

  useEffect(() => {
    if (isClicked) {
      if (!auth.loading && auth.data.success) {
        alert.success(auth.message);
        navigate("/")
      } else if (!auth.loading && !auth.data.success) {
        alert.error(auth.data.message);
      }
    }
  }, [dispatch, alert, email, isClicked, auth]);

  const submitEmail = async (e) => {
    e.preventDefault();
    setisClicked(true);
    if (password === confirmPassword) {
      dispatch(signinUser(name, email.email, password));
    } else {
      alert.error("Passwords are not matching");
    }
  };

  return (
    <>
      {auth.loading ? (
        <Loader />
      ) : (
        <form
          className="signin-box"
          autoComplete="off"
          onSubmit={(e) => submitEmail(e)}
        >
          <div className="signin-name">
            <input
              placeholder="Enter your good name"
              type="text"
              autoComplete="new-password"
              value={name}
              onChange={(e) => setname(e.target.value)}
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
        </form>
      )}
    </>
  );
};

export default SendDetails;
