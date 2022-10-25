import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authAction";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {useAlert} from "react-alert"

const NavItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const logoutButtonClicked = () => {
    dispatch(logoutUser());
    alert.success("Logout Successful")
    navigate("/login");
  }
  return (
    <>
      <div>
        <Link className="navbar-icon" to="/">
          TodosList
        </Link>
      </div>
      <div className="nav-options">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {/* <li>
            <Link to="/api/v1/reset/password">Reset Password</Link>
          </li>
          <li>
            <Link to="/privacyPolicy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/disclaimer">Disclaimer</Link>
          </li>
          <li>
            <Link to="/termsOfService">Terms of Service</Link>
          </li> */}
          
          <li>
            <a onClick={logoutButtonClicked}>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavItem;
