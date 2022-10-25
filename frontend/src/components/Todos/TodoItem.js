import React, {useRef, useState, useEffect} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import "./css/todoItem.css";

const TodoItem = (props) => {
  const { todo } = props;
  const infoOption = useRef(null);
  const [isinfoOpen, setinfoOpen] = useState(false);

  useEffect(()=>{
    showInfo()
  }, [])

  const showInfo = () => {
    if(isinfoOpen === false) {

      // Making Div non-clickable
      const len = infoOption.current.children.length;
      for(let i=0; i<len;i++) {
        infoOption.current.children[i].classList.add("non-clickable-option");
        infoOption.current.children[i].classList.remove("clickable-option")
      }
      infoOption.current.classList.add("options-close");
      infoOption.current.classList.remove("options-open");
      setinfoOpen(true)
    } else if (isinfoOpen === true) {

      // Making div clickable
      const len = infoOption.current.children.length;
      for(let i=0; i<len;i++) {
        infoOption.current.children[i].classList.add("clickable-option");
        infoOption.current.children[i].classList.remove("non-clickable-option")
      }
      infoOption.current.classList.remove("options-close");
      infoOption.current.classList.add("options-open");
      setinfoOpen(false)
    }
  };

  return (
    <>
      <div className="card">
        <Link to={`${todo._id}`}>
          <div className="info-container">
            <div className="title">{todo.title}</div>
            <div className="description">{todo.description}</div>
            <div className="dates">
              <div>Created On - {todo.createdAt.substring(0, 10)}</div>
              <div>Updated On - {todo.updatedAt.substring(0, 10)}</div>
            </div>
          </div>
        </Link>
        <div onClick={showInfo} className="three-dots-button-container">
          <MoreVertIcon />
        </div>
        <div className="options" ref={infoOption}>
          <div className="option">
            <Link to="/createTodo">Add Todo</Link>
          </div>
          <div
            className="option"
            onClick={() => props.deleteThisTodo(todo._id)}
          >
            Delete
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
