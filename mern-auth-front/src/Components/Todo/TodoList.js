import React, { useState } from "react";

import Todo from "./Todo";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    //That's looking for a line start (^), followed by zero or more whitespace (\s*) characters, followed by a line end ($).
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodo = [...todos, todo];
    setTodos(newTodo);
  };

  const updateTodo = (todoId, newVal) => {
    if (!newVal.text || /^\s*$/.test(newVal.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newVal : item)),
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <>
      <h2>What's a plan today ?</h2>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
};

export default TodoList;
