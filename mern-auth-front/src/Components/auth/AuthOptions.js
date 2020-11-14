import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
const AuthOptions = () => {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const register = () => history.push("/register");
  const login = () => history.push("/login");

  const logout = () => {
    localStorage.setItem("auth-token", "");
    history.push("/");
    setUserData({
      token: undefined,
      user: undefined,
    });
  };

  return (
    <div className="auth-options">
      {userData.user ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      )}
    </div>
  );
};

export default AuthOptions;
