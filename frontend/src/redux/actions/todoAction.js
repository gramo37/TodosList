import axios from "axios";

const {
  REQUIRE_TODO_REQUEST,
  TODO_REQUEST_SUCCESS,
  TODO_REQUEST_FAIL,
} = require("../constants/todoConstants");

// const host = "http://localhost:5000";
const host = "https://todos-list-by-gramopadhye.herokuapp.com";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const getMyTodos = (token) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_TODO_REQUEST,
    });

    const link = `${host}/api/v1/getMyTodos`;
    // const token = await getCookie("authToken");
    const { data } = await axios.post(link, { token: token });

    dispatch({
      type: TODO_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TODO_REQUEST_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteTodo = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: "REQUIRE_DELETE_TODO",
    });

    const link = `${host}/api/v1/deleteTodo/${id}`;
    // const token = getCookie("authToken");
    const { data } = await axios.post(link, { token: token });

    dispatch({
      type: "DELETE_TODO_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_TODO_FAIL",
      payload: error.response.data,
    });
  }
};

export const getTodoById = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: "REQUIRE_GET_TODO_BY_ID",
    });

    const link = `${host}/api/v1/getTodo/${id}`;
    const { data } = await axios.post(link, { token: token });

    dispatch({
      type: "GET_TODO_BY_ID_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_TODO_BY_ID_FAIL",
      payload: error.response.data,
    });
  }
};

export const editTodo = (token, id, title, description) => async (dispatch) => {
  try {
    dispatch({
      type: "REQUIRE_EDIT_TODO",
    });

    const link = `${host}/api/v1/updateTodo/${id}`;
    const { data } = await axios.post(link, { token: token, title, description });

    dispatch({
      type: "EDIT_TODO_SUCCESS",
      payload: data,
    });

  } catch (error) {
    dispatch({
        type: "EDIT_TODO_FAIL",
        payload: error.response.data,
      });
  }
};

export const addTodo = (token, title, description) => async (dispatch) => {
    try {
        dispatch({
      type: "REQUIRE_ADD_TODO",
    });
    
    const link = `${host}/api/v1/createTodo`;
    const { data } = await axios.post(link, { token: token, title, description });

    dispatch({
      type: "ADD_TODO_SUCCESS",
      payload: data,
    });
    } catch (error) {
        dispatch({
            type: "ADD_TODO_FAIL",
            payload: error.response.data,
          });
    }
}

export const clearError = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_ERRORS"
  })
}
