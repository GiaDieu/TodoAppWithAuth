import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TodoList from "../Todo/TodoList";

const Home = () => {
  const token = localStorage.getItem("auth-token");
  const history = useHistory();

  useEffect(() => {
    // if (!userData.user && !userData.token) history.push("/login");
    if (!token) history.push("/login");
  });

  return (
    <div className="home">
      <TodoList />
    </div>
  );
};

export default Home;
