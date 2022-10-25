import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookies";
import { addTodo } from "../../redux/actions/todoAction";
import "./css/createTodo.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert"

const CreateTodo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const todos = useSelector((state) => state.todos);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const addTodoSubmit = async () => {
    const token = await getCookie("authToken");
    if(title === "") {
      alert.error("Please enter title")
    } else if (description === "") {
      alert.error("Please enter description")
    } else {
      await dispatch(addTodo(token, title, description));
      navigate("/");
    }
  };

  useEffect(() => {
    try {
      if (!todos.loading) {
        settitle(todos.data.todo[0].title);
        setdescription(todos.data.todo[0].description);
      }
    } catch (error) {
      console.log(error);
    }
  }, [todos]);

  return (
    <>
      <div className="create-form-container">
        <div className="title">
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div className="create-todo-description">
          <textarea
            type="text"
            placeholder="Description"
            onChange={(e) => setdescription(e.target.value)}
          >
            {description}
          </textarea>
        </div>
        <div className="edit-button">
          <button onClick={addTodoSubmit}>Add</button>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
