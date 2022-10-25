import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./css/todos.css";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { getMyTodos } from "../../redux/actions/todoAction";
import Loader from "../Loader/Loader";
import { deleteTodo } from "../../redux/actions/todoAction";
import { getCookie } from "../../utils/cookies";
import NoTodos from "./NoTodos";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const TodosContainer = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);
  const [refreshPage, setrefreshPage] = useState(false);

  const deleteTodoSubmit = async (id) => {
    try {
      const token = await getCookie("authToken");
      await dispatch(deleteTodo(token, id));
      await dispatch(getMyTodos(token));
    } catch (error) {
      console.log(error);
    }
  };

  if (refreshPage === false) {
    setrefreshPage(true);
  }

  useEffect(async () => {
    const token = getCookie("authToken");
    if (token === "") {
      alert.error("Please Login to use this utility.");
      navigate("/login");
    } else {
      await dispatch(getMyTodos(token));
    }
  }, [refreshPage]);

  return (
    <>
      <Navbar />
      {/* <h3 style={{ color: "white",padding: "50px 10px", marginBottom: "0px", textAlign: "center"}}>
        This is a simple todoslist website made using MERN stack with OTP
        sign-up and forgot password functionality. This is <b style={{fontWeight: "1000"}}>just a educational
        project</b>. Please <b style={{fontWeight: "1000"}}>do not store any vital information</b> in this.
      </h3> */}
      <div className="todosContainer">
        {todos?.loading ? (
          <Loader />
        ) : todos?.data?.todos?.length === 0 ? (
          <NoTodos />
        ) : (
          todos?.data?.todos?.map((item) => {
            return (
              <TodoItem
                key={item._id}
                todo={item}
                deleteThisTodo={deleteTodoSubmit}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default TodosContainer;
