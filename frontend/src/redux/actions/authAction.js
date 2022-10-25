import axios from "axios";
import { sendEmail } from "../../utils/sendEmail";

const {
  REQUIRE_VERIFY_MAIL,
  VERIFY_MAIL_SUCCESS,
  VERIFY_MAIL_FAIL,
  REQUIRE_VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  REQUIRE_SEND_DETAILS,
  SEND_DETAILS_SUCCESS,
  SEND_DETAILS_FAIL,
  REQUIRE_LOGIN_DETAILS,
  LOGIN_DETAILS_SUCCESS,
  LOGIN_DETAILS_FAIL,
  REQUIRE_LINK_SEND,
  LINK_SEND_SUCCESS,
  LINK_SEND_FAIL,
  REQUIRE_RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} = require("../constants/authconstants");

// const host = "http://localhost:5000";
const host = "https://todos-list-by-gramopadhye.herokuapp.com";

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
  let cvalue = null;
  const d = new Date();
  d.setTime(d.getTime() - 10 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getOTP = (email) => async (dispatch) => {
  // try {
  dispatch({
    type: REQUIRE_VERIFY_MAIL,
  });

  const link = `${host}/api/v1/auth/sendOTP`;

  const { data } = await axios.post(link, {
    email: email,
  });
  console.log(data)
  // Get OTP from the server and send it to the user
  let otp = data.data
  let message = `Your OTP is ${otp}`
  // sendEmail
  await sendEmail(email, message, dispatch)

}
// catch (error) {
//   dispatch({
//     type: VERIFY_MAIL_FAIL,
//     payload: error.response.data,
//   });
// }
// };

export const storeEmail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_EMAIL",
      payload: email,
    });
  } catch (error) {
    dispatch({
      type: "Something went wrong",
      payload: error,
    });
  }
};

export const sendOTP = (email, otp) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_VERIFY_OTP,
    });

    const link = `${host}/api/v1/auth/verifyOTP`;
    const { data } = await axios.post(link, {
      email: email,
      otp: otp,
    });
    dispatch({
      type: VERIFY_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAIL,
      payload: error.response.data,
    });
  }
};

export const signinUser =
  (name, email, password, role = "student") =>
    async (dispatch) => {
      try {
        dispatch({
          type: REQUIRE_SEND_DETAILS,
        });
        const link = `${host}/api/v1/auth/signin`;
        const { data } = await axios.post(link, {
          name,
          email,
          password,
          role,
        });

        //   Save data.token in cookie
        setCookie("authToken", data.token, 1);

        dispatch({
          type: SEND_DETAILS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: SEND_DETAILS_FAIL,
          payload: error.response.data,
        });
      }
    };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_LOGIN_DETAILS,
    });

    const config = { headers: { "Content-Type": "application/json" }, }
    const link = `${host}/api/v1/auth/login`;
    const { data } = await axios.post(link, {
      email: email,
      password: password,
    }, config);

    //Save data.token in cookie
    setCookie("authToken", data.token, 1);

    dispatch({
      type: LOGIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const sendVerificationLink = (email) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_LINK_SEND
    })
    const link = `${host}/api/v1/auth/send/link`;
    const { data } = await axios.post(link, {
      email
    })

    let resetToken = data.data

    // Get Reset token from server and send it to user
    let message = `Copy and paste this token in the reset Password option:\n\n
    ${resetToken}\n\n
     Ignore if not requested.\n\n
     Need to copy paste because we are using netlify for hosting the website and it doesn't allow broken links.`
    await sendEmail(email, message)
    dispatch({
      type: LINK_SEND_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LINK_SEND_FAIL,
      payload: error.response.data
    })
  }
}

export const resetPassword = (password, confirmPassword, resetToken) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_RESET_PASSWORD
    })

    const link = `${host}/api/v1/auth/reset/password/${resetToken}`
    const { data } = await axios.post(link, {
      password,
      confirmPassword
    })

    //Save data.token in cookie
    setCookie("token", data.token, 1);

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data
    })
  }
}

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: 'LOGOUT_USER'
  });

  deleteCookie("authToken");
}