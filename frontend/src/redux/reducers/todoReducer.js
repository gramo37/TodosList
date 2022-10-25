const {
  REQUIRE_TODO_REQUEST,
  TODO_REQUEST_SUCCESS,
  TODO_REQUEST_FAIL,
} = require("../constants/todoConstants");

export const todoReducer = (
  state = { message: "", data: {}, loading: true },
  action
) => {
  switch (action.type) {
    case REQUIRE_TODO_REQUEST:
      return {
        message: "Requesting Your Todos",
        loading: true,
      };
    case TODO_REQUEST_SUCCESS:
      return {
        message: "Todos fetched.",
        data: action.payload,
        loading: false,
      };
    case TODO_REQUEST_FAIL:
      return {
        message: "Todos fetching failed",
        error: action.payload,
        loading: false,
      };
    case "REQUIRE_DELETE_TODO":
      return {
        ...state,
        message: "Deleting in Process",
      };
    case "DELETE_TODO_SUCCESS":
      return {
        ...state,
        message: "Deleted Successfully",
        loading: false,
      };
    case "DELETE_TODO_FAIL":
      return {
        message: "Delete failed",
        loading: false,
        error: action.payload,
      };

    case "REQUIRE_GET_TODO_BY_ID":
      return {
        ...state,
        loading: true,
        message: "Requiring todo",
      };
    case "GET_TODO_BY_ID_SUCCESS":
      return {
        message: "Fetched Successfully",
        loading: false,
        data: action.payload,
      };
    case "GET_TODO_BY_ID_FAIL":
      return {
        message: "Fetching failed",
        loading: false,
        error: action.payload,
      };

    case "REQUIRE_EDIT_TODO":
      return {
        ...state,
        message: "Editing in Process",
      };
    case "EDIT_TODO_SUCCESS":
      return {
        message: "Editing Successful",
        loading: false,
        data: action.payload,
      };
    case "EDIT_TODO_FAIL":
      return {
        message: "Editing failed",
        loading: false,
        error: action.payload,
      };

    case "REQUIRE_ADD_TODO":
      return {
        ...state,
        message: "Adding in Process",
      };
    case "ADD_TODO_SUCCESS":
      return {
        message: "Adding Successful",
        loading: false,
        data: action.payload,
      };
    case "ADD_TODO_FAIL":
      return {
        message: "Adding failed",
        loading: false,
        error: action.payload,
      };
    case "LOGOUT_USER":
      return {
        message: "Logout Successful",
        data: null,
      };
    case "CLEAR_ERRORS":
      return {
        message: "",
        loading: null,
        error: {},
      };

    default:
      return {
        ...state,
      };
  }
};
