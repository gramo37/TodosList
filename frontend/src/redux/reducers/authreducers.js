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
  RESET_PASSWORD_FAIL,
  // RESET_ALL
} = require("../constants/authconstants");

export const authReducer = (state = { message: "", data: {} }, action) => {
  switch (action.type) {
    case REQUIRE_VERIFY_MAIL:
      return {
        message: "Sending OTP",
        loading: true,
      };
    case VERIFY_MAIL_SUCCESS:
      return {
        message: "OTP sent",
        loading: false,
        data: action.payload,
      };
    case VERIFY_MAIL_FAIL:
      return {
        message: "Error in sending OTP. Please try again.",
        loading: false,
        data: action.payload,
      };
    case REQUIRE_VERIFY_OTP:
      return {
        message: "Verifying OTP",
        loading: true,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        message: "OTP verfied",
        loading: false,
        data: action.payload,
      };
    case VERIFY_OTP_FAIL:
      return {
        message: "Error in verifying OTP. Please try again.",
        loading: false,
        data: action.payload,
      };
    case REQUIRE_SEND_DETAILS:
      return {
        message: "Sending User Details",
        loading: true,
      };
    case SEND_DETAILS_SUCCESS:
      return {
        message: "Signin Successful",
        loading: false,
        data: action.payload,
      };
    case SEND_DETAILS_FAIL:
      return {
        message: "Error in signin. Please try again.",
        loading: false,
        data: action.payload,
      };
    case REQUIRE_LOGIN_DETAILS:
      return {
        message: "Logging user",
        loading: true,
      };
    case LOGIN_DETAILS_SUCCESS:
      return {
        message: "Login Successful",
        loading: false,
        data: action.payload,
      };
    case LOGIN_DETAILS_FAIL:
      return {
        message: "Error in Login. Please try again.",
        loading: false,
        data: action.payload,
      };

    case REQUIRE_LINK_SEND:
      return {
        message: "Sending Link...",
        loading: true,
      };
    case LINK_SEND_SUCCESS:
      return {
        message: "Link sent successfully",
        loading: false,
        data: action.payload,
      };
    case LINK_SEND_FAIL:
      return {
        message: "Link sent failed",
        loading: false,
        data: action.payload,
      };

    case REQUIRE_RESET_PASSWORD:
      return {
        message: "Resetting Password...",
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        message: "Password changed Successfully",
        loading: false,
        data: action.payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        message: "Password Change Failed",
        loading: false,
        data: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const emailReducer = (state = { email: "" }, action) => {
  switch (action.type) {
    case "GET_EMAIL":
      return {
        email: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
