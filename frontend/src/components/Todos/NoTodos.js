import React from "react";
import { Link } from "react-router-dom";

const NoTodos = () => {
  return (
    <>
      <div className="no-todos-container">
        <div className="text-container">No Todos To Display</div>
        <div>
          <Link to="/createTodo">
            <button>Add Todos</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoTodos;
