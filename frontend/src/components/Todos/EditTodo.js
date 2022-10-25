import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTodoById, editTodo } from "../../redux/actions/todoAction";
import { getCookie } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const EditTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const todos = useSelector((state) => state.todos);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  useEffect(async () => {
    const token = await getCookie("authToken");
    await dispatch(getTodoById(token, id));
  }, []);

  useEffect(() => {
    try {
      if (!todos.loading) {
        settitle(todos.data?.todo[0].title);
        setdescription(todos.data?.todo[0].description);
      }
    } catch (error) {
      console.log(error);
    }
  }, [todos]);

  const editTodoSubmit = async () => {
    const token = await getCookie("authToken");
    if (title === "") {
      alert.error("Please enter title");
    } else if (description === "") {
      alert.error("Please enter description");
    } else {
      await dispatch(editTodo(token, id, title, description));
      navigate("/");
    }
  };

  return (
    <>
      <div className="create-form-container">
        <div className="title">
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div className="description">
          <textarea
            type="text"
            placeholder="Description"
            onChange={(e) => setdescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div className="edit-button">
          <button onClick={editTodoSubmit}>Edit</button>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
