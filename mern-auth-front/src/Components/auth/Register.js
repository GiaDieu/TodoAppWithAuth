import Axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorHandling from "../../misc/ErrorHandling";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("http://localhost:5000/users/register", newUser);

      const getTokenAndUser = await Axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password,
        },
      );

      setUserData({
        token: getTokenAndUser.data.token,
        user: getTokenAndUser.data.user,
      });

      localStorage.setItem("auth-token", getTokenAndUser.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.message && setError(err.response.data.message);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {error && (
        <ErrorHandling message={error} clearError={() => setError(undefined)} />
      )}

      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          className="register--email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">password</label>
        <input
          type="password"
          className="register--password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="register--passwordCheck"
          placeholder="verify password..."
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-displayName">User Name</label>
        <input type="text" onChange={(e) => setDisplayName(e.target.value)} />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
