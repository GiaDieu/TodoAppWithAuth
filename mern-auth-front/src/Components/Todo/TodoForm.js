import React, { useState, useEffect, useRef } from "react";

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleInput}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-btn edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleInput}
            ref={inputRef}
          />
          <button className="todo-btn">Add Todo</button>
        </>
      )}
    </form>
  );
};

export default TodoForm;
