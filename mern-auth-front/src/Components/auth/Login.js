import Axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorHandling from "../../misc/ErrorHandling";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };

      const loggedinUser = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser,
      );
      setUserData({
        token: loggedinUser.data.token,
        user: loggedinUser.data.user,
      });

      localStorage.setItem("auth-token", loggedinUser.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.message && setError(err.response.data.message);
    }
  };
  return (
    <div className="login">
      {error && (
        <ErrorHandling message={error} clearError={() => setError(undefined)} />
      )}
      <h2>Log In</h2>
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          className="login--email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">password</label>
        <input
          type="password"
          className="login--password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default Login;
